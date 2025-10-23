import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import chatStateService from '../services/chatStateService';
import chatPollingService from '../services/chatPollingService';

export const useChatState = () => {
    const { t } = useTranslation();
    const { isAuthenticated } = useAuth();
    const { addToast } = useToast();
    const [searchParams] = useSearchParams();
    const [state, setState] = useState(chatStateService.getState());

    useEffect(() => {
        const unsubscribe = chatStateService.subscribe(setState);
        return unsubscribe;
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            chatStateService.fetchChats(searchParams);
        }
    }, [isAuthenticated, searchParams]);

    useEffect(() => {
        if (state.selectedChatId) {
            chatStateService.fetchMessages(state.selectedChatId);
        }
    }, [state.selectedChatId]);

    useEffect(() => {
        if (state.selectedChatId) {
            chatPollingService.startMessagePolling(
                state.selectedChatId,
                (newMessages) => {
                    setState(prevState => {
                        if (prevState.messages.length !== newMessages.length) {
                            return { ...prevState, messages: newMessages };
                        }
                        return prevState;
                    });
                }
            );
        }

        return () => {
            if (state.selectedChatId) {
                chatPollingService.stopMessagePolling(state.selectedChatId);
            }
        };
    }, [state.selectedChatId]);

    useEffect(() => {
        if (isAuthenticated) {
            chatPollingService.startChatPolling(
                (newChats) => {
                    chatStateService.updateChatList(
                        newChats,
                        state.chats,
                        state.selectedChatId
                    );
                },
                searchParams
            );
        }

        return () => {
            chatPollingService.stopChatPolling();
        };
    }, [isAuthenticated, searchParams, state.chats, state.selectedChatId]);

    useEffect(() => {
        return () => {
            chatPollingService.stopAllPolling();
        };
    }, []);

    const handleChatSelect = useCallback((chatId) => {
        chatStateService.selectChat(chatId);
    }, []);

    const handleSendMessage = useCallback(async (content) => {
        if (!state.selectedChatId) return false;

        const success = await chatStateService.sendMessage(state.selectedChatId, content);
        
        if (!success) {
            addToast(t('messages.sendFailed'), 'error', 5000);
        }
        
        return success;
    }, [state.selectedChatId, addToast, t]);

    return {
        ...state,
        handleChatSelect,
        handleSendMessage
    };
};
