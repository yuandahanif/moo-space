import type { Meta, StoryObj } from "@storybook/react";
import CommentCard from "./comment.card";

const meta = {
  title: "Card/Comment",
  tags: ["autodocs"],
  component: CommentCard,
} satisfies Meta<typeof CommentCard>;

export default meta;
type Story = StoryObj<typeof CommentCard>;

export const Default: Story = {
  args: {
    comment: {
      id: "comment-1",
      content: "Ini adalah komentar pertama",
      createdAt: "2021-06-21T07:00:00.000Z",
      owner: {
        id: "users-1",
        name: "John Doe",
        email: "reed@mail.com",
        avatar: "https://generated-image-url.jpg",
      },
      upVotesBy: [],
      downVotesBy: [],
    },
  },
};
