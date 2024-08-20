export interface CalendarEvent {
	end?: string;
	start: string;
	title: string;
	color: string;
	allDay?: boolean;
	id?: number | undefined;
	email?: string | undefined;
	display?: 'auto' | 'background';
	resourceId?: number | undefined;
}
