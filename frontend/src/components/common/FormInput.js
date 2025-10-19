import ErrorMessage from "./ErrorMessage";

const FormInput = ({
    id,
	name,
	type = "text",
	label,
	placeholder,
	value,
	onChange,
	onBlur,
	error,
	touched,
	required = false,
}) => {
	const hasError = error && touched;

	return (
		<div>
			<label
				htmlFor={id}
				className="block text-sm font-medium text-gray-300 mb-2"
			>
				{label} {required && <span className="text-red-400">*</span>}
			</label>
			<input
				id={id}
				name={name}
				type={type}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				placeholder={placeholder}
				className={`w-full px-4 py-3 bg-gray-900/50 border ${
					hasError
						? "border-red-500 focus:ring-red-500"
						: "border-gray-600 focus:ring-yellow-400"
				} rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-200`}
			/>
			<ErrorMessage message={hasError ? error : null} />
		</div>
	);
};

export default FormInput;
