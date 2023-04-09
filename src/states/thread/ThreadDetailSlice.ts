import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@utils/api";

// Define the initial state using that type
const initialState: {
  thread: Thread_Detail | null;
  status: API_Status;
} = {
  thread: null,
  status: "idle",
};

export const fetchThreadDetail = createAsyncThunk(
  "threads/getThreadDetail",
  async (id: string) => {
    try {
      const threads = await api.getThreadDetail(id);
      return threads;
    } catch (error) {
      throw new Error("error geting threads");
    }
  }
);

export const threadSlice = createSlice({
  name: "THREAD_DETAIL",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreadDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchThreadDetail.fulfilled, (state, action) => {
        state.status = "success";
        state.thread = action.payload;
      })
      .addCase(fetchThreadDetail.rejected, (state) => {
        state.status = "error";
        state.thread = null;
      });
  },
});

// export const { getAll } = threadSlice.actions;

export default threadSlice.reducer;
