import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "../contexts/ToastContext";
import FormHeader from "../components/common/FormHeader";
import PageContainer from "../components/common/PageContainer";
import { ResetPasswordForm, ResetPasswordSuccess } from "../components/passwordReset";

const ResetPasswordPage = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const { showError, showSuccess } = useToast();
	const [success, setSuccess] = useState(false);
	const [token, setToken] = useState("");

	useEffect(() => {
		const tokenParam = searchParams.get("token");
		if (tokenParam) {
			setToken(tokenParam);
		} else {
			showError(t("resetPassword.noToken"));
			navigate("/login");
		}
	}, [searchParams, navigate, showError, t]);

	const handleSuccess = () => {
		setSuccess(true);
		showSuccess(t("resetPassword.successMessage"));
	};

	if (success) {
		return (
			<PageContainer className="py-12">
				<div className="w-full max-w-md mx-auto space-y-8">
					<ResetPasswordSuccess />
				</div>
			</PageContainer>
		);
	}

	if (!token) {
		return null;
	}

	return (
		<PageContainer className="py-12">
			<div className="w-full max-w-md mx-auto space-y-8">
				<FormHeader 
					titleKey="resetPassword.title" 
					subtitleKey="resetPassword.subtitle" 
				/>

				<div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-gray-700">
					<ResetPasswordForm token={token} onSuccess={handleSuccess} />
				</div>
			</div>
		</PageContainer>
	);
};

export default ResetPasswordPage;
