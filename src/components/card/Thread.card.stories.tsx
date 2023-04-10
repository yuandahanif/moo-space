import type { Meta, StoryObj } from "@storybook/react";
import ThreadCard from "@components/card/thread.card";

const meta = {
  title: "Card/Thread",
  tags: ["autodocs"],
  component: ThreadCard,
} satisfies Meta<typeof ThreadCard>;

export default meta;
type Story = StoryObj<typeof ThreadCard>;

export const Default: Story = {
  args: {
    thread: {
      id: "thread-1",
      title: "Thread Pertama",
      body: "Ini adalah thread pertama",
      category: "General",
      createdAt: "2021-06-21T07:00:00.000Z",
      ownerId: "users-1",
      upVotesBy: ["users-1", "users-2"],
      downVotesBy: ["users-3"],
      totalComments: 0,
    },
    user: {
      id: "john_doe",
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://generated-image-url.jpg",
    },
  },
};
