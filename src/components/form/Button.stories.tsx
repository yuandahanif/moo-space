import type { Meta, StoryObj } from "@storybook/react";
import Button from "./button";

const meta = {
  title: "Form/Button",
  tags: ["autodocs"],
  component: Button,
  argTypes: {
    children: {
      defaultValue: "Hello",
      description: "Teks.",
      type: { name: "string" },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};
