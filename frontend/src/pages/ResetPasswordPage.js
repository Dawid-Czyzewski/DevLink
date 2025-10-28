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
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const tokenParam = searchParams.get("token");
		if (tokenParam) {
			setToken(tokenParam);
			setIsLoading(false);
		} else {
			showError(t("resetPassword.noToken"));
			setTimeout(() => {
				navigate("/login");
			}, 2000);
			setIsLoading(false);
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

	if (isLoading) {
		return (
			<PageContainer className="py-12">
				<div className="w-full max-w-md mx-auto space-y-8 flex items-center justify-center min-h-[400px]">
					<div className="text-center">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
						<p className="text-gray-400">{t("common.loading") || "Ładowanie..."}</p>
					</div>
				</div>
			</PageContainer>
		);
	}

	if (!token) {
		return (
			<PageContainer className="py-12">
				<div className="w-full max-w-md mx-auto space-y-8">
					<div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-gray-700 text-center">
						<p className="text-red-400 mb-4">{t("resetPassword.noToken")}</p>
						<p className="text-gray-400 text-sm mb-4">{t("resetPassword.redirecting")}</p>
					</div>
				</div>
			</PageContainer>
		);
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
