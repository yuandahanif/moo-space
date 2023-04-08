import { configureStore } from "@reduxjs/toolkit";
import allThreadSlice from "@states/thread/ThreadSlice";
import userProfileSlice from "@states/user/ProfileSlice";
import leaderboardSlice from "@states/leaderboard/LeaderboardSlice";
import threadDetailSlice from "./thread/ThreadDetailSlice";

const store = configureStore({
  reducer: {
    thread: allThreadSlice,
    profile: userProfileSlice,
    leaderboard: leaderboardSlice,
    threadDetail: threadDetailSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
