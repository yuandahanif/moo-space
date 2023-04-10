import type { Meta, StoryObj } from "@storybook/react";
import Header from "./header";

const meta = {
  title: "Header/Default",
  tags: ["autodocs"],
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {};
