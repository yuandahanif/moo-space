import type { Meta, StoryObj } from "@storybook/react";
import Register from "./register";

const meta = {
  title: "Modal/Register",
  tags: ["autodocs"],
  component: Register,
} satisfies Meta<typeof Register>;

export default meta;
type Story = StoryObj<typeof Register>;

export const Default: Story = {
  args: { fixed: false },
};
