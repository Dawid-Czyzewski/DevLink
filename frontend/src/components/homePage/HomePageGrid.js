import { useTranslation } from 'react-i18next';

const HomePageGrid = ({ announcements, onViewAnnouncement }) => {
    const { t } = useTranslation();

    const getCategoryLabel = (category) => {
        return t(`homePage.categories.${category}`, category);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {announcements.map((announcement) => (
                <div
                    key={announcement.id}
                    className="group bg-gray-800/50 backdrop-blur-lg rounded-xl lg:rounded-2xl border border-gray-700/50 p-4 lg:p-6 hover:border-gray-600/50 transition-all duration-300 hover:shadow-xl flex flex-col h-full"
                >
                    <h3 className="text-lg font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors duration-200 line-clamp-2">
                        {announcement.title}
                    </h3>

                    <p className="text-gray-300 mb-4 leading-relaxed text-sm line-clamp-3 flex-1">
                        {announcement.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {announcement.categories && announcement.categories.map((category, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 bg-yellow-400/20 text-yellow-400 text-xs rounded border border-yellow-400/30 font-medium"
                            >
                                {getCategoryLabel(category)}
                            </span>
                        ))}
                    </div>

                    {announcement.tags && announcement.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                            {announcement.tags.slice(0, 3).map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded border border-gray-600/50"
                                >
                                    {tag}
                                </span>
                            ))}
                            {announcement.tags.length > 3 && (
                                <span className="px-2 py-1 bg-gray-700/30 text-gray-400 text-xs rounded">
                                    +{announcement.tags.length - 3}
                                </span>
                            )}
                        </div>
                    )}

                    <div className="flex items-center justify-between pt-3 border-t border-gray-700/50 mt-auto">
                        <span className="text-sm text-gray-400">
                            {new Date(announcement.created_at).toLocaleDateString('pl-PL')}
                        </span>
                        <button
                            onClick={() => onViewAnnouncement(announcement.id)}
                            className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black rounded-lg font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 cursor-pointer"
                        >
                            {t('homePage.announcement.viewButton')}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HomePageGrid;
