import { AxiosError } from 'axios';
import { writable } from 'svelte/store';

export interface NotifierData {
	message: string;
	type: 'success' | 'info' | 'error';
}

const createNotifierStore = () => {
	const { set, subscribe } = writable<NotifierData | undefined>();

	return {
		subscribe,
		clear: () => set(undefined),
		handleError: (error: unknown) => {
			const notifier: NotifierData = {
				type: 'error',
				message: 'Something went wrong!'
			};
			if (typeof error === 'string') {
				notifier.message = error;
			} else if (error instanceof AxiosError) {
				notifier.message = error.response?.data['message'] ?? error.message;
			} else if (error instanceof Error) {
				notifier.message = error.message;
			}
			set(notifier);
		},
		handleInfo: (message: string) => set({ message, type: 'info' }),
		handleSuccess: (message: string) => set({ message, type: 'success' })
	};
};

export const notifierStore = createNotifierStore();
