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
    return profile;
  } catch (error) {
    throw error;
  }
});

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
  },
});

// export const { getAll } = userProfileSlice.actions;

export default userProfileSlice.reducer;
