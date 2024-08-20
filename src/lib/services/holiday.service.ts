import API from '$lib/utils/api';
import dateTime from '$lib/utils/date-time';
import type { CalendarEvent } from '$lib/models/calendar_event';

async function fetchHolidays(date: Date): Promise<CalendarEvent[]> {
	// const locale = new Intl.Locale(navigator.language);
	const response = await API.post('/holidays', {
		country: 'CA', // Free Version Supported Country.
		// country: locale.region,
		year: `${date.getFullYear()}`
	});

	const holidays: CalendarEvent[] = [];
	const holidaysData = response.data['holidays'];
	if (typeof holidaysData === 'object' && holidaysData[0]) {
		holidaysData.forEach((d) => {
			const msDate = Date.parse(d['date']);
			const eventDate = dateTime.msToISODateString(msDate);
			holidays.push({
				allDay: true,
				end: eventDate,
				title: d['name'],
				start: eventDate,
				color: '#c9103e'
			});
		});
	}

	return holidays;
}

const holidayService = {
	fetchHolidays
};

export default holidayService;
