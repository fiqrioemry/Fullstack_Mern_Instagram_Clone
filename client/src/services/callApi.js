import Cookies from 'js-cookie';
import { authInstance, publicInstance } from './instance';

const errorHandle = (error) => {
  const errorMessage = error.response?.data?.message || 'Something went wrong';
  return Promise.reject(new Error(errorMessage));
};

const callApi = {
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

  getPublicPosts: async () => {
    return authInstance
      .get('/post')
      .then((res) => res.data)
      .catch(errorHandle);
  },

  getPostsFromFollowings: async () => {
    return authInstance
      .get('/post/followings')
      .then((res) => res.data)
      .catch(errorHandle);
  },

  // 🔹 Like & Unlike API's
  likePost: async (postId) => {
    return authInstance
      .post(`/post/${postId}/like`)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  unlikePost: async (postId) => {
    return authInstance
      .delete(`/post/${postId}/like`)
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
};

export default callApi;
