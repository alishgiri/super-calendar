import { format, formatISO } from 'date-fns';

function readableDateTime(date: string | number | Date): string {
	try {
		return format(date, 'EEE, dd MMM yyyy hh:mm aa');
	} catch {
		return '-';
	}
}

function msToISODateString(milliseconds: number): string {
	return formatISO(new Date(milliseconds));
}

function toUtc(dateStr: number | string | Date | undefined): string | undefined {
	if (!dateStr) return;
	const d = new Date(dateStr).toUTCString();
	return formatISO(d);
}

const dateTime = {
	toUtc,
	readableDateTime,
	msToISODateString
};

export default dateTime;
