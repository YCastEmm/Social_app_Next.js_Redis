const MessagePage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    return <div>Mensaje {id}</div>;
};

export default MessagePage;
