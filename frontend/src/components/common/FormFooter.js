import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const FormFooter = ({ 
	textKey, 
	linkTextKey, 
	linkTo 
}) => {
	const { t } = useTranslation();

	return (
		<div className="mt-6 text-center">
			<p className="text-sm text-gray-400">
				{t(textKey)}{" "}
				<Link
					to={linkTo}
					className="text-yellow-400 hover:text-yellow-500 font-semibold transition-colors"
				>
					{t(linkTextKey)}
				</Link>
			</p>
		</div>
	);
};

export default FormFooter;
