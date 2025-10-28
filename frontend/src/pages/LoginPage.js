import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, Link } from "react-router-dom";
import { useLoginFormValidation } from "../hooks/useLoginFormValidation";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import FormHeader from "../components/common/FormHeader";
import FormInput from "../components/common/FormInput";
import RememberMeCheckbox from "../components/common/RememberMeCheckbox";
import FormFooter from "../components/common/FormFooter";
import PageContainer from "../components/common/PageContainer";

const LoginPage = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { login } = useAuth();
	const { showError, showSuccess } = useToast();
	const [isLoading, setIsLoading] = useState(false);
	const [apiErrors, setApiErrors] = useState({});
	
	const initialFormData = {
		email: "",
		password: "",
		rememberMe: false,
	};

	const {
		formData,
		errors,
		touched,
		handleChange,
		handleBlur,
		validateForm,
		resetForm,
	} = useLoginFormValidation(initialFormData);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		setIsLoading(true);
		setApiErrors({});

		try {
			const result = await login({
				email: formData.email,
				password: formData.password,
				rememberMe: formData.rememberMe,
			});

		if (result.success) {
			resetForm();
			showSuccess(t("login.successMessage"));

			const urlParams = new URLSearchParams(window.location.search);
			const redirectTo = urlParams.get('redirect');
			
			if (redirectTo) {
				navigate(redirectTo);
			} else {
				navigate('/profile');
			}
			} else {
				if (result.errors) {
					const translatedErrors = {};
					Object.keys(result.errors).forEach(key => {
						translatedErrors[key] = t(result.errors[key]);
					});
					setApiErrors(translatedErrors);
				} else if (result.message) {
					const translatedMessage = t(result.message);
					showError(translatedMessage);
				} else {
					showError(t("login.errorMessage"));
				}
			}
		} catch (error) {
			showError(error.message || t("login.errorMessage"));
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<PageContainer className="py-12">
			<div className="w-full space-y-8">
				<FormHeader 
					titleKey="header.login" 
					subtitleKey="login.welcomeMessage" 
				/>

				<div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-gray-700">
					<form onSubmit={handleSubmit} className="space-y-6">
						<FormInput
							id="email"
							name="email"
							type="email"
							label={t("register.email")}
							placeholder={t("login.emailPlaceholder")}
							value={formData.email}
							onChange={handleChange}
							onBlur={handleBlur}
							error={errors.email || apiErrors.email}
							touched={touched.email}
						/>

						<FormInput
							id="password"
							name="password"
							type="password"
							label={t("register.password")}
							placeholder={t("login.passwordPlaceholder")}
							value={formData.password}
							onChange={handleChange}
							onBlur={handleBlur}
							error={errors.password || apiErrors.password}
							touched={touched.password}
						/>

						<RememberMeCheckbox
							id="rememberMe"
							name="rememberMe"
							checked={formData.rememberMe}
							onChange={handleChange}
						/>

						<button
							type="submit"
							disabled={isLoading}
							className={`w-full py-3 px-4 font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-300 transform ${
								isLoading
									? "bg-gray-600 text-gray-400 cursor-not-allowed"
									: "bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 hover:from-yellow-500 hover:to-yellow-600 hover:scale-[1.02] shadow-lg hover:shadow-yellow-500/50 cursor-pointer"
							}`}
						>
							{isLoading ? (
								<div className="flex items-center justify-center">
									<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
										<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
										<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
									</svg>
									{t("login.submitting") || "Logging in..."}
								</div>
							) : (
								t("header.login")
							)}
						</button>
					</form>

					<div className="space-y-3">
						<FormFooter
							textKey="login.noAccount"
							linkTextKey="header.register"
							linkTo="/register"
						/>
						<div className="text-center">
							<Link
								to="/forgot-password"
								className="text-sm text-yellow-400 hover:text-yellow-500 transition-colors duration-200"
							>
								{t("login.forgotPassword")}
							</Link>
						</div>
					</div>
				</div>
			</div>
		</PageContainer>
	);
};

export default LoginPage;
