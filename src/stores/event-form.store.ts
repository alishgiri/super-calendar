import { writable } from 'svelte/store';

import type { CalendarEvent } from '$lib/models/calendar_event';

export interface EventFormOptions {
	startDate: string;
	confirmTitle?: string;
	title?: string | undefined;
	endDate?: string | undefined;
	subtitle?: string | undefined;
	event?: CalendarEvent | undefined;
}

export const eventFormStore = writable<EventFormOptions | undefined>();
