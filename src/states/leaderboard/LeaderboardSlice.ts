import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@utils/api";

// Define the initial state using that type
const initialState: {
  leaderboard: Leaderboard[];
  status: API_Status;
} = {
  leaderboard: [],
  status: "idle",
};

export const fetchLeaderboard = createAsyncThunk(
  "leaderboard/getAll",
  async () => {
    try {
      const threads = await api.getLeaderboard();
      return threads;
    } catch (error) {
      return [];
    }
  }
);

export const leaderboardSlice = createSlice({
  name: "LEADERBOARD",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboard.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchLeaderboard.fulfilled, (state, action) => {
        state.status = "success";
        state.leaderboard = action.payload;
      })
      .addCase(fetchLeaderboard.rejected, (state, action) => {
        state.status = "error";
        state.leaderboard = [];
      });
  },
});

export default leaderboardSlice.reducer;
