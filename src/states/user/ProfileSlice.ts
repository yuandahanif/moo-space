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
        throw new Error("failed to login.");
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
    removeProfile: (state) => {
      state.status = "idle";
      state.profile = null;
      api.removeAccessToken();
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.rejected, (state) => {
        state.status = "error";
        state.profile = null;
      })
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
        state.profile = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = "success";
        state.profile = action.payload;
      });

    builder
      .addCase(login.rejected, (state) => {
        state.status = "error";
        state.profile = null;
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.profile = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.status = "idle";
        state.profile = null;
      });
  },
});

export const { removeProfile } = userProfileSlice.actions;

export default userProfileSlice.reducer;
