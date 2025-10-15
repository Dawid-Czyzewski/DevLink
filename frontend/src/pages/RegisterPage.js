import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useFormValidation } from "../hooks/useFormValidation";
import { useToast } from "../contexts/ToastContext";
import FormHeader from "../components/common/FormHeader";
import FormInput from "../components/common/FormInput";
import CheckboxInput from "../components/common/CheckboxInput";
import FormFooter from "../components/common/FormFooter";
import userService from "../services/userService";

const RegisterPage = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { showError, showSuccess } = useToast();
	const [isLoading, setIsLoading] = useState(false);
	const [apiErrors, setApiErrors] = useState({});
	
	const initialFormData = {
		nickname: "",
		email: "",
		password: "",
		confirmPassword: "",
		acceptTerms: false,
	};

	const {
		formData,
		errors,
		touched,
		handleChange,
		handleBlur,
		validateForm,
		resetForm,
	} = useFormValidation(initialFormData);

	const handleSubmit = async (e) => {
		e.preventDefault();
		
		if (!validateForm()) {
			return;
		}

		setIsLoading(true);
		setApiErrors({});

		try {
			const result = await userService.register({
				nickname: formData.nickname,
				email: formData.email,
				password: formData.password,
				confirmPassword: formData.confirmPassword,
				acceptTerms: formData.acceptTerms,
			});

			if (result.success) {
				resetForm();
				showSuccess(t("register.successMessage"));
				navigate("/registration-success", { 
					state: { 
						email: formData.email,
						nickname: formData.nickname 
					} 
				});
			} else {
				if (result.errors) {
					const translatedErrors = {};
					Object.keys(result.errors).forEach(key => {
						translatedErrors[key] = t(result.errors[key]);
					});
					setApiErrors(translatedErrors);
				} else if (result.message) {
					showError(t(result.message) || "Registration failed. Please try again.");
				} else {
					showError(t("register.errors.unexpectedError") || "Registration failed. Please try again.");
				}
			}
		} catch (error) {
			console.error("Registration error:", error);
			showError(t("register.errorMessage") || "Registration failed. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<FormHeader 
					titleKey="register.title" 
					subtitleKey="register.subtitle" 
				/>

				<div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-gray-700">
					<form onSubmit={handleSubmit} className="space-y-6">
						<FormInput
							id="nickname"
							name="nickname"
							type="text"
							label={t("register.nickname")}
							placeholder={t("register.nicknamePlaceholder")}
							value={formData.nickname}
							onChange={handleChange}
							onBlur={handleBlur}
							error={errors.nickname || apiErrors.nickname}
							touched={touched.nickname}
						/>

						<FormInput
							id="email"
							name="email"
							type="email"
							label={t("register.email")}
							placeholder={t("register.emailPlaceholder")}
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
							placeholder={t("register.passwordPlaceholder")}
							value={formData.password}
							onChange={handleChange}
							onBlur={handleBlur}
							error={errors.password || apiErrors.password}
							touched={touched.password}
						/>

						<FormInput
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							label={t("register.confirmPassword")}
							placeholder={t("register.confirmPasswordPlaceholder")}
							value={formData.confirmPassword}
							onChange={handleChange}
							onBlur={handleBlur}
							error={errors.confirmPassword || apiErrors.confirmPassword}
							touched={touched.confirmPassword}
						/>

						<CheckboxInput
							id="acceptTerms"
							name="acceptTerms"
							checked={formData.acceptTerms}
							onChange={handleChange}
							onBlur={handleBlur}
							error={errors.acceptTerms || apiErrors.acceptTerms}
							touched={touched.acceptTerms}
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
									{t("register.submitting") || "Registering..."}
								</div>
							) : (
								t("register.submit")
							)}
						</button>
					</form>

					<FormFooter
						textKey="register.haveAccount"
						linkTextKey="register.loginLink"
						linkTo="/login"
					/>
				</div>
			</div>
	  </div>
	);
};

export default RegisterPage;
