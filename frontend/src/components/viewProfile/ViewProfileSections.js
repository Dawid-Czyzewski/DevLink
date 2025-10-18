import { useTranslation } from 'react-i18next';

export const ViewProfileCategory = ({ category }) => {
    const { t } = useTranslation();

    const getCategoryLabel = (category) => {
        if (!category) return null;
        return t(`editProfile.category.${category}`);
    };

    return (
        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-3xl border border-gray-700/50 p-8 shadow-2xl">
            <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">
                    {t('viewProfile.category.title')}
                </h2>
            </div>
            
            {category ? (
                <div className="p-4 bg-gray-700/50 rounded-xl border border-gray-600/30">
                    <p className="text-white text-lg font-semibold">
                        {getCategoryLabel(category)}
                    </p>
                </div>
            ) : (
                <p className="text-gray-500 text-lg italic">
                    {t('viewProfile.category.noCategory')}
                </p>
            )}
        </div>
    );
};

export const ViewProfileDescription = ({ description }) => {
    const { t } = useTranslation();

    return (
        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-3xl border border-gray-700/50 p-8 shadow-2xl">
            <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">
                    {t('viewProfile.description.title')}
                </h2>
            </div>
            <div className="p-6 bg-gray-700/30 rounded-2xl border border-gray-600/30">
                {description ? (
                    <p className="text-gray-300 text-lg leading-relaxed">
                        {description}
                    </p>
                ) : (
                    <p className="text-gray-500 text-lg italic">
                        {t('viewProfile.description.noDescription')}
                    </p>
                )}
            </div>
        </div>
    );
};

export const ViewProfileTags = ({ tags }) => {
    const { t } = useTranslation();

    return (
        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-3xl border border-gray-700/50 p-8 shadow-2xl">
            <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">
                    {t('viewProfile.tags.title')}
                </h2>
            </div>
            
            {tags && tags.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 text-yellow-300 rounded-xl text-sm font-medium border border-yellow-400/30 hover:border-yellow-400/50 transition-all duration-200 cursor-default"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 text-lg italic">
                    {t('viewProfile.tags.noTags')}
                </p>
            )}
        </div>
    );
};

export const ViewProfileExperience = ({ experienceLevel }) => {
    const { t } = useTranslation();

    const getExperienceLevelLabel = (level) => {
        if (!level) return null;
        return t(`editProfile.experience.${level}`);
    };

    return (
        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-3xl border border-gray-700/50 p-8 shadow-2xl">
            <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">
                    {t('viewProfile.experience.title')}
                </h2>
            </div>
            
            {experienceLevel ? (
                <div className="p-4 bg-gray-700/50 rounded-xl border border-gray-600/30">
                    <p className="text-white text-lg font-semibold">
                        {getExperienceLevelLabel(experienceLevel)}
                    </p>
                </div>
            ) : (
                <p className="text-gray-500 text-lg italic">
                    {t('viewProfile.experience.noExperience')}
                </p>
            )}
        </div>
    );
};

export const ViewProfileContact = ({ github, website, linkedin }) => {
    const { t } = useTranslation();

    const contactLinks = [
        { 
            key: 'github', 
            url: github, 
            label: t('viewProfile.contact.github'),
            color: 'from-gray-600 to-gray-700',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
            )
        },
        { 
            key: 'website', 
            url: website, 
            label: t('viewProfile.contact.website'),
            color: 'from-blue-500 to-blue-600',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
            )
        },
        { 
            key: 'linkedin', 
            url: linkedin, 
            label: t('viewProfile.contact.linkedin'),
            color: 'from-blue-600 to-blue-700',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
            )
        }
    ].filter(link => link.url);

    return (
        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-3xl border border-gray-700/50 p-8 shadow-2xl">
            <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">
                    {t('viewProfile.contact.title')}
                </h2>
            </div>
            
            {contactLinks.length > 0 ? (
                <div className="space-y-4">
                    {contactLinks.map((link) => (
                        <a
                            key={link.key}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center space-x-4 p-4 bg-gradient-to-r ${link.color} hover:shadow-lg rounded-xl border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300 cursor-pointer group transform hover:scale-105`}
                        >
                            <div className="text-white group-hover:text-gray-100 transition-colors duration-200">
                                {link.icon}
                            </div>
                            <span className="text-white font-semibold group-hover:text-gray-100 transition-colors duration-200">
                                {link.label}
                            </span>
                            <div className="ml-auto">
                                <svg className="w-5 h-5 text-white/70 group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </div>
                        </a>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 text-lg italic">
                    {t('viewProfile.contact.noContact')}
                </p>
            )}
        </div>
    );
};
