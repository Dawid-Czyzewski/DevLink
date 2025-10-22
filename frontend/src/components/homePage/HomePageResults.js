import { useTranslation } from 'react-i18next';

const HomePageResults = ({ filteredCount, totalCount }) => {
    const { t } = useTranslation();

    return (
        <div className="mb-6">
            <p className="text-gray-400 text-sm">
                {t('homePage.results', { count: filteredCount, total: totalCount })}
            </p>
        </div>
    );
};

export default HomePageResults;
