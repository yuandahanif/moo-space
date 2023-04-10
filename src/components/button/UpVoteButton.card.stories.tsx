import type { Meta, StoryObj } from "@storybook/react";
import Upvote from "./upvote.button";

const meta = {
  title: "Button/Upvote",
  tags: ["autodocs"],
  component: Upvote,
} satisfies Meta<typeof Upvote>;

export default meta;
type Story = StoryObj<typeof Upvote>;

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
