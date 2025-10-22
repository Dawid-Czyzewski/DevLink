import { useTranslation } from 'react-i18next';

export const AnnouncementActionsMobile = ({ announcement, onEdit, onViewChats, onViewAnnouncement, onDeleteClick }) => {
    const { t } = useTranslation();

    return (
        <div className="grid grid-cols-2 gap-2">
            <button
                onClick={() => onEdit(announcement.id)}
                className="flex items-center justify-center px-3 py-2 bg-blue-600/80 hover:bg-blue-600 text-white text-xs rounded-lg transition-all duration-200 cursor-pointer"
            >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                {t('myAnnouncements.actions.edit')}
            </button>

            <button
                onClick={() => onViewChats(announcement.id)}
                className="flex items-center justify-center px-3 py-2 bg-green-600/80 hover:bg-green-600 text-white text-xs rounded-lg transition-all duration-200 cursor-pointer"
            >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                {t('myAnnouncements.actions.chats')}
            </button>

            <button
                onClick={() => onViewAnnouncement(announcement.id)}
                className="flex items-center justify-center px-3 py-2 bg-purple-600/80 hover:bg-purple-600 text-white text-xs rounded-lg transition-all duration-200 cursor-pointer"
            >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {t('myAnnouncements.actions.viewAnnouncement')}
            </button>

            <button
                onClick={() => onDeleteClick(announcement.id)}
                className="flex items-center justify-center px-3 py-2 bg-red-600/80 hover:bg-red-600 text-white text-xs rounded-lg transition-all duration-200 cursor-pointer"
            >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                {t('myAnnouncements.actions.delete')}
            </button>
        </div>
    );
};

export const AnnouncementActionsDesktop = ({ announcement, onEdit, onViewChats, onViewAnnouncement, onDeleteClick }) => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-2 min-w-[200px]">
            <div className="flex gap-2">
                <button
                    onClick={() => onEdit(announcement.id)}
                    className="group/btn flex-1 flex items-center justify-center px-3 py-2 bg-blue-600/80 hover:bg-blue-600 text-white text-xs rounded-lg transition-all duration-200 transform hover:scale-105 cursor-pointer"
                    title={t('myAnnouncements.actions.edit')}
                >
                    <svg className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                </button>

                <button
                    onClick={() => onViewChats(announcement.id)}
                    className="group/btn flex-1 flex items-center justify-center px-3 py-2 bg-green-600/80 hover:bg-green-600 text-white text-xs rounded-lg transition-all duration-200 transform hover:scale-105 cursor-pointer"
                    title={t('myAnnouncements.actions.chats')}
                >
                    <svg className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                </button>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={() => onViewAnnouncement(announcement.id)}
                    className="group/btn flex-1 flex items-center justify-center px-3 py-2 bg-purple-600/80 hover:bg-purple-600 text-white text-xs rounded-lg transition-all duration-200 transform hover:scale-105 cursor-pointer"
                    title={t('myAnnouncements.actions.viewAnnouncement')}
                >
                    <svg className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                </button>

                <button
                    onClick={() => onDeleteClick(announcement.id)}
                    className="group/btn flex-1 flex items-center justify-center px-3 py-2 bg-red-600/80 hover:bg-red-600 text-white text-xs rounded-lg transition-all duration-200 transform hover:scale-105 cursor-pointer"
                    title={t('myAnnouncements.actions.delete')}
                >
                    <svg className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        </div>
    );
};
