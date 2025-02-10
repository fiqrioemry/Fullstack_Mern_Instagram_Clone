import Cookies from 'js-cookie';
import { authInstance, publicInstance } from './instance';

const errorHandle = (error) => {
  const errorMessage = error.response?.data?.message || 'Something went wrong';
  return Promise.reject(new Error(errorMessage));
};

const callApi = {
  // 🔹 Authentication APIs
  signup: async (formData) => {
    return publicInstance
      .post('/auth/signup', formData)
      .then((res) => res.data.message)
      .catch(errorHandle);
  },

  signin: async (formData) => {
    return publicInstance
      .post('/auth/signin', formData)
      .then((res) => {
        const { accessToken } = res.data;
        Cookies.set('accessToken', accessToken, { expires: 1 });
        return res.data.message;
      })
      .catch(errorHandle);
  },

  signout: async () => {
    return authInstance
      .post('/auth/signout')
      .then((res) => {
        Cookies.remove('accessToken');
        return res.data.message;
      })
      .catch(errorHandle);
  },

  refreshToken: async () => {
    return publicInstance
      .get('/auth/refresh')
      .then((res) => res.data.accessToken)
      .catch(errorHandle);
  },

  authCheck: async () => {
    return authInstance
      .get('/auth/me')
      .then((res) => res.data)
      .catch(errorHandle);
  },

  // 🔹 User APIs
  searchUser: async () => {
    return authInstance
      .get('/user')
      .then((res) => res.data)
      .catch(errorHandle);
  },

  getUserProfile: async (username) => {
    return authInstance
      .get(`/user/${username}`)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  updateUserProfile: async (formData) => {
    return authInstance
      .put('/user/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => res.data.message)
      .catch(errorHandle);
  },

  followUser: async (followingId) => {
    return authInstance
      .post(`/user/${followingId}/follow`)
      .then((res) => res.data.message)
      .catch(errorHandle);
  },

  unfollowUser: async (followingId) => {
    return authInstance
      .delete(`/user/${followingId}/follow`)
      .then((res) => res.data.message)
      .catch(errorHandle);
  },

  getUserPosts: async (username) => {
    return authInstance
      .get(`/user/${username}/posts`)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  getFollowers: async (username) => {
    return authInstance
      .get(`/user/${username}/followers`)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  getFollowings: async (username) => {
    return authInstance
      .get(`/user/${username}/followings`)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  getFollowRecommend: async () => {
    return authInstance
      .get('/user/recommend/follow')
      .then((res) => res.data)
      .catch(errorHandle);
  },
};

export default callApi;
