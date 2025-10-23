import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ChatHeader = ({ selectedChat }) => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const navigate = useNavigate();

    const getDisplayName = (chat) => {
        if (!user || !chat) return 'Unknown User';

        if (user.id === chat.announcement_author_id) {
            return chat.chat_initiator_nickname || 'Unknown User';
        }

        else {
            return chat.announcement_owner_nickname || 'Unknown User';
        }
    };

    const getAnnouncementTitle = (chat) => {
        if (!chat) return 'Unknown Announcement';
        return chat.announcement_title || 'Unknown Announcement';
    };

    const handleViewAnnouncement = () => {
        if (selectedChat) {
            navigate(`/view-announcement/${selectedChat.announcement_id}`);
        }
    };

    const handleViewProfile = () => {
        if (!selectedChat) return;
        
        let otherUserId;
        if (user?.id === selectedChat.announcement_author_id) {
            otherUserId = selectedChat.participants.find(id => id !== user.id);
        } else {
            otherUserId = selectedChat.announcement_author_id;
        }
        
        if (otherUserId) {
            navigate(`/view-profile/${otherUserId}`);
        }
    };

    if (!selectedChat) return null;

    return (
        <div className="border-b border-gray-700/50 pb-4 mb-4">
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-semibold text-white">
                    {getAnnouncementTitle(selectedChat)}
                </h2>
                <button
                    onClick={handleViewAnnouncement}
                    className="px-4 py-2 bg-yellow-400/20 hover:bg-yellow-400/30 border border-yellow-400/30 text-yellow-400 text-sm font-medium rounded-lg transition-all duration-300 cursor-pointer hover:scale-105"
                >
                    {t('chat.viewAnnouncement')}
                </button>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <p className="text-yellow-400 font-semibold text-lg">
                        {getDisplayName(selectedChat)}
                    </p>
                </div>
                <button
                    onClick={handleViewProfile}
                    className="px-4 py-2 bg-blue-400/20 hover:bg-blue-400/30 border border-blue-400/30 text-blue-400 text-sm font-medium rounded-lg transition-all duration-300 cursor-pointer hover:scale-105"
                >
                    {t('chat.viewProfile')}
                </button>
            </div>
        </div>
    );
};

export default ChatHeader;
