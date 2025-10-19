import { useTranslation } from 'react-i18next';
import MyAnnouncementsLoadingState from './MyAnnouncementsLoadingState';
import MyAnnouncementsEmptyState from './MyAnnouncementsEmptyState';
import MyAnnouncementsItem from './MyAnnouncementsItem';

const MyAnnouncementsList = ({ announcements, loading, onDelete, onCopyLink, onViewChats, onEdit }) => {
    const { t } = useTranslation();

    if (loading) {
        return <MyAnnouncementsLoadingState />;
    }

    if (announcements.length === 0) {
        return <MyAnnouncementsEmptyState />;
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">
                            {t('myAnnouncements.list.title')}
                        </h2>
                        <p className="text-gray-400 text-sm">
                            {t('myAnnouncements.list.count', { count: announcements.length })}
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-3 lg:space-y-4">
                {announcements.map((announcement) => (
                    <MyAnnouncementsItem
                        key={announcement.id}
                        announcement={announcement}
                        onDelete={onDelete}
                        onCopyLink={onCopyLink}
                        onViewChats={onViewChats}
                        onEdit={onEdit}
                    />
                ))}
            </div>
        </div>
    );
};

export default MyAnnouncementsList;
