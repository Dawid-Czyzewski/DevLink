import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';
import announcementService from '../services/announcementService';
import {
    HomePageHeader,
    HomePageFilters,
    HomePageResults,
    HomePageEmptyState,
    HomePageGrid,
    HomePageLoading
} from '../components/homePage';

const HomePage = () => {
    const navigate = useNavigate();
    const { addToast } = useToast();
    const [allAnnouncements, setAllAnnouncements] = useState([]);
    const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('newest');
    const [selectedCategories, setSelectedCategories] = useState([]);

    const fetchAnnouncements = useCallback(async () => {
        try {
            setLoading(true);
            const response = await announcementService.getAllAnnouncements(50, 0);
            
            if (response.success && response.data && response.data.announcements) {
                setAllAnnouncements(response.data.announcements);
                setFilteredAnnouncements(response.data.announcements);
            } else {
                addToast(response.message || 'Failed to load announcements', 'error', 5000);
            }
        } catch (error) {
            console.error('Error fetching announcements:', error);
            addToast('Failed to load announcements', 'error', 5000);
        } finally {
            setLoading(false);
        }
    }, [addToast]);

    useEffect(() => {
        fetchAnnouncements();
    }, [fetchAnnouncements]);

    useEffect(() => {
        let filtered = allAnnouncements;

        if (searchTerm.trim()) {
            const searchLower = searchTerm.toLowerCase();
            filtered = filtered.filter(announcement => {
                if (announcement.description && announcement.description.toLowerCase().includes(searchLower)) {
                    return true;
                }
                
                if (announcement.tags && announcement.tags.some(tag => 
                    tag.toLowerCase().includes(searchLower)
                )) {
                    return true;
                }
                
                if (announcement.categories && announcement.categories.some(category => 
                    category.toLowerCase().includes(searchLower)
                )) {
                    return true;
                }
                
                return false;
            });
        }

        if (selectedCategories.length > 0) {
            filtered = filtered.filter(announcement => {
                if (!announcement.categories || announcement.categories.length === 0) {
                    return false;
                }
                return selectedCategories.some(selectedCategory => 
                    announcement.categories.includes(selectedCategory)
                );
            });
        }

        filtered.sort((a, b) => {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);
            
            if (sortOrder === 'newest') {
                return dateB - dateA;
            } else {
                return dateA - dateB;
            }
        });

        setFilteredAnnouncements(filtered);
    }, [allAnnouncements, searchTerm, sortOrder, selectedCategories]);

    const handleViewAnnouncement = (id) => {
        navigate(`/view-announcement/${id}`);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    const handleCategoryChange = (category, isChecked) => {
        setSelectedCategories(prev => 
            isChecked 
                ? [...prev, category]
                : prev.filter(cat => cat !== category)
        );
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedCategories([]);
    };

    if (loading) {
        return <HomePageLoading />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 py-6 sm:py-8 lg:py-12">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
                <HomePageHeader />

                <HomePageFilters
                    searchTerm={searchTerm}
                    sortOrder={sortOrder}
                    selectedCategories={selectedCategories}
                    onSearchChange={handleSearchChange}
                    onSortChange={handleSortChange}
                    onCategoryChange={handleCategoryChange}
                    onClearFilters={clearFilters}
                />

                <HomePageResults
                    filteredCount={filteredAnnouncements.length}
                    totalCount={allAnnouncements.length}
                />

                {filteredAnnouncements.length === 0 ? (
                    <HomePageEmptyState 
                        hasFilters={searchTerm || selectedCategories.length > 0}
                    />
                ) : (
                    <HomePageGrid
                        announcements={filteredAnnouncements}
                        onViewAnnouncement={handleViewAnnouncement}
                    />
                )}
            </div>
        </div>
    );
};

export default HomePage;
