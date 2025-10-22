import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import AuthRequired from '../components/common/AuthRequired';
import { 
    MyAnnouncementsHeader, 
    MyAnnouncementsSearch, 
    MyAnnouncementsList 
} from '../components/myAnnouncements';
import announcementService from '../services/announcementService';

const MyAnnouncementsPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { isAuthenticated, isLoading: authLoading } = useAuth();
    const { addToast } = useToast();
    const [allAnnouncements, setAllAnnouncements] = useState([]);
    const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasActiveFilters, setHasActiveFilters] = useState(false);

    const fetchMyAnnouncements = useCallback(async () => {
        try {
            setLoading(true);
            const response = await announcementService.getUserAnnouncements();
            
            if (response.success) {
                const announcements = response.data.announcements || [];
                setAllAnnouncements(announcements);
                setFilteredAnnouncements(announcements);
            } else {
                addToast(response.message || t('myAnnouncements.errors.loadFailed'), 'error', 5000);
            }
        } catch (error) {
            console.error('Error fetching announcements:', error);
            addToast(t('myAnnouncements.errors.loadFailed'), 'error', 5000);
        } finally {
            setLoading(false);
        }
    }, [addToast, t]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchMyAnnouncements();
        }
    }, [isAuthenticated, fetchMyAnnouncements]);

    const handleSearch = useCallback((filters) => {
        const filtered = allAnnouncements.filter(announcement => {
            const titleMatch = !filters.title || 
                announcement.title.toLowerCase().includes(filters.title.toLowerCase());
            
            const tagsMatch = !filters.tags.length || 
                filters.tags.some(tag => 
                    announcement.tags.some(announcementTag => 
                        announcementTag.toLowerCase().includes(tag.toLowerCase())
                    )
                );
            
            const categoriesMatch = !filters.categories.length || 
                filters.categories.some(category => 
                    announcement.categories.includes(category)
                );
            
            return titleMatch && tagsMatch && categoriesMatch;
        });
        
        setFilteredAnnouncements(filtered);
        
        const hasFilters = filters.title || filters.tags.length > 0 || filters.categories.length > 0;
        setHasActiveFilters(hasFilters);
    }, [allAnnouncements]);

    const handleDeleteAnnouncement = useCallback(async (id) => {
        try {
            const response = await announcementService.deleteAnnouncement(id);
            
            if (response.success) {
                addToast(t('myAnnouncements.success.deleted'), 'success', 5000);
                setAllAnnouncements(prev => prev.filter(ann => ann.id !== id));
                setFilteredAnnouncements(prev => prev.filter(ann => ann.id !== id));
            } else {
                addToast(response.message || t('myAnnouncements.errors.deleteFailed'), 'error', 5000);
            }
        } catch (error) {
            console.error('Error deleting announcement:', error);
            addToast(t('myAnnouncements.errors.deleteFailed'), 'error', 5000);
        }
    }, [addToast, t]);

    const handleViewAnnouncement = useCallback((id) => {
        navigate(`/view-announcement/${id}`);
    }, [navigate]);

    const handleViewChats = useCallback((id) => {
        addToast('Funkcja czatów będzie wkrótce dostępna', 'info', 3000);
    }, [addToast]);

    const handleEditAnnouncement = useCallback((id) => {
        window.location.hash = `#/edit-announcement/${id}`;
    }, []);

    const handleAddNew = useCallback(() => {
        window.location.hash = '#/post-announcement';
    }, []);

    if (authLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <AuthRequired
                message={t('myAnnouncements.authRequiredMessage')}
            />
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
            <div className="py-6 sm:py-8 lg:py-12">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
                    <MyAnnouncementsHeader onAddNew={handleAddNew} />
                    
                    <div className="lg:hidden space-y-6">
                        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-4 shadow-xl">
                            <MyAnnouncementsSearch onSearch={handleSearch} />
                        </div>
                        
                        <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-4 shadow-xl">
                            <MyAnnouncementsList 
                                announcements={filteredAnnouncements}
                                loading={loading}
                                hasActiveFilters={hasActiveFilters}
                                onDelete={handleDeleteAnnouncement}
                                onViewAnnouncement={handleViewAnnouncement}
                                onViewChats={handleViewChats}
                                onEdit={handleEditAnnouncement}
                            />
                        </div>
                    </div>

                    <div className="hidden lg:grid lg:grid-cols-5 gap-8">
                        <div className="lg:col-span-2">
                            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-6 shadow-xl">
                                <MyAnnouncementsSearch onSearch={handleSearch} />
                            </div>
                        </div>
                        
                        <div className="lg:col-span-3">
                            <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-8 shadow-xl">
                                <MyAnnouncementsList 
                                    announcements={filteredAnnouncements}
                                    loading={loading}
                                    hasActiveFilters={hasActiveFilters}
                                    onDelete={handleDeleteAnnouncement}
                                    onViewAnnouncement={handleViewAnnouncement}
                                    onViewChats={handleViewChats}
                                    onEdit={handleEditAnnouncement}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyAnnouncementsPage;
