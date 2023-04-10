import type { Meta, StoryObj } from "@storybook/react";
import Login from "./login";

const meta = {
  title: "Modal/Login",
  tags: ["autodocs"],
  component: Login,
  parameters: {
    docs: {
      description: {
        component:
          "A modal component that allows you to login to your account.",
      },
    },
  },
} satisfies Meta<typeof Login>;

export default meta;
type Story = StoryObj<typeof Login>;

export const Default: Story = {
  args: { fixed: false },
  parameters: { docs: { description: { fixed: "aaaa" } } },
};
