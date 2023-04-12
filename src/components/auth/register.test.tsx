import { describe, expect, it, beforeAll, afterEach, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Register from "./register";
import { type UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { DB_USERS } from "src/__mocks__/db";
import { _registerNewUser } from "src/__mocks__/regsitration";

describe("Register component", () => {
  let user: UserEvent;
  let USERS: User[];
  const email_value = "mona@gmail.com";
  const name_value = "mona";
  const password_value = "123456";

  beforeAll(() => {
    user = userEvent.setup();
    USERS = DB_USERS;
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  const mockRegistrationSuccess = vi
    .fn()
    .mockImplementation(async (u: User) => await _registerNewUser(USERS, u));

  it("Register should handle all required input", async () => {
    const wrapper = render(<Register onSubmit={mockRegistrationSuccess} />);
    expect(wrapper).toBeTruthy();

    const email = wrapper.container.querySelector("input[type='email']");
    const name = wrapper.container.querySelector("input[type='text']");
    const password = wrapper.container.querySelector("input[type='password']");
    const submitBtn = wrapper.container.querySelector("button[type='submit']");

    expect(email).toBeTruthy();
    expect(name).toBeTruthy();
    expect(password).toBeTruthy();
    expect(submitBtn).toBeTruthy();

    if (email != null && name != null && password != null) {
      await user.type(email, email_value);
      await user.type(name, name_value);
      await user.type(password, password_value);
    }

    expect(email?.getAttribute("value")).toBe(email_value);
    expect(name?.getAttribute("value")).toBe(name_value);
    expect(password?.getAttribute("value")).toBe(password_value);

    if (submitBtn != null) {
      await user.click(submitBtn);
    }

    expect(mockRegistrationSuccess).toHaveBeenCalledOnce();
  });

  it("Should add user to last", () => {
    const last_user = USERS[USERS.length - 1];
    expect(last_user.email).toEqual(email_value);
  });
});
