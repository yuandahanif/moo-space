import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@utils/api";

// Define the initial state using that type
const initialState: {
  all: User[];
  status: API_Status;
} = {
  all: [],
  status: "idle",
};

export const fetchAllUsers = createAsyncThunk("user/all", async () => {
  const profile = await api.getAllUsers();
  if (profile == null) {
    throw new Error("failed to get profile.");
  }
  return profile;
});

export const userProfileSlice = createSlice({
  name: "PROFILE",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.rejected, (state) => {
        state.status = "error";
        state.all = [];
      })
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = "loading";
        state.all = [];
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.status = "success";
        state.all = action.payload;
      });
  },
});

export default userProfileSlice.reducer;
