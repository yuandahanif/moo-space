import type { Meta, StoryObj } from "@storybook/react";
import Loading from "./loading";

const meta = {
  title: "Loading/Spinner",
  tags: ["autodocs"],
  component: Loading,
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof Loading>;

export const Default: Story = {};
