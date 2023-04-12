import reducer, { adduser, login, removeProfile } from "./ProfileSlice";
import { beforeEach, describe, expect, it } from "vitest";

import type { AnyAction } from "@reduxjs/toolkit";
import {
  createAsyncThunk,
  unwrapResult,
  configureStore,
  createReducer,
} from "@reduxjs/toolkit";
import { useAppDispatch } from "@hooks/useRedux";

/**
 * test scenario for ProfileSlice function
 *
 * - ProfileSlice function
 *  - should be abble to add user
 *  - should be abble to remove user
 *  -
 *
 */
describe("Profile Slict Test", () => {
  const InitSlice: { profile: User | null; status: API_Status } = {
    profile: null,
    status: "idle",
  };

  const newUser = {
    avatar: "https://vitest.dev/logo.svg",
    email: "vitest@gmail.com",
    id: "vi",
    name: "vitest-user",
  };

  beforeEach(({ meta }) => {
    console.log(meta.name);
  });

  it("should get default status idle", () => {
    expect(reducer(undefined, { type: undefined })).toEqual(InitSlice);
  });

  it("should be abble to add user", () => {
    expect(reducer(InitSlice, adduser(newUser)).profile).toEqual(newUser);
  });

  it("should be abble to remove user", () => {
    const added_state = { ...InitSlice, profile: newUser };
    expect(reducer(added_state, removeProfile())).toEqual(InitSlice);
  });
});

/**
 * test scenario for Login thunk function
 *
 * - Login thunk function
 *  - creates the action types
 *  - exposes the typePrefix it was created with
 *  -
 *
 */
describe("Login thunk", () => {
  beforeEach(({ meta }) => {
    console.log(meta.name);
  });

  it("creates the action types", () => {
    const thunkActionCreator = login;

    expect(thunkActionCreator.fulfilled.type).toBe("user/login/fulfilled");
    expect(thunkActionCreator.pending.type).toBe("user/login/pending");
    expect(thunkActionCreator.rejected.type).toBe("user/login/rejected");
  });

  it("exposes the typePrefix it was created with", () => {
    const thunkActionCreator = login;
    expect(thunkActionCreator.typePrefix).toBe("user/login");
  });
});
