import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import PageContainer from "../components/common/PageContainer";

const RegistrationSuccessPage = () => {
	const { t } = useTranslation();
	const location = useLocation();
	const { email } = location.state || {};

	return (
		<PageContainer className="py-12">
			<div className="w-full space-y-8">
				<div className="text-center">
					<div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
						<svg
							className="h-12 w-12 text-green-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M5 13l4 4L19 7"
							/>
						</svg>
					</div>

					<h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-500 font-display">
						{t("register.success.title")}
					</h2>
					<p className="mt-4 text-gray-300 text-lg">
						{t("register.success.message")}
					</p>
					{email && (
						<div className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
							<p className="text-gray-300 text-sm mb-2">
								{t("register.success.emailSent")}
							</p>
							<p className="text-yellow-400 font-medium">
								{email}
							</p>
							<p className="text-gray-400 text-xs mt-2">
								{t("register.success.checkSpam")}
							</p>
						</div>
					)}
					<p className="mt-4 text-gray-400 text-sm">
						{t("register.success.thankYou")}
					</p>
				</div>

				<div className="space-y-4">
					<Link
						to="/"
						className="w-full flex justify-center py-3 px-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-yellow-500/50 cursor-pointer"
					>
						{t("register.success.homeButton")}
					</Link>
				</div>
			</div>
		</PageContainer>
	);
};

export default RegistrationSuccessPage;
