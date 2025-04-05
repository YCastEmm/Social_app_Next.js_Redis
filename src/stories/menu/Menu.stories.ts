import Menu from "@/components/menu/Menu";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
    title: "Menu/Message",
    component: Menu,
    parameters: {
        layout: "centered",
    },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        links: [
            { title: "Inicio", href: "/" },
            { title: "Explorar", href: "/explorar" },
            { title: "Perfil", href: "/mi-perfil" },
        ],
    },
};
