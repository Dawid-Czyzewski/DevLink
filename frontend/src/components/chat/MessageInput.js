import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const MessageInput = ({ onSendMessage, disabled = false }) => {
    const { t } = useTranslation();
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!message.trim() || sending || disabled) return;

        setSending(true);
        try {
            await onSendMessage(message.trim());
            setMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setSending(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-4">
            <div className="flex space-x-3">
                <div className="flex-1">
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={t('chat.messages.sendPlaceholder')}
                        disabled={disabled || sending}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-300 resize-none"
                        rows="1"
                        style={{ minHeight: '48px', maxHeight: '120px' }}
                    />
                </div>
                <button
                    type="submit"
                    disabled={!message.trim() || sending || disabled}
                    className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 disabled:from-gray-600 disabled:to-gray-700 cursor-pointer disabled:cursor-not-allowed text-black rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 disabled:transform-none disabled:scale-100"
                >
                    {sending ? (
                        <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-black/20 border-t-black"></div>
                            <span>{t('chat.messages.sending')}</span>
                        </div>
                    ) : (
                        t('chat.messages.sendButton')
                    )}
                </button>
            </div>
        </form>
    );
};

export default MessageInput;
