<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import { useForm } from 'svelte-use-form';
	import ColorPicker from 'svelte-awesome-color-picker';

	import dateTime from '$lib/utils/date-time';
	import TextField from '../form/text-field.svelte';
	import OverlayModal from '../overlay-modal.svelte';
	import AppButton from '../shared/app-button.svelte';
	import calEventService from '$lib/services/cal-event.service';
	import { notifierStore } from '../../../stores/notifier.store';
	import type { CalendarEvent } from '$lib/models/calendar-event';
	import storageService from '$lib/services/local-storage.service';
	import { eventFormStore, type EventFormOptions } from '../../../stores/event-form.store';

	export let onEventCreated: (calEvent: CalendarEvent) => void;
	export let onEventDeleted: (calEvent: CalendarEvent) => void;
	export let onEventUpdated: (calEvent: CalendarEvent) => void;

	const form = useForm();
	const title = 'title-field';
	const email = 'email-field';

	let hex: string = '#111111';
	let isLoading: boolean = false;
	let userEmail: string | undefined;
	let options: EventFormOptions | undefined;

	onMount(() => {
		userEmail = storageService.getUserEmail();
	});

	eventFormStore.subscribe((newOptions: EventFormOptions | undefined) => {
		options = newOptions ? ({ ...newOptions } as EventFormOptions) : undefined;
	});

	async function onClickConfirm(): Promise<void> {
		if (isLoading || !options) return;
		try {
			isLoading = true;

			const email = $form.values['email-field']!;
			if (!userEmail) storageService.saveUserEmail(email);

			const end = dateTime.toUtc(options.endDate);
			const start = dateTime.toUtc(options!.startDate!)!;

			const event: CalendarEvent = {
				...(options.event ?? {}),
				end,
				start,
				email,
				color: hex!,
				allDay: end ? false : true,
				title: $form.values['title-field']!
			};
			if (options.event?.id) {
				onEventUpdated(event);
				await calEventService.updateCalEvent(options.event!.id!, event);
				const msg = $_('update_event_success', { values: { title: event.title } });
				notifierStore.handleSuccess(msg);
			} else {
				await calEventService.addCalEvent(event);
				onEventCreated(event);
				notifierStore.handleSuccess($_('add_event_success', { values: { title: event.title } }));
			}
		} catch (e) {
			notifierStore.handleError(e);
		} finally {
			isLoading = false;
			onClose();
		}
	}

	async function onDeleteEvent(): Promise<void> {
		if (isLoading || !options) return;

		try {
			isLoading = true;
			const e = options.event!;
			await calEventService.deleteCalEvent(e.id!);
			onEventDeleted(e);
		} catch (e) {
			notifierStore.handleError(e);
		} finally {
			isLoading = false;
			onClose();
		}
	}

	function onClose() {
		eventFormStore.set(undefined);
	}
</script>

<OverlayModal size="lg" show={!!options} {onClose}>
	{#if !!options}
		<form
			use:form
			data-testid="description-form"
			class="flex h-full flex-1 flex-col gap-5 rounded-2xl p-5 pb-2"
			on:submit|preventDefault={$form.valid ? onClickConfirm : null}
		>
			<div class="mb-4 flex flex-col">
				<p class="text-2xl font-bold tracking-wide">
					{options.title ?? (!options.event ? $_('add_event') : $_('update_event'))}
				</p>
				{#if options.subtitle}
					<p class="text-lg font-bold tracking-wide">{options.subtitle}</p>
				{/if}
			</div>

			<div class="flex flex-row gap-4">
				<div class="flex flex-1 flex-col">
					<p class="mb-1">{$_('start_date')}</p>
					<p class="rounded-xl border border-app-light bg-[#ffffff] p-3 text-slate-400">
						{dateTime.readableDateTime(options.startDate)}
					</p>
				</div>
				<div class="flex flex-1 flex-col">
					<p class="mb-1">{$_('end_date')}</p>
					<p class="rounded-xl border border-app-light bg-[#ffffff] p-3 text-slate-400">
						{dateTime.readableDateTime(options.endDate ?? options.startDate)}
					</p>
				</div>
			</div>

			<TextField
				name={email}
				value={userEmail}
				autofocus={!userEmail}
				labelText={$_('email')}
				placeholder={$_('type_here')}
				validators={{ required: true, email: true }}
			/>

			<TextField
				name={title}
				autofocus={!!userEmail}
				autocapitalize="sentences"
				labelText={$_('event_title')}
				placeholder={$_('type_here')}
				value={options.event?.title ?? ''}
				validators={{ required: true, minLength: 3, maxLength: 50 }}
			/>

			<div class="flex w-fit flex-col items-center justify-center rounded-xl bg-[#ffffff] p-2">
				<ColorPicker bind:hex />
			</div>

			<div class="flex w-full flex-row items-center justify-end gap-5">
				{#if options.event?.id}
					<AppButton
						isRed
						size="xl"
						{isLoading}
						title={$_('delete')}
						testId="create-button"
						onClick={onDeleteEvent}
						className="mt-0 self-end"
					/>
				{/if}
				<AppButton
					size="xl"
					{isLoading}
					type="submit"
					testId="create-button"
					className="mt-0 self-end"
					title={options.confirmTitle ?? (!options.event ? $_('create') : $_('update'))}
				/>
			</div>
		</form>
	{/if}
</OverlayModal>
