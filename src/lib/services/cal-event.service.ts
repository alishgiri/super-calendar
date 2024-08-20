import API from '$lib/utils/api';
import storageService from './local-storage.service';
import type { CalendarEvent } from '$lib/models/calendar-event';

async function getCalEvents(): Promise<CalendarEvent[]> {
	const email = storageService.getUserEmail();
	const response = await API.get<CalendarEvent[]>('/calendar-events', {
		params: { email }
	});
	return response.data;
}

async function addCalEvent(ce: CalendarEvent): Promise<number> {
	const response = await API.post<number>('/calendar-event', {
		end: ce.end,
		start: ce.start,
		title: ce.title,
		color: ce.color,
		email: ce.email,
		display: ce.display,
		resource_Id: ce.resourceId,
		all_day: !ce.end ? true : false
	});
	return response.data;
}

async function updateCalEvent(calEventId: number, ce: CalendarEvent): Promise<boolean> {
	const response = await API.put(`/calendar-event/${calEventId}`, {
		start: ce.start,
		title: ce.title,
		color: ce.color,
		email: ce.email,
		display: ce.display,
		end: ce.end || ce.start,
		resource_Id: ce.resourceId,
		all_day: !ce.end ? true : false
	});
	return response.data['success'];
}

async function deleteCalEvent(calEventId: number): Promise<boolean> {
	const response = await API.delete(`/calendar-event/${calEventId}`);
	return response.data['success'];
}

const calEventService = {
	addCalEvent,
	getCalEvents,
	updateCalEvent,
	deleteCalEvent
};

export default calEventService;
