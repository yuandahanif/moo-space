type Comment = {
  id: string;
  content: string;
  createdAt: string;
  owner: User;
  upVotesBy: string[];
  downVotesBy: string[];
};
