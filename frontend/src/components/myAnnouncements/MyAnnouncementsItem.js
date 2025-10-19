import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ConfirmModal from '../common/ConfirmModal';
import { useAnnouncementsUtils } from './MyAnnouncementsUtils';
import { 
    AnnouncementContentMobile, 
    AnnouncementContentDesktop
} from './MyAnnouncementsItemContent';
import { 
    AnnouncementActionsMobile,
    AnnouncementActionsDesktop
} from './MyAnnouncementsItemActions';

const MyAnnouncementsItem = ({ announcement, onDelete, onCopyLink, onViewChats, onEdit }) => {
    const { t } = useTranslation();
    const { formatDate, getCategoryLabel } = useAnnouncementsUtils();
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, announcementId: null });

    const handleDeleteClick = (announcementId) => {
        setDeleteModal({ isOpen: true, announcementId });
    };

    const handleDeleteConfirm = () => {
        onDelete(deleteModal.announcementId);
        setDeleteModal({ isOpen: false, announcementId: null });
    };

    const handleDeleteCancel = () => {
        setDeleteModal({ isOpen: false, announcementId: null });
    };

    return (
        <>
            <div className="group bg-gray-800/50 backdrop-blur-lg rounded-xl lg:rounded-2xl border border-gray-700/50 p-4 lg:p-6 hover:border-gray-600/50 transition-all duration-300 hover:shadow-xl">
                <div className="lg:hidden">
                    <AnnouncementContentMobile 
                        announcement={announcement}
                        formatDate={formatDate}
                        getCategoryLabel={getCategoryLabel}
                    />
                    <AnnouncementActionsMobile 
                        announcement={announcement}
                        onEdit={onEdit}
                        onViewChats={onViewChats}
                        onCopyLink={onCopyLink}
                        onDeleteClick={handleDeleteClick}
                    />
                </div>

                <div className="hidden lg:flex items-start justify-between">
                    <AnnouncementContentDesktop 
                        announcement={announcement}
                        formatDate={formatDate}
                        getCategoryLabel={getCategoryLabel}
                    />
                    <AnnouncementActionsDesktop 
                        announcement={announcement}
                        onEdit={onEdit}
                        onViewChats={onViewChats}
                        onCopyLink={onCopyLink}
                        onDeleteClick={handleDeleteClick}
                    />
                </div>
            </div>

            <ConfirmModal
                isOpen={deleteModal.isOpen}
                onClose={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
                title={t('myAnnouncements.confirmDelete')}
                message={t('myAnnouncements.confirmDeleteMessage', 'Czy na pewno chcesz usunąć to ogłoszenie? Ta akcja nie może zostać cofnięta.')}
                confirmText={t('myAnnouncements.actions.delete')}
                cancelText={t('common.cancel', 'Anuluj')}
                type="danger"
            />
        </>
    );
};

export default MyAnnouncementsItem;