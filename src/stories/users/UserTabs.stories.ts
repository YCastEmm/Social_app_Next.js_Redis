import UserTabs from "@/components/users/UserTabs";
import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: "User/UserTabs",
    component: UserTabs,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: "centered",
    },
} satisfies Meta<typeof UserTabs>;


const messages = [
    {
        initials: "AS",
        name: "Anakin Skywalker",
        username: "anakin",
        message: "Primer mensaje",
        repliesCount: 13,
    },
    {
        initials: "AS",
        name: "Anakin Skywalker",
        username: "anakin",
        message: "Segundo mensaje",
        repliesCount: 7,
    },
]

const replies = [
    {
        initials: "HS",
        name: "Han Solo",
        username: "hansolo",
        message: "Primer mensaje",
    },
    {
        initials: "AS",
        name: "Anakin Skywalker",
        username: "anakin",
        message: "Segundo mensaje",
    }
];

export default meta;
type Story = StoryObj<typeof meta>;

export const MessageTab: Story = {
    args: {
        messages: messages,
        replies: replies
    },
};