import axios from 'axios';
import Cookies from 'js-cookie';

// Public API tanpa autentikasi
export const publicInstance = axios.create({
  baseURL: import.meta.env.BASE_URL,
  withCredentials: true,
  headers: {
    'X-API-Key': import.meta.env.API_KEY,
  },
});

// Instance dengan autentikasi
export const authInstance = axios.create({
  baseURL: import.meta.env.BASE_URL,
  withCredentials: true,
  headers: {
    'X-API-Key': import.meta.env.API_KEY,
  },
});

// Interceptor untuk request (menambahkan Authorization & Content-Type dinamis)
authInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('accessToken');

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // Set Content-Type berdasarkan data
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Interceptor untuk response (handle refresh token jika 401)
authInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.config &&
      !error.config.__isRetryRequest
    ) {
      error.config.__isRetryRequest = true; // Mencegah infinite loop refresh token

      try {
        // Gunakan `authInstance.post()` agar tetap menggunakan konfigurasi yang sama
        const response = await publicInstance.post('/auth/refresh');

        const newAccessToken = response.data.accessToken;

        // Simpan token baru
        Cookies.set('accessToken', newAccessToken, { expires: 1 / 96 });

        // Set ulang Authorization header untuk request yang gagal
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;

        // Retry request yang gagal
        return authInstance(error.config);
      } catch (refreshError) {
        Cookies.remove('accessToken');
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
