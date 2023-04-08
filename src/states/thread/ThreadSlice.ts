import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@utils/api";

// Define the initial state using that type
const initialState: {
  threads: Thread[];
  status: API_Status;
} = {
  threads: [],
  status: "idle",
};

export const fetchAllThreads = createAsyncThunk("threads/getAll", async () => {
  try {
    const threads = await api.getAllThreads();
    return threads;
  } catch (error) {
    return [];
  }
});

export const createThread = createAsyncThunk(
  "threads/create",
  async ({
    body,
    category,
    title,
  }: {
    body: string;
    category: string;
    title: string;
  }) => {
    try {
      const threads = await api.createThreads({ body, category, title });
      return threads;
    } catch (error) {
      throw new Error("error creating threads");
    }
  }
);

export const threadSlice = createSlice({
  name: "THREADS",
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

    builder
      .addCase(createThread.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createThread.fulfilled, (state, action) => {
        state.status = "success";
        state.threads = [action?.payload, ...state.threads];
      })
      .addCase(createThread.rejected, (state) => {
        state.status = "error";
      });
  },
});

// export const { getAll } = threadSlice.actions;

export default threadSlice.reducer;
