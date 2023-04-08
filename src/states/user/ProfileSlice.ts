import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@utils/api";

// Define the initial state using that type
const initialState: {
  profile: User | null;
  status: API_Status;
} = {
  profile: null,
  status: "idle",
};

export const fetchProfile = createAsyncThunk("user/ownProfile", async () => {
  try {
    const profile = await api.getOwnProfile();
    if (profile == null) {
      throw new Error("failed to get profile.");
    }
    return profile;
  } catch (error) {
    throw error;
  }
});

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const token = await api.login({ email, password });
      if (token == null) {
        throw new Error("failed to get profile.");
      }
      api.putAccessToken(token);
      return token;
    } catch (error) {
      throw error;
    }
  }
);

export const userProfileSlice = createSlice({
  name: "PROFILE",
  initialState,
  reducers: {
    setAllThreads: (state, action) => {
      state.profile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "error";
        state.profile = null;
      })
      .addCase(fetchProfile.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = "success";
        state.profile = action.payload;
      });

    builder
      .addCase(login.rejected, (state, action) => {
        state.status = "error";
        state.profile = null;
      })
      .addCase(login.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "success";
        // state.profile = ;
      });
  },
});

// export const { getAll } = userProfileSlice.actions;

export default userProfileSlice.reducer;
