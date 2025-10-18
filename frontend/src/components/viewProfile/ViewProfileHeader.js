import { useTranslation } from 'react-i18next';

const ViewProfileHeader = ({ user }) => {
    const { t } = useTranslation();

    return (
        <div className="relative bg-gradient-to-r from-yellow-400/10 via-yellow-500/5 to-yellow-400/10 border-b border-yellow-400/20">
            <div 
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fbbf24' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}
            ></div>
            
            <div className="relative px-6 py-12">
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                        {user.nickname}
                    </h1>
                    
                    <p className="text-gray-300 text-xl">
                        {t('viewProfile.subtitle')}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ViewProfileHeader;
