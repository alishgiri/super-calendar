<script lang="ts">
	import { _ } from 'svelte-i18n';
	import List from '@event-calendar/list';
	import Calendar from '@event-calendar/core';
	import DayGrid from '@event-calendar/day-grid';
	import TimeGrid from '@event-calendar/time-grid';
	import Interaction from '@event-calendar/interaction';

	import { notifierStore } from '../stores/notifier.store';
	import SpinnerIcon from '$lib/icons/spinner-icon.svelte';
	import holidayService from '$lib/services/holiday.service';
	import { eventFormStore } from '../stores/event-form.store';
	import calEventService from '$lib/services/cal-event.service';
	import type { CalendarEvent } from '$lib/models/calendar-event';
	import EventFormOverlay from '$lib/components/home/event-form-overlay.svelte';

	let ec;
	let isLoading = false;
	const plugins = [List, DayGrid, TimeGrid, TimeGrid, Interaction];
	const options = {
		loading,
		dateClick,
		eventClick,
		eventDragStop,
		height: '88vh',
		selectable: true,
		dayMaxEvents: true,
		nowIndicator: true,
		view: 'timeGridWeek',
		scrollTime: '09:00:00',
		select: onSelectDateRange,
		eventSources: [{ events: fetchEvents }],
		headerToolbar: {
			center: 'title',
			start: 'prev,next today',
			end: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
		},
		views: {
			timeGridWeek: { pointer: true }
		},
		buttonText: {
			close: $_('close'),
			today: $_('today'),
			listDay: $_('list'),
			listWeek: $_('list'),
			listYear: $_('list'),
			listMonth: $_('list'),
			timeGridDay: $_('day'),
			timeGridWeek: $_('week'),
			dayGridMonth: $_('month')
		}
	};

	async function fetchEvents(): Promise<CalendarEvent[]> {
		try {
			const calEvents = await calEventService.getCalEvents();
			const holidays = await holidayService.fetchHolidays(new Date());
			return [...calEvents, ...holidays];
		} catch (e) {
			notifierStore.handleError(e);
		}
		return [];
	}

	function dateClick(info) {
		eventFormStore.set({ startDate: info.dateStr, event: undefined });
	}

	function eventDragStop(info) {}

	function eventClick(info) {
		const copy = { ...info.event };
		eventFormStore.set({
			endDate: copy.end,
			startDate: copy.start,
			event: copy as CalendarEvent
		});
	}

	function onSelectDateRange(info) {
		eventFormStore.set({ startDate: info.startStr, endDate: info.endStr, event: undefined });
	}

	function loading(isLoadingState: boolean) {
		isLoading = isLoadingState;
	}

	function onEventCreated(calEvent: CalendarEvent) {
		ec.addEvent(calEvent);
	}

	function onEventUpdated(calEvent: CalendarEvent) {
		ec.updateEvent(calEvent);
	}

	function onEventDeleted(calEvent: CalendarEvent) {
		ec.removeEventById(calEvent.id);
	}
</script>

<svelte:head>
	<title>{$_('home')}</title>
</svelte:head>

<div class="mx-5">
	<Calendar bind:this={ec} {plugins} {options} />
</div>

{#if isLoading}
	<div class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center">
		<SpinnerIcon dark />
	</div>
{/if}

<EventFormOverlay {onEventCreated} {onEventUpdated} {onEventDeleted} />
