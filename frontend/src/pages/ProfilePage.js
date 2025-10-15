import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";
import PageContainer from "../components/common/PageContainer";

const ProfilePage = () => {
	const { t } = useTranslation();
	const { user } = useAuth();

	return (
		<PageContainer className="py-12">
			<div className="w-full space-y-8">
				<div className="text-center">
					<h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-500 mb-4">
						{t("profile.title")}
					</h1>
					<p className="text-gray-300 text-lg">
						{t("profile.welcomeMessage")} {user?.nickname}!
					</p>
				</div>

				<div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-gray-700">
					<div className="text-center">
						<div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
							<span className="text-3xl font-bold text-gray-900">
								{user?.nickname?.charAt(0)?.toUpperCase() || 'U'}
							</span>
						</div>
						
						<h2 className="text-2xl font-bold text-gray-200 mb-2">
							{user?.nickname}
						</h2>
						
						<p className="text-gray-400 mb-6">
							{user?.email}
						</p>
						
						<div className="text-gray-500">
							<p>{t("profile.comingSoon")}</p>
						</div>
					</div>
				</div>
			</div>
		</PageContainer>
	);
};

export default ProfilePage;
