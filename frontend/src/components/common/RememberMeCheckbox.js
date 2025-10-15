import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const RememberMeCheckbox = ({
	id,
	name,
	checked,
	onChange,
	forgotPasswordLink = "/forgot-password",
}) => {
	const { t } = useTranslation();

	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center">
				<input
					id={id}
					name={name}
					type="checkbox"
					checked={checked}
					onChange={onChange}
					className="w-4 h-4 bg-gray-900/50 border border-gray-600 rounded focus:ring-2 focus:ring-yellow-400 text-yellow-400 cursor-pointer"
				/>
				<label htmlFor={id} className="ml-2 text-sm text-gray-300 cursor-pointer">
					{t("login.rememberMe")}
				</label>
			</div>
			<Link
				to={forgotPasswordLink}
				className="text-sm text-yellow-400 hover:text-yellow-500 transition-colors"
			>
				{t("login.forgotPassword")}
			</Link>
		</div>
	);
};

export default RememberMeCheckbox;
