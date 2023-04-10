import type { Meta, StoryObj } from "@storybook/react";
import Input from "./input";

const meta = {
  title: "Form/Input",
  tags: ["autodocs"],
  component: Input,
  argTypes: {
    textLabel: {
      name: "Label",
      defaultValue: "Hello",
      description: "Taruh label di sini.",
      type: { name: "string" },
    },
    onChange: {
      type: { name: "function" },
      description: "Saat value berubah.",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};
