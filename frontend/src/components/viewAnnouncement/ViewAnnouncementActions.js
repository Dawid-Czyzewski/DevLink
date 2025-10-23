import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import chatService from '../../services/chatService';

const ViewAnnouncementActions = ({ announcement }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();
    const { addToast } = useToast();
    const [isStartingChat, setIsStartingChat] = useState(false);
    const isAuthor = isAuthenticated && user && user.id === announcement.user_id;

    const handleViewProfile = () => {
        if (announcement.user_id) {
            navigate(`/view-profile/${announcement.user_id}`);
        }
    };

    const handleViewAnnouncementChats = () => {
        navigate(`/chats?announcementId=${announcement.id}`);
    };

    const handleStartChat = async () => {
        if (!isAuthenticated) {
            addToast(t('viewAnnouncement.errors.loginRequired'), 'error', 3000);
            navigate('/login');
            return;
        }

        setIsStartingChat(true);
        try {
            let response;
            
            try {
                response = await chatService.getChatByAnnouncementId(announcement.id);
                
                if (response.success) {
                    const chatId = response.data.chat?.id;
                    if (chatId) {
                        navigate(`/chats?chatId=${chatId}`);
                    } else {
                        navigate('/chats');
                    }
                    return;
                }
            } catch (error) {}
            
            response = await chatService.joinChat(announcement.id);
            
            if (response.success) {
                const chatId = response.data.chat?.id;
                if (chatId) {
                    navigate(`/chats?chatId=${chatId}`);
                } else {
                    navigate('/chats');
                }
            } else {
                addToast(response.message || t('chat.errors.joinFailed'), 'error', 5000);
            }
        } catch (error) {
            console.error('Error starting chat:', error);
            addToast(t('chat.errors.joinFailed'), 'error', 5000);
        } finally {
            setIsStartingChat(false);
        }
    };

    const handleCopyLink = async () => {
        const url = `${window.location.origin}/#/view-announcement/${announcement.id}`;
        try {
            await navigator.clipboard.writeText(url);
            addToast(t('viewAnnouncement.success.linkCopied'), 'success', 3000);
        } catch (error) {
            console.error('Error copying link:', error);
            addToast(t('viewAnnouncement.errors.linkCopyFailed'), 'error', 3000);
        }
    };


    return (
        <div className="space-y-6">
            <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {t('viewAnnouncement.actions.author')}
                </h3>
                
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full mb-4">
                        <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    
                    <h4 className="text-white font-semibold text-lg mb-2">
                        {announcement.user_name || t('viewAnnouncement.content.unknown')}
                    </h4>
                    
                    <button
                        onClick={handleViewProfile}
                        className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black px-6 py-3 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 cursor-pointer flex items-center justify-center gap-3"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {t('viewAnnouncement.actions.viewProfile')}
                    </button>
                </div>
            </div>

            <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    {t('viewAnnouncement.actions.chat')}
                </h3>
                
                <button
                    onClick={isAuthor ? handleViewAnnouncementChats : handleStartChat}
                    disabled={isStartingChat}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl disabled:shadow-none transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 disabled:transform-none disabled:scale-100 cursor-pointer flex items-center justify-center gap-3"
                >
                    {isStartingChat ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/20 border-t-white"></div>
                            <span>Starting chat...</span>
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            {isAuthor 
                                ? t('viewAnnouncement.actions.viewAnnouncementChats')
                                : (isAuthenticated ? t('viewAnnouncement.actions.startChat') : t('viewAnnouncement.actions.loginToChat'))
                            }
                        </>
                    )}
                </button>
            </div>

            <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    {t('viewAnnouncement.actions.share')}
                </h3>
                
                <button
                    onClick={handleCopyLink}
                    className="w-full bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 cursor-pointer flex items-center justify-center gap-3"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    {t('viewAnnouncement.actions.copyLink')}
                </button>
            </div>
        </div>
    );
};

export default ViewAnnouncementActions;
