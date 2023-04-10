interface Comment_ {
  id: string;
  content: string;
  createdAt: string;
  owner: User;
  upVotesBy: string[];
  downVotesBy: string[];
}
