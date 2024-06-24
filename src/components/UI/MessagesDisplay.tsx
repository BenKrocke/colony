const Messages = ({ messages }: { messages: Array<string> }) => {
    return (
        <div className="bg-[#472d3c] text-white h-[8rem] p-4 border-t-2 border-gray-500">
            {messages.map((message, index) => (<div key={index}>{message}</div>))}
        </div>
    )
};

export default Messages;