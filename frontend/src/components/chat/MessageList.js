import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect, useRef } from 'react';

const MessageList = ({ messages }) => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const messagesEndRef = useRef(null);

    const formatMessageTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString('pl-PL', { 
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit', 
            minute: '2-digit' 
        });
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            const container = messagesEndRef.current.parentElement;
            if (container) {
                container.scrollTop = container.scrollHeight;
            }
        }
    }, [messages]);

    if (messages.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">{t('chat.messages.noMessages')}</h3>
                    <p className="text-gray-400">{t('chat.messages.noMessagesMessage')}</p>
                </div>
            </div>
        );
    }

    return (
        <div 
            className="flex-1 overflow-y-auto space-y-4 mb-4 min-h-0 chat-scrollbar"
            style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#4B5563 #1F2937'
            }}
        >
            {messages
                .slice()
                .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
                .map((message) => {
                    const isOwnMessage = message.sender_id === user?.id;
                    
                    return (
                        <div
                            key={message.id}
                            className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                    isOwnMessage
                                        ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black'
                                        : 'bg-gray-700/50 text-white'
                                }`}
                            >
                                <p className={`text-xs mb-1 ${
                                    isOwnMessage ? 'text-gray-700' : 'text-gray-300'
                                }`}>
                                    {isOwnMessage ? 'ty:' : `${message.sender_nickname || t('messages.unknownSender')}:`}
                                </p>
                                <p className="text-sm">{message.content}</p>
                                <p className={`text-xs mt-1 ${
                                    isOwnMessage ? 'text-gray-700' : 'text-gray-400'
                                }`}>
                                    {formatMessageTime(message.created_at)}
                                </p>
                            </div>
                        </div>
                    );
                })}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default MessageList;
