import {
  describe,
  expect,
  it,
  beforeAll,
  afterEach,
  vi,
  beforeEach,
} from "vitest";
import { cleanup, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Register from "./register";
import { type UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { DB_USERS } from "src/__mocks__/db";
import { _registerNewUser } from "src/__mocks__/regsitration";

/**
 * test scenario for Register component
 *
 * - Register component
 *  - should require name, password, and email to be filled
 *  - Should have correct value attribute
 *  - Should call onSubmit if all input is filled
 *  -
 *
 */

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

  beforeEach(({ meta }) => {
    console.log(meta.name);
  });

  const mockRegistrationSuccess = vi
    .fn()
    .mockImplementation(async (u: User) => await _registerNewUser(USERS, u));

  it("should require name, password, and email to be filled", async () => {
    const wrapper = render(<Register onSubmit={mockRegistrationSuccess} />);
    expect(wrapper).toBeTruthy();

    const email = wrapper.container.querySelector("input[type='email']");
    const submitBtn = wrapper.container.querySelector("button[type='submit']");

    if (email != null) {
      await user.type(email, email_value);
    }

    if (submitBtn != null) {
      await user.click(submitBtn);
    }

    expect(mockRegistrationSuccess).toBeCalledTimes(0);
  });

  it("Should have correct value attribute", async () => {
    const wrapper = render(<Register onSubmit={mockRegistrationSuccess} />);
    expect(wrapper).toBeTruthy();

    const email = wrapper.container.querySelector("input[type='email']");
    const name = wrapper.container.querySelector("input[type='text']");
    const password = wrapper.container.querySelector("input[type='password']");
    const submitBtn = wrapper.container.querySelector("button[type='submit']");

    if (email != null && name != null && password != null) {
      await user.type(email, email_value);
      await user.type(name, name_value);
      await user.type(password, password_value);
    }

    if (submitBtn != null) {
      await user.click(submitBtn);
    }

    expect(email?.getAttribute("value")).toBe(email_value);
    expect(name?.getAttribute("value")).toBe(name_value);
    expect(password?.getAttribute("value")).toBe(password_value);
  });

  it("Should call onSubmit if all input is filled", async () => {
    const wrapper = render(<Register onSubmit={mockRegistrationSuccess} />);
    expect(wrapper).toBeTruthy();

    const email = wrapper.container.querySelector("input[type='email']");
    const name = wrapper.container.querySelector("input[type='text']");
    const password = wrapper.container.querySelector("input[type='password']");
    const submitBtn = wrapper.container.querySelector("button[type='submit']");

    if (email != null && name != null && password != null) {
      await user.type(email, email_value);
      await user.type(name, name_value);
      await user.type(password, password_value);
    }

    if (submitBtn != null) {
      await user.click(submitBtn);
    }

    expect(mockRegistrationSuccess).toHaveBeenCalledOnce();
  });
});
