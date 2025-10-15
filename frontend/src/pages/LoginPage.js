import { useTranslation } from "react-i18next";
import { useLoginFormValidation } from "../hooks/useLoginFormValidation";
import FormHeader from "../components/common/FormHeader";
import FormInput from "../components/common/FormInput";
import RememberMeCheckbox from "../components/common/RememberMeCheckbox";
import FormFooter from "../components/common/FormFooter";
import PageContainer from "../components/common/PageContainer";

const LoginPage = () => {
	const { t } = useTranslation();
	
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
	} = useLoginFormValidation(initialFormData);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validateForm()) {
			
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
							placeholder={t("register.emailPlaceholder")}
							value={formData.email}
							onChange={handleChange}
							onBlur={handleBlur}
							error={errors.email}
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
							error={errors.password}
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
							className="w-full py-3 px-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-yellow-500/50 cursor-pointer"
						>
							{t("header.login")}
						</button>
					</form>

					<FormFooter
						textKey="login.noAccount"
						linkTextKey="header.register"
						linkTo="/register"
					/>
				</div>
			</div>
		</PageContainer>
	);
};

export default LoginPage;
