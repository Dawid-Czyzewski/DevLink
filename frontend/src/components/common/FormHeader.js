import { useTranslation } from "react-i18next";

const FormHeader = ({ titleKey, subtitleKey }) => {
	const { t } = useTranslation();

	return (
		<div className="text-center">
			<h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-500 font-display">
				{t(titleKey)}
			</h2>
			<p className="mt-2 text-gray-400 text-sm">
				{t(subtitleKey)}
			</p>
		</div>
	);
};

export default FormHeader;
