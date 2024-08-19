<script lang="ts">
	import { afterUpdate } from 'svelte';
	import AppButton from './app-button.svelte';
	import ErrorIcon from '$lib/icons/error-icon.svelte';
	import SuccessIcon from '$lib/icons/success-icon.svelte';
	import InfoSquareIcon from '$lib/icons/info-square-icon.svelte';
	import RoundedCloseIcon from '$lib/icons/rounded-close-icon.svelte';
	import { notifierStore, type NotifierData } from '../../../stores/notifier.store';

	let notifierData: NotifierData | undefined;
	let timeout: string | number | NodeJS.Timeout | undefined;

	notifierStore.subscribe(async (newData: NotifierData | undefined) => {
		clearTimeout(timeout);
		notifierData = undefined;
		setTimeout(() => (notifierData = newData), 300);

		const notifierClearTime = newData?.type === 'error' ? 10000 : 5000;
		timeout = setTimeout(notifierStore.clear, notifierClearTime);
	});

	afterUpdate(setNotifierBorderColor);

	function setNotifierBorderColor(): void {
		let borderClass = 'border-app-primary';
		if (notifierData?.type === 'error') {
			borderClass = 'border-app-error';
		} else if (notifierData?.type === 'success') {
			borderClass = 'border-app-dark';
		}
		document.getElementById('notifier-div')?.classList.add(borderClass);
	}

	function onDismiss() {
		notifierData = undefined;
	}
</script>

{#if !!notifierData}
	<div class="absolute bottom-10 right-10 z-50 flex flex-col" data-testid="notifier">
		<div
			id="notifier-div"
			class="flex min-h-20 max-w-xl flex-row items-center rounded-lg border-l-8 bg-white p-3 pr-6 shadow-lg"
		>
			<div class="flex items-center justify-center">
				{#if notifierData.type === 'success'}
					<SuccessIcon />
				{:else if notifierData.type === 'error'}
					<ErrorIcon />
				{:else}
					<InfoSquareIcon />
				{/if}
			</div>
			<p class="ml-2 text-sm text-black">{notifierData.message}</p>
		</div>
		<AppButton
			iconColor="white"
			onClick={onDismiss}
			icon={RoundedCloseIcon}
			className="absolute -right-1.5 -top-2.5 h-fit rounded-full bg-app-dark !px-0 !py-0"
		/>
	</div>
{/if}
