import { useState } from "react";
import { useTranslation } from "react-i18next";
import FormInput from "../common/FormInput";
import FormFooter from "../common/FormFooter";
import { apiServiceInstance } from "../../services/apiService";

const ForgotPasswordForm = ({ onSuccess }) => {
	const { t } = useTranslation();
	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		if (!email || !email.trim()) {
			setError(t("forgotPassword.emailRequired"));
			return;
		}

		if (!/\S+@\S+\.\S+/.test(email)) {
			setError(t("forgotPassword.invalidEmail"));
			return;
		}

		setIsLoading(true);

		try {
			const result = await apiServiceInstance.post("userController", "forgotPassword", {
				email: email.trim()
			});

			if (result.success) {
				onSuccess();
			} else {
				setError(t(result.message || "forgotPassword.error"));
			}
		} catch (error) {
			setError(error.message || t("forgotPassword.error"));
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<FormInput
				id="email"
				name="email"
				type="email"
				label={t("register.email")}
				placeholder={t("forgotPassword.emailPlaceholder")}
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				error={error}
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
						{t("forgotPassword.sending") || "Wysyłanie..."}
					</div>
				) : (
					t("forgotPassword.sendResetLink")
				)}
			</button>

			<FormFooter
				textKey="forgotPassword.rememberPassword"
				linkTextKey="header.login"
				linkTo="/login"
			/>
		</form>
	);
};

export default ForgotPasswordForm;
