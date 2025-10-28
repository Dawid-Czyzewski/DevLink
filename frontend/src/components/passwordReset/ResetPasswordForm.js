import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../contexts/ToastContext";
import FormInput from "../common/FormInput";
import { apiServiceInstance } from "../../services/apiService";

const ResetPasswordForm = ({ token, onSuccess }) => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { showError, showSuccess } = useToast();
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		password: "",
		confirmPassword: ""
	});
	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
		if (errors[name]) {
			setErrors(prev => ({
				...prev,
				[name]: ""
			}));
		}
	};

	const validateForm = () => {
		const newErrors = {};

		if (!formData.password || formData.password.length < 8) {
			newErrors.password = t("resetPassword.passwordTooShort");
		}

		if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = t("resetPassword.passwordsDoNotMatch");
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		setIsLoading(true);

		try {
			const result = await apiServiceInstance.post("userController", "resetPassword", {
				token: token,
				password: formData.password
			});

			if (result.success) {
				showSuccess(t(result.message || "resetPassword.success"));
				onSuccess();
				setTimeout(() => {
					navigate("/login");
				}, 3000);
			} else {
				if (result.errors) {
					setErrors(result.errors);
				} else {
					showError(t(result.message || "resetPassword.error"));
				}
			}
		} catch (error) {
			showError(error.message || t("resetPassword.error"));
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<FormInput
				id="password"
				name="password"
				type="password"
				label={t("register.password")}
				placeholder={t("resetPassword.passwordPlaceholder")}
				value={formData.password}
				onChange={handleChange}
				error={errors.password}
				touched={true}
			/>

			<FormInput
				id="confirmPassword"
				name="confirmPassword"
				type="password"
				label={t("resetPassword.confirmPassword")}
				placeholder={t("resetPassword.confirmPasswordPlaceholder")}
				value={formData.confirmPassword}
				onChange={handleChange}
				error={errors.confirmPassword}
				touched={true}
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
						{t("resetPassword.resetting") || "Resetowanie..."}
					</div>
				) : (
					t("resetPassword.resetButton")
				)}
			</button>
		</form>
	);
};

export default ResetPasswordForm;
