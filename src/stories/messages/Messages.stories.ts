import Message from "@/components/messages/Message";
import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: "Messages/Message",
    component: Message,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: "centered",
    },
} satisfies Meta<typeof Message>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        message: {  initials: "AS", 
                    message: "Esto es un mensaje de prueba", 
                    name: "Anakin Skywalker", 
                    username: "anakin" },
    },
};
