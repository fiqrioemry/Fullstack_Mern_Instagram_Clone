import { authInstance, publicInstance } from '.';

const errorHandle = (error) => {
  const errorMessage = error.response?.data?.message || 'Something went wrong';
  return Promise.reject(new Error(errorMessage));
};

const callApi = {
  authCheck: async () => {
    return authInstance
      .get('/auth/me')
      .then((res) => res.data)
      .catch(errorHandle);
  },

  // 🔹Authentication API route management
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
        return res.data;
      })
      .catch(errorHandle);
  },

  signout: async () => {
    return publicInstance
      .post('/auth/signout')
      .then((res) => {
        return res.data.message;
      })
      .catch(errorHandle);
  },

  refreshToken: async () => {
    return publicInstance
      .post('/auth/refresh')
      .then((res) => res.data)
      .catch(errorHandle);
  },

  // 🔹 User interaction API route management
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

  getMyProfile: async () => {
    return authInstance
      .get(`/user`)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  updateMyProfile: async (formData) => {
    return authInstance
      .put('/user/profile', formData)
      .then((res) => res.data.message)
      .catch(errorHandle);
  },

  follow: async (followingId) => {
    return authInstance
      .post(`/user/${followingId}/follow`)
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

  // 🔹 social content API route management :
  // 🔹 Post API's
  getUserPosts: async (username) => {
    return authInstance
      .get(`/user/${username}/posts`)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  createPost: async (formData) => {
    return authInstance
      .post('/post', formData)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  updatePost: async (formData, postId) => {
    return authInstance
      .put(`/post/${postId}`, formData)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  deletePost: async (postId) => {
    return authInstance
      .delete(`/post/${postId}`)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  getPostDetail: async (postId) => {
    return authInstance
      .get(`/post/${postId}`)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  getPublicPosts: async (limit) => {
    return authInstance
      .get(`/post?limit=${limit}`)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  getPostsFromFollowings: async (limit) => {
    return authInstance
      .get(`/post/followings?limit=${limit}`)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  likePost: async (postId) => {
    return authInstance
      .post(`/post/${postId}/like/post`)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  likeComment: async (commentId) => {
    return authInstance
      .post(`/post/${commentId}/like/comment`)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  // 🔹 Comment API's
  getComments: async (postId) => {
    return authInstance
      .get(`/post/${postId}/comments`)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  createComment: async (formData, postId) => {
    return authInstance
      .post(`/post/${postId}/comments`, formData)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  deleteComment: async (postId, commentId) => {
    return authInstance
      .delete(`/post/${postId}/comments/${commentId}`)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  getReplies: async (postId, commentId) => {
    return authInstance
      .get(`/post/${postId}/comments/${commentId}`)
      .then((res) => res.data)
      .catch(errorHandle);
  },
};

export default callApi;
