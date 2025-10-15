import { useState } from "react";
import { useTranslation } from "react-i18next";

export const useLoginFormValidation = (initialFormData) => {
	const { t } = useTranslation();
	const [formData, setFormData] = useState(initialFormData);
	const [errors, setErrors] = useState({});
	const [touched, setTouched] = useState({});

	const validateField = (name, value) => {
		switch (name) {
			case "email":
				if (!value.trim()) {
					return t("register.errors.emailRequired");
				}
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if (!emailRegex.test(value)) {
					return t("register.errors.emailInvalid");
				}
				break;
			case "password":
				if (!value) {
					return t("register.errors.passwordRequired");
				}
				break;
			default:
				break;
		}
		return "";
	};

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		const fieldValue = type === "checkbox" ? checked : value;

		setFormData((prev) => ({
			...prev,
			[name]: fieldValue,
		}));

		if (touched[name]) {
			const error = validateField(name, fieldValue);
			setErrors((prev) => ({
				...prev,
				[name]: error,
			}));
		}
	};

	const handleBlur = (e) => {
		const { name, value, type, checked } = e.target;
		const fieldValue = type === "checkbox" ? checked : value;

		setTouched((prev) => ({
			...prev,
			[name]: true,
		}));

		const error = validateField(name, fieldValue);
		setErrors((prev) => ({
			...prev,
			[name]: error,
		}));
	};

	const validateForm = () => {
		const newErrors = {};
		["email", "password"].forEach((key) => {
			const error = validateField(key, formData[key]);
			if (error) {
				newErrors[key] = error;
			}
		});

		const allTouched = { email: true, password: true };
		setTouched(allTouched);

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return false;
		}

		return true;
	};

	const resetForm = () => {
		setFormData(initialFormData);
		setErrors({});
		setTouched({});
	};

	return {
		formData,
		errors,
		touched,
		handleChange,
		handleBlur,
		validateForm,
		resetForm,
	};
};
