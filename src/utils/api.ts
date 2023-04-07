const api = (() => {
  const BASE_URL = import.meta.env.VITE_API_URL;

  async function _fetchWithAuth(url: string, options: RequestInit = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
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

    if (status !== "success") {
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

  async function getAllTalks() {
    const response = await fetch(`${BASE_URL}/talks`);

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { talks },
    } = responseJson;

    return talks;
  }

  async function getTalkDetail(id: string) {
    const response = await fetch(`${BASE_URL}/talks/${id}`);

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { talkDetail },
    } = responseJson;

    return talkDetail;
  }

  async function createTalk({
    text,
    replyTo = "",
  }: {
    text: string;
    replyTo: string;
  }) {
    const response = await _fetchWithAuth(`${BASE_URL}/talks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        replyTo,
      }),
    });

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { talk },
    } = responseJson;

    return talk;
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

  return {
    putAccessToken,
    getAccessToken,
    register,
    login,
    getOwnProfile,
    getAllUsers,
    getAllTalks,
    createTalk,
    toggleLikeTalk,
    getTalkDetail,
  };
})();

export default api;
