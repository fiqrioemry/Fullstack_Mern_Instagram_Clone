# 🚀 Instagram Clone - Fullstack Web Application

Proyek ini saya buat dengan menerapkan fitur seperti halnya aplikasi instagram dimana aplikasi web sosial media yang saya buat dalam project kali ini memungkinkan pengguna untuk berbagi postingan, berinteraksi dengan pengguna lain, serta mengirim pesan real-time dengan fitur **chat**. Backend menggunakan **Node.js (Express.js)** dengan **MySQL & Cassandra**, sementara frontend dikembangkan dengan **React.js (Vite) & TailwindCSS**.

---

## 📝 Deskripsi Proyek

**Instagram Clone** adalah aplikasi sosial media yang memiliki fitur seperti pembuatan postingan, sistem like & komentar (fitur komentar bersarang yang memungkinkan pengguna melakukan mention dan mereply dari komen user sebelumnya), autentikasi menggunakan OAuth Google + JWT Token, serta fitur **chat real-time** menggunakan **Socket.io & Cassandra**.

Proyek ini bertujuan untuk mensimulasikan fitur-fitur dasar dari Instagram dengan performa dan keamanan yang optimal.

---

## 🎯 Fitur Utama

### 🔹 **Autentikasi & Otorisasi**

- **OAuth 2.0** (Google Login) + **JWT Token** untuk refresh & access token.
- **Sistem OTP** untuk verifikasi pengguna.
- **Manajemen sesi pengguna** menggunakan Redis.

### 🔹 **Postingan & Interaksi Sosial**

- **Postingan:** Tambah, edit, hapus, dan lihat postingan publik atau dari pengguna yang diikuti (Following user).
- **Bookmark:** Menyimpan postingan favorit.
- **Like & Komentar:** Memberikan like dan komentar di postingan.

### 🔹 **Chat Real-time**

- **WebSocket (Socket.io) + Cassandra Database** untuk menyimpan dan mengirim pesan real-time.
- **Dukungan Media:** Kirim pesan teks dan gambar menggunakan **Multer & Cloudinary**.

### 🔹 **Notifikasi & Interaksi Pengguna**

- Dapatkan **notifikasi** saat mendapatkan like, komentar, atau diikuti oleh pengguna lain.
- **Sistem pencarian pengguna** dan fitur **follow/unfollow**.

---

## 🛠 Teknologi & Library yang Digunakan

### 🔹 **Backend (Node.js & Express)**

- **Database:** MySQL (Sequelize ORM) & Cassandra (untuk chat).
- **Autentikasi:** Passport.js (OAuth 2.0), JWT, bcrypt.
- **File Storage:** Multer & Cloudinary.
- **Email Service:** Nodemailer.
- **Redis:** Digunakan untuk caching dan rate limiting.
- **Socket.io:** Untuk komunikasi real-time.

### 🔹 **Frontend (React.js & Vite)**

- **State Management:** Zustand.
- **UI Framework:** TailwindCSS.
- **Form Handling:** Formik & Yup.
- **Router:** React Router.
- **Notifications:** React Hot Toast.
- **Carousel & Animations:** Framer Motion, Embla Carousel.

---

## 📌 API Endpoint

### 🔹 **Autentikasi & User Management**

```plaintext
GET     /auth/google                -> Login dengan Google
POST    /auth/signup                -> Daftar akun baru
POST    /auth/signin                -> Masuk ke akun
POST    /auth/signout               -> Keluar dari akun
POST    /auth/send-otp              -> Kirim OTP ke email
POST    /auth/verify-otp            -> Verifikasi OTP
POST    /auth/refresh               -> Refresh access token
GET     /auth/me                    -> Periksa status login pengguna
```

### 🔹 **Post Management**

```plaintext
GET     /auth/google                -> Login / Registrasi langsung dengan Google
POST    /auth/signup                -> Daftar akun baru
POST    /auth/signin                -> Masuk ke akun
POST    /auth/signout               -> Keluar dari akun
POST    /auth/send-otp              -> Kirim OTP ke email
POST    /auth/verify-otp            -> Verifikasi OTP
POST    /auth/refresh               -> Refresh access token
GET     /auth/me                    -> Periksa status login pengguna
```

### 🔹 **Real-Time Chat Management**

```plaintext
GET     /chat                        -> Lihat daftar chat
GET     /chat/:receiverId            -> Lihat chat dengan pengguna tertentu
POST    /chat/:receiverId            -> Kirim pesan baru (gambar & teks)
```

### 🔹 **Notifikasi & Profil Management**

```plaintext
GET     /user/notifications          -> Lihat daftar notifikasi
PUT     /user/notifications          -> Tandai notifikasi sebagai telah dibaca
GET     /user/profile                -> Lihat profil sendiri
PUT     /user/profile                -> Perbarui profil (dengan avatar)
```

### 🔹 **User interaction Management**

```plaintext
GET     /user/search?query={username} -> Cari pengguna
POST    /user/:followingId/follow     -> Ikuti atau berhenti mengikuti pengguna lain
GET     /user/:username/followers     -> Lihat daftar pengikut
GET     /user/:username/followings    -> Lihat daftar yang diikuti
```

📷 Preview Proyek

🚀How To Run this project


## 🔹 **1. Clone Repository**
```
git clone https://github.com/fiqrioemry/Fullstack_Mern_Instagram_Clone.git
cd Fullstack_Mern_Instagram_Clone
```



## 🔹 **2. Backend Setup**
**1. Install Dependencies**
```
cd backend
npm install
```

**2. Configure .Env file**
```
# host configure
SERVER_PORT=5000
NODE_ENV=development
CLIENT_HOST=http://localhost:5173

# token configure
REFRESH_TOKEN=your_refresh_token_here
ACCESS_TOKEN=your_access_token_here

# database
DB_USERNAME=your_db_username
DB_HOST=your_db_host
DB_PASSWORD=your_db_password
DB_DATABASE=your_db_name

SERVER_API_KEY=your_server_api_key

# cloudinary config
CLOUD_NAME=your_cloud_name
API_KEY=your_api_key
API_SECRET=your_api_secret
CLOUD_FOLDER=your_cloud_folder

# nodemailer config
USER_EMAIL=your_email
USER_PASSWORD=your_email_password

# redis config
REDIS_PORT=your_redis_port
REDIS_CLIENT_PASSWORD=your_redis_client_password
REDIS_CLIENT_URL=your_redis_client_url

# google config
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
GOOGLE_CLIENT_ID=your_google_client_id
```

**3.Run server**
```
npm run dev
```

## 🔹 **3. Frontend Setup**
**1. Install Dependencies**
```
cd frontend
npm install
```

**2. Run application**
```
npm run dev
```

👤 Kontributor
Ahmad Fiqri Oemry – Fullstack Developer


📚 Dokumentasi API
Jika ingin melihat dokumentasi API lebih lengkap, silakan bisa request ke email saya : ahmadfiqrioemry@gmail.com

📩 Kontak & Media Sosial
Bagui yang memiliki pertanyaan atau ingin berkolaborasi,bisa hubungi saya melalui:

- website: ahmadfiqrioemry.com
- Email: ahmadfiqrioemryl@gmail.com
- LinkedIn: linkedin.com/in/fiqrioemry
- GitHub: github.com/fiqrioemry

Please leave a like for my project if you find it usefull. Thank you

📜 Lisensi
Proyek ini dilisensikan di bawah MIT License. Silakan gunakan dan kembangkan sesuai kebutuhan.
