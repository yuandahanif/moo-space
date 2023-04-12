import reducer, { adduser, removeProfile } from "./ProfileSlice";
import { describe, expect, it } from "vitest";

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

  it("should get default status idle", () => {
    expect(reducer(undefined, { type: undefined })).toEqual(InitSlice);
  });

  it("should add user manualy", () => {
    expect(reducer(InitSlice, adduser(newUser)).profile).toEqual(newUser);
  });

  it("should be abble to remove user manualy", () => {
    const added_state = { ...InitSlice, profile: newUser };
    expect(reducer(added_state, removeProfile())).toEqual(InitSlice);
  });
});
