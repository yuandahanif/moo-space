import { describe, expect, it, afterEach, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import ThreadCard from "./thread.card";
import { DB_THREAD, DB_USERS } from "src/__mocks__/db";
import { _registerNewUser } from "src/__mocks__/regsitration";

describe("ThreadCard component", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("Thread card should have correct title.", async () => {
    const wrapper = render(
      <ThreadCard thread={DB_THREAD} user={DB_USERS[0]} />
    );

    expect(wrapper).toBeTruthy();
    const title = await screen.findByText(DB_THREAD.title);

    expect(title.textContent).toEqual(DB_THREAD.title);
  });

  it("Thread card render correct vote.", async () => {
    const wrapper = render(
      <ThreadCard thread={DB_THREAD} user={DB_USERS[0]} />
    );

    expect(wrapper).toBeTruthy();
    const vote_count = await screen.findByLabelText("vote count");
    expect(vote_count.innerHTML).toEqual(
      String(DB_THREAD.upVotesBy.length - DB_THREAD.downVotesBy.length)
    );
  });
});
