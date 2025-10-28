import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const ForgotPasswordSuccess = () => {
	const { t } = useTranslation();

	return (
		<div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-gray-700 text-center">
			<div className="mb-6">
				<div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-500/20 mb-4">
					<svg className="h-8 w-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
					</svg>
				</div>
				<h2 className="text-2xl font-bold text-white mb-2">
					{t("forgotPassword.emailSentTitle")}
				</h2>
				<p className="text-gray-400">
					{t("forgotPassword.emailSentMessage")}
				</p>
			</div>
			<Link
				to="/login"
				className="inline-block w-full py-3 px-4 font-semibold rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-yellow-500/50"
			>
				{t("forgotPassword.backToLogin")}
			</Link>
		</div>
	);
};

export default ForgotPasswordSuccess;
