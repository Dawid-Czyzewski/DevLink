import { ChatList, ChatMessages, MessageInput, ChatEmptyState } from './index';

const ChatInterface = ({
    chats,
    selectedChatId,
    messages,
    messagesLoading,
    loading,
    hasNewMessages,
    onChatSelect,
    onSendMessage
}) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
            <div className="lg:col-span-1">
                <ChatList
                    chats={chats}
                    selectedChatId={selectedChatId}
                    onChatSelect={onChatSelect}
                    loading={loading}
                    hasNewMessages={hasNewMessages}
                />
            </div>

            <div className="lg:col-span-3 flex flex-col space-y-4">
                {selectedChatId ? (
                    <>
                        <ChatMessages
                            messages={messages}
                            loading={messagesLoading}
                            selectedChat={chats.find(chat => chat.id === selectedChatId)}
                        />
                        <MessageInput
                            onSendMessage={onSendMessage}
                            disabled={messagesLoading}
                        />
                    </>
                ) : (
                    <ChatEmptyState />
                )}
            </div>
        </div>
    );
};

export default ChatInterface;
