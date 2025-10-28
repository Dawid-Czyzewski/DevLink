import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useToast } from "../contexts/ToastContext";
import FormHeader from "../components/common/FormHeader";
import PageContainer from "../components/common/PageContainer";
import { ForgotPasswordForm, ForgotPasswordSuccess } from "../components/passwordReset";

const ForgotPasswordPage = () => {
	const { t } = useTranslation();
	const { showSuccess } = useToast();
	const [success, setSuccess] = useState(false);

	const handleSuccess = () => {
		setSuccess(true);
		showSuccess(t("forgotPassword.emailSent"));
	};

	return (
		<PageContainer className="py-12">
			<div className="w-full max-w-md mx-auto space-y-8">
				<FormHeader 
					titleKey="forgotPassword.title" 
					subtitleKey="forgotPassword.subtitle" 
				/>

				{success ? (
					<ForgotPasswordSuccess />
				) : (
					<div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-gray-700">
						<ForgotPasswordForm onSuccess={handleSuccess} />
					</div>
				)}
			</div>
		</PageContainer>
	);
};

export default ForgotPasswordPage;
