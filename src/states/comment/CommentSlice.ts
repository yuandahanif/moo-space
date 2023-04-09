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

export const voteComment = createAsyncThunk(
  "comment/vote",
  async ({
    id,
    type,
    comment_id,
  }: {
    id: string;
    type: Vote_type;
    comment_id: string;
  }) => {
    try {
      const threads = await api.voteComment(id, comment_id, type);
      return threads;
    } catch (error) {
      throw new Error("error creating threads");
    }
  }
);

export const commentSlice = createSlice({
  name: "COMMENT",
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

    builder
      .addCase(voteComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(voteComment.fulfilled, (state) => {
        state.status = "success";
        state.comments = [];
      })
      .addCase(voteComment.rejected, (state) => {
        state.status = "error";
      });
  },
});

// export const { getAll } = commentSlice.actions;

export default commentSlice.reducer;
