interface Vote {
  id: string;
  userId: string;
  threadId: string;
  voteType: 0 | 1 | -1;
}

type Vote_type = "up" | "down" | "netural";
