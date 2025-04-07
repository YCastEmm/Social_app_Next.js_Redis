import UsersLayout from "@/app/(main)/layout";
import type { Meta, StoryObj } from "@storybook/react";



const meta = {
    title: "Layout/Base",
    component: UsersLayout,    
} satisfies Meta<typeof UsersLayout>;

export default meta;
type Story = StoryObj<typeof meta>;




export const Primary: Story = {
    args: {
        children: <>Contenido del children </>
    },
};
