const api = (() => {
  const BASE_URL = import.meta.env.VITE_API_URL as string;

  async function _fetchWithAuth(
    url: string,
    options: RequestInit = {}
  ): Promise<Response> {
    const accessToken = getAccessToken();

    if (accessToken == null) {
      throw new Error("No Access Token");
    }

    return await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  function putAccessToken(token: string): void {
    localStorage.setItem("accessToken", token);
  }

  function getAccessToken(): string | null {
    return localStorage.getItem("accessToken");
  }

  function removeAccessToken(): void {
    localStorage.removeItem("accessToken");
  }

  async function register({
    email,
    name,
    password,
  }: {
    email: string;
    name: string;
    password: string;
  }): Promise<User> {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        name,
        password,
      }),
    });

    const responseJson = (await response.json()) as API_Wrapper<{ user: User }>;
    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { user },
    } = responseJson;

    return user;
  }

  async function login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<string> {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const responseJson = (await response.json()) as API_Wrapper<{
      token: string;
    }>;

    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { token },
    } = responseJson;

    return token;
  }

  async function getOwnProfile(): Promise<User> {
    const response = await _fetchWithAuth(`${BASE_URL}/users/me`);

    const responseJson = (await response.json()) as API_Wrapper<{ user: User }>;

    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { user },
    } = responseJson;

    return user;
  }

  async function getAllUsers(): Promise<User[]> {
    const response = await fetch(`${BASE_URL}/users`);

    const responseJson = (await response.json()) as API_Wrapper<{
      users: User[];
    }>;

    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { users },
    } = responseJson;

    return users;
  }

  async function getAllThreads(): Promise<Thread[]> {
    const response = await fetch(`${BASE_URL}/threads`);
    const responseJson = (await response.json()) as API_Wrapper<{
      threads: Thread[];
    }>;

    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { threads },
    } = responseJson;

    return threads;
  }

  async function getThreadDetail(id: string): Promise<Thread_Detail> {
    const response = await fetch(`${BASE_URL}/threads/${id}`);

    const responseJson = (await response.json()) as API_Wrapper<{
      detailThread: Thread_Detail;
    }>;

    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { detailThread },
    } = responseJson;

    return detailThread;
  }

  async function createThreads({
    body,
    category,
    title,
  }: {
    title: string;
    body: string;
    category: string;
  }): Promise<Thread> {
    const response = await _fetchWithAuth(`${BASE_URL}/threads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        body,
        category,
      }),
    });

    const responseJson = (await response.json()) as API_Wrapper<{
      thread: Thread;
    }>;

    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { thread },
    } = responseJson;

    return thread;
  }

  async function createComment({
    id,
    content,
  }: {
    id: string;
    content: string;
  }): Promise<Comment> {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${id}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
        }),
      }
    );

    const responseJson = (await response.json()) as API_Wrapper<{
      comment: Comment;
    }>;

    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { comment },
    } = responseJson;

    return comment;
  }

  async function voteThread(id: string, type: Vote_type): Promise<Vote> {
    let url = `${BASE_URL}/threads/`;

    switch (type) {
      case "down":
        url += `${id}/down-vote`;
        break;
      case "netural":
        url += `${id}/neutral-vote`;
        break;
      case "up":
        url += `${id}/up-vote`;
        break;
      default:
        break;
    }

    const response = await _fetchWithAuth(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseJson = (await response.json()) as API_Wrapper<{
      vote: Vote;
    }>;

    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { vote },
    } = responseJson;

    return vote;
  }
  async function voteComment(
    thread_id: string,
    comment_id: string,
    type: Vote_type
  ): Promise<Vote> {
    let url = `${BASE_URL}/threads/${thread_id}/comments/${comment_id}/`;

    switch (type) {
      case "down":
        url += "down-vote";
        break;
      case "netural":
        url += "neutral-vote";
        break;
      case "up":
        url += "up-vote";
        break;
      default:
        break;
    }

    const response = await _fetchWithAuth(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseJson = (await response.json()) as API_Wrapper<{
      vote: Vote;
    }>;

    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { vote },
    } = responseJson;

    return vote;
  }

  async function getLeaderboard(): Promise<Leaderboard[]> {
    const response = await fetch(`${BASE_URL}/leaderboards`);
    const responseJson = (await response.json()) as API_Wrapper<{
      leaderboards: Leaderboard[];
    }>;

    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { leaderboards },
    } = responseJson;

    return leaderboards;
  }

  return {
    putAccessToken,
    getAccessToken,
    register,
    login,
    voteComment,
    getOwnProfile,
    getAllUsers,
    getAllThreads,
    createThreads,
    voteThread,
    getThreadDetail,
    createComment,
    getLeaderboard,
    removeAccessToken,
  };
})();

export default api;
