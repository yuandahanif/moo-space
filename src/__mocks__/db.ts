const DB_USERS: User[] = [
  {
    id: "user-123",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://generated-image-url.jpg",
  },
];

const DB_THREAD = {
  id: "thread-1",
  title: "Thread Pertama",
  body: "Ini adalah thread pertama",
  category: "General",
  createdAt: "2021-06-21T07:00:00.000Z",
  ownerId: "users-1",
  upVotesBy: ["users-1", "users-2"],
  downVotesBy: ["users-3"],
  totalComments: 0,
};

export { DB_USERS, DB_THREAD };
