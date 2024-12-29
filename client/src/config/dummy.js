export const posts = [
  {
    id: 20,
    userId: 10,
    userName: "johndoe45",
    content:
      "This was the beautiful views i ever seen in my entire life. love to share this to you guys",
    images: [
      "https://cdn.pixabay.com/photo/2013/07/18/20/26/sea-164989_640.jpg",
      "https://cdn.pixabay.com/photo/2013/07/18/20/26/sea-164989_640.jpg",
    ],
    likes: [
      {
        userId: 1,
        userName: "alfred.winfall",
      },
      {
        userId: 2,
        userName: "michelle.obama41",
      },
    ],
    comments: [
      {
        id: 1,
        postId: 20,
        userId: 1,
        userName: "michelle.obama41",
        comment: "Wow, so amazing bro",
      },
      {
        id: 2,
        postId: 20,
        userId: 2,
        userName: "alfred.winfall",
        comment: "Very nice view, Like it !!!",
      },
    ],
    replies: [
      {
        postId: 20,
        commentId: 1,
        userId: 10,
        userName: "johndoe45",
        comment: "Yeah, amazing right",
      },
    ],
  },
];
