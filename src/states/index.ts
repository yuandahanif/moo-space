import { configureStore } from "@reduxjs/toolkit";
import allThreadSlice from "@states/thread/AllThreadSlice";
import userProfileSlice from "@states/user/ProfileSlice";

const store = configureStore({
  reducer: { allThreadSlice, userProfileSlice },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
