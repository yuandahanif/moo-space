const api = (() => {
  const BASE_URL = import.meta.env.VITE_API_URL;

  async function _fetchWithAuth(url: string, options: RequestInit = {}) {
    const accessToken = getAccessToken();

    if (!accessToken) {
      throw new Error("No Access Token");
    }

    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  function putAccessToken(token: string) {
    localStorage.setItem("accessToken", token);
  }

  function getAccessToken() {
    return localStorage.getItem("accessToken");
  }

  async function register({
    email,
    name,
    password,
  }: {
    email: string;
    name: string;
    password: string;
  }) {
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
  }) {
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

  async function getOwnProfile() {
    const response = await _fetchWithAuth(`${BASE_URL}/users/me`);

    const responseJson = (await response.json()) as API_Wrapper<{ user: User }>;

    const { status, message } = responseJson;

    if (status != "success") {
      throw new Error(message);
    }

    const {
      data: { user },
    } = responseJson;

    return user;
  }

  async function getAllUsers() {
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

  async function getAllThreads() {
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

  async function getThreadDetail(id: string) {
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
  }) {
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
  }) {
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

  async function toggleLikeTalk(id: string) {
    const response = await _fetchWithAuth(`${BASE_URL}/talks/likes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        talkId: id,
      }),
    });

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }
  }

  // TODO: vote

  async function getLeaderboard() {
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
    getOwnProfile,
    getAllUsers,
    getAllThreads,
    createThreads,
    toggleLikeTalk,
    getThreadDetail,
    createComment,
    getLeaderboard,
  };
})();

export default api;
