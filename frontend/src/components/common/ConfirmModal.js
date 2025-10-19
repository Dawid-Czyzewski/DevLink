import { useEffect } from 'react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Potwierdź", cancelText = "Anuluj", type = "danger" }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const getButtonStyles = () => {
        switch (type) {
            case 'danger':
                return {
                    confirm: "bg-red-600 hover:bg-red-700 text-white",
                    icon: "bg-red-100 text-red-600"
                };
            case 'warning':
                return {
                    confirm: "bg-yellow-600 hover:bg-yellow-700 text-white",
                    icon: "bg-yellow-100 text-yellow-600"
                };
            default:
                return {
                    confirm: "bg-blue-600 hover:bg-blue-700 text-white",
                    icon: "bg-blue-100 text-blue-600"
                };
        }
    };

    const buttonStyles = getButtonStyles();

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div 
                className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 cursor-pointer"
                onClick={onClose}
            />
            
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl transform transition-all duration-300 w-full max-w-md">
                    <div className="flex items-center justify-center p-6 pb-4">
                        <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${buttonStyles.icon}`}>
                            {type === 'danger' ? (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            ) : type === 'warning' ? (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            )}
                        </div>
                    </div>

                    <div className="px-6 pb-4">
                        <h3 className="text-lg font-semibold text-white text-center mb-2">
                            {title}
                        </h3>
                        <p className="text-gray-300 text-center text-sm leading-relaxed">
                            {message}
                        </p>
                    </div>

                    <div className="flex gap-3 px-6 pb-6">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded-lg transition-all duration-200 font-medium cursor-pointer"
                        >
                            {cancelText}
                        </button>
                        <button
                            onClick={onConfirm}
                            className={`flex-1 px-4 py-2.5 rounded-lg transition-all duration-200 font-medium cursor-pointer ${buttonStyles.confirm}`}
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
