import type { Meta, StoryObj } from "@storybook/react";
import DownVote from "./downvote.button";

const meta = {
  title: "Button/Downvote",
  tags: ["autodocs"],
  component: DownVote,
} satisfies Meta<typeof DownVote>;

export default meta;
type Story = StoryObj<typeof DownVote>;

export const Default: Story = {
  args: {
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
