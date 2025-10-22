import { useTranslation } from 'react-i18next';

const HomePageHeader = () => {
    const { t } = useTranslation();

    return (
        <div className="text-center mb-8 lg:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
                {t('homePage.title')}
            </h1>
            <p className="text-yellow-400 text-lg sm:text-xl font-medium">
                {t('homePage.subtitle')}
            </p>
        </div>
    );
};

export default HomePageHeader;
