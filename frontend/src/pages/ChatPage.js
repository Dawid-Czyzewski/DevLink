import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { useChatState } from '../hooks/useChatState';
import { ChatPageHeader, ChatInterface } from '../components/chat';

const ChatPage = () => {
    const { t } = useTranslation();
    const { isAuthenticated } = useAuth();
    const {
        filteredChats,
        selectedChatId,
        messages,
        loading,
        messagesLoading,
        hasNewMessages,
        handleChatSelect,
        handleSendMessage
    } = useChatState();

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white mb-4">{t('auth.accessDenied')}</h1>
                    <p className="text-gray-400">{t('auth.loginRequired')}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 py-6 sm:py-8 lg:py-12">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
                <ChatPageHeader />
                <ChatInterface
                    chats={filteredChats}
                    selectedChatId={selectedChatId}
                    messages={messages}
                    messagesLoading={messagesLoading}
                    loading={loading}
                    hasNewMessages={hasNewMessages}
                    onChatSelect={handleChatSelect}
                    onSendMessage={handleSendMessage}
                />
            </div>
        </div>
    );
};

export default ChatPage;
