export const AnnouncementContentMobile = ({ announcement, formatDate, getCategoryLabel }) => {
    return (
        <>
            <div className="mb-3">
                <h3 className="text-base font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors duration-200 line-clamp-1">
                    {announcement.title}
                </h3>
                <div className="flex items-center text-xs text-gray-400">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {formatDate(announcement.created_at)}
                </div>
            </div>

            <p className="text-gray-300 mb-3 leading-relaxed text-sm">
                {announcement.description.split(' ').length > 20 
                    ? announcement.description.split(' ').slice(0, 20).join(' ') + '...'
                    : announcement.description
                }
            </p>

            <div className="flex flex-wrap items-center gap-2 mb-4">
                <div className="flex flex-wrap gap-1">
                    {announcement.categories.map((category, catIndex) => (
                        <span
                            key={catIndex}
                            className="px-2 py-1 bg-yellow-400/20 text-yellow-400 text-xs rounded border border-yellow-400/30 font-medium"
                        >
                            {getCategoryLabel(category)}
                        </span>
                    ))}
                </div>

                {announcement.tags && announcement.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {announcement.tags.slice(0, 2).map((tag, tagIndex) => (
                            <span
                                key={tagIndex}
                                className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded border border-gray-600/50"
                            >
                                {tag}
                            </span>
                        ))}
                        {announcement.tags.length > 2 && (
                            <span className="px-2 py-1 bg-gray-700/30 text-gray-400 text-xs rounded">
                                +{announcement.tags.length - 2}
                            </span>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export const AnnouncementContentDesktop = ({ announcement, formatDate, getCategoryLabel }) => {
    return (
        <div className="flex-1 pr-6">
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-200 line-clamp-1">
                        {announcement.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-400 mb-3">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {formatDate(announcement.created_at)}
                    </div>
                </div>
            </div>

            <p className="text-gray-300 mb-4 leading-relaxed">
                {announcement.description.split(' ').length > 20 
                    ? announcement.description.split(' ').slice(0, 20).join(' ') + '...'
                    : announcement.description
                }
            </p>

            <div className="flex flex-wrap items-center gap-3">
                <div className="flex flex-wrap gap-2">
                    {announcement.categories.map((category, catIndex) => (
                        <span
                            key={catIndex}
                            className="px-3 py-1 bg-yellow-400/20 text-yellow-400 text-xs rounded-lg border border-yellow-400/30 font-medium"
                        >
                            {getCategoryLabel(category)}
                        </span>
                    ))}
                </div>

                {announcement.tags && announcement.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {announcement.tags.slice(0, 3).map((tag, tagIndex) => (
                            <span
                                key={tagIndex}
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
            </div>
        </div>
    );
};
