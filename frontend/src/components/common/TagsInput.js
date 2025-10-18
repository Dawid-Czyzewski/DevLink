import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const TagsInput = ({ tags = [], onChange, placeholder = "Dodaj tagi...", error }) => {
    const { t } = useTranslation();
    const [inputValue, setInputValue] = useState('');
    const [tagList, setTagList] = useState(tags);
    const inputRef = useRef(null);

    useEffect(() => {
        setTagList(tags);
    }, [tags]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTag();
        } else if (e.key === 'Backspace' && inputValue === '' && tagList.length > 0) {
            removeTag(tagList.length - 1);
        }
    };

    const addTag = () => {
        const trimmedValue = inputValue.trim();
        if (trimmedValue && !tagList.includes(trimmedValue)) {
            const newTags = [...tagList, trimmedValue];
            setTagList(newTags);
            onChange(newTags);
            setInputValue('');
        }
    };

    const removeTag = (indexToRemove) => {
        const newTags = tagList.filter((_, index) => index !== indexToRemove);
        setTagList(newTags);
        onChange(newTags);
    };

    const handleInputBlur = () => {
        addTag();
    };

    return (
        <div className="space-y-2">
            <div className={`flex flex-wrap gap-2 min-h-[48px] p-3 bg-gray-800/50 border rounded-lg focus-within:transition-colors duration-200 ${
                error ? 'border-red-500 focus-within:border-red-400' : 'border-gray-600 focus-within:border-yellow-400'
            }`}>
                {tagList.map((tag, index) => (
                    <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-400/20 text-yellow-300 rounded-full text-sm font-medium"
                    >
                        {tag}
                        <button
                            type="button"
                            onClick={() => removeTag(index)}
                            className="text-yellow-400 hover:text-yellow-300 transition-colors duration-200 ml-1 cursor-pointer"
                        >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </span>
                ))}
                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                    onBlur={handleInputBlur}
                    placeholder={tagList.length === 0 ? placeholder : ""}
                    className="flex-1 min-w-[120px] bg-transparent text-white placeholder-gray-400 outline-none text-sm"
                />
            </div>
                {error ? (
                    <p className="text-red-400 text-sm">{t(error)}</p>
                ) : (
                <p className="text-xs text-gray-400">
                    {t('editProfile.tags.help')}
                </p>
            )}
        </div>
    );
};

export default TagsInput;
