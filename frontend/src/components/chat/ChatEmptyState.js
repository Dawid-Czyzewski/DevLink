import { useTranslation } from 'react-i18next';

const ChatEmptyState = () => {
    const { t } = useTranslation();

    return (
        <div className="flex-1 bg-gray-800/30 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-6 flex items-center justify-center">
            <div className="text-center">
                <div className="w-24 h-24 bg-gray-800/50 rounded-3xl mb-8 border border-gray-700/50 flex items-center justify-center mx-auto">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                        {t('chat.noChats')}
                    </h3>
                    <p className="text-gray-400 text-lg max-w-md mx-auto leading-relaxed">
                        {t('chat.noChatsMessage')}
                    </p>
            </div>
        </div>
    );
};

export default ChatEmptyState;
