import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@utils/api";

// Define the initial state using that type
const initialState: {
  threads: Thread[];
  status: API_Status;
} = {
  threads: [],
  status: "loading",
};

export const fetchAllThreads = createAsyncThunk("threads/getAll", async () => {
  try {
    const threads = await api.getAllThreads();
    return threads;
  } catch (error) {
    return [];
  }
});

export const allThreadSlice = createSlice({
  name: "ALL_THREADS",
  initialState,
  reducers: {
    setAllThreads: (state, action) => {
      state.threads = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllThreads.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAllThreads.fulfilled, (state, action) => {
        state.status = "success";
        state.threads = action.payload;
      })
      .addCase(fetchAllThreads.rejected, (state, action) => {
        state.status = "error";
        state.threads = [];
      });
  },
});

// export const { getAll } = allThreadSlice.actions;

export default allThreadSlice.reducer;
