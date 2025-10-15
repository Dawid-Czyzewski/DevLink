import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ErrorMessage from "./ErrorMessage";

const CheckboxInput = ({
	id,
	name,
	checked,
	onChange,
	onBlur,
	error,
	touched,
}) => {
	const { t } = useTranslation();
	const hasError = error && touched;

	return (
		<div>
			<div className="flex items-start">
				<div className="flex items-center h-5">
					<input
						id={id}
						name={name}
						type="checkbox"
						checked={checked}
						onChange={onChange}
						onBlur={onBlur}
						className={`w-4 h-4 bg-gray-900/50 border ${
							hasError ? "border-red-500" : "border-gray-600"
						} rounded focus:ring-2 focus:ring-yellow-400 text-yellow-400 cursor-pointer`}
					/>
				</div>
				<div className="ml-3">
					<label htmlFor={id} className="text-sm text-gray-300 cursor-pointer">
						{t("register.terms")}{" "}
						<Link
							to="/terms"
							className="text-yellow-400 hover:text-yellow-500 underline"
						>
							{t("register.termsLink")}
						</Link>{" "}
						{t("register.termsAnd")}{" "}
						<Link
							to="/privacy"
							className="text-yellow-400 hover:text-yellow-500 underline"
						>
							{t("register.privacyLink")}
						</Link>
					</label>
				</div>
			</div>
			{hasError && (
				<div className="ml-7">
					<ErrorMessage message={error} />
				</div>
			)}
		</div>
	);
};

export default CheckboxInput;
