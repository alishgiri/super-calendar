import { writable } from 'svelte/store';

export interface ConfirmDialogOptions {
	title: string;
	isDanger?: boolean;
	confirmTitle?: string;
	onConfirm: () => void;
	subtitle?: string | undefined;
}

export const confirmDialogStore = writable<ConfirmDialogOptions | undefined>();
