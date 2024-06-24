export const processMessage = (messages: Array<string>, newMessage: string) => {
    const newMessages = structuredClone(messages);
    newMessages.push(newMessage);
    if (newMessages.length > 4) newMessages.shift();
    return newMessages;
}