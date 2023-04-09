import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@utils/api";

// Define the initial state using that type
const initialState: {
  comments: Comment_[];
  status: API_Status;
} = {
  comments: [],
  status: "idle",
};

export const createComment = createAsyncThunk(
  "comment/create",
  async ({ content, id }: { content: string; id: string }) => {
    try {
      const comments = await api.createComment({ content, id });
      return comments;
    } catch (error) {
      throw new Error("error creating comments");
    }
  }
);

export const commentSlice = createSlice({
  name: "THREADS",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.status = "success";
        state.comments = [];
      })
      .addCase(createComment.rejected, (state) => {
        state.status = "error";
      });
  },
});

// export const { getAll } = commentSlice.actions;

export default commentSlice.reducer;
