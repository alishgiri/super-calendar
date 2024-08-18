<script lang="ts">
	import { _ } from 'svelte-i18n';

	import {
		confirmDialogStore,
		type ConfirmDialogOptions
	} from '../../../stores/confirm-dialog.store';
	import OverlayModal from '../overlay-modal.svelte';
	import SpinnerIcon from '$lib/icons/spinner-icon.svelte';
	import { notifierStore } from '../../../stores/notifier.store';

	let isLoading: boolean = false;
	let options: ConfirmDialogOptions | undefined;

	confirmDialogStore.subscribe((newOptions: ConfirmDialogOptions | undefined) => {
		options = newOptions;
	});

	async function onClickConfirm(): Promise<void> {
		if (isLoading || !options) return;

		try {
			isLoading = true;
			await options.onConfirm();
		} catch (e) {
			notifierStore.handleError(e);
		} finally {
			isLoading = false;
			onClose();
		}
	}

	function onClose() {
		confirmDialogStore.set(undefined);
	}
</script>

<OverlayModal show={!!options} {onClose}>
	{#if !!options}
		<div class="flex min-w-96 max-w-lg flex-col items-center">
			<div class="m-1 flex min-h-36 grow flex-col items-center justify-center p-4 px-8">
				<p class="mt-4 text-center">{options.title}</p>
				{#if !!options.subtitle}
					<p class={`mt-2 text-center tracking-wide ${options.isDanger ? 'text-red-700' : ''}`}>
						{options.subtitle}
					</p>
				{/if}
			</div>
			<div class="flex h-14 w-full flex-row border-t border-slate-200 text-sm">
				<button
					on:click={onClose}
					class="flex flex-1 flex-shrink-0 items-center justify-center rounded-bl-xl tracking-wider text-slate-400 hover:bg-slate-200"
				>
					{$_('cancel')}
				</button>
				<div class="h-full w-[1px] bg-slate-200" />
				<button
					on:click={onClickConfirm}
					class={`flex flex-1 flex-shrink-0 items-center justify-center rounded-br-xl font-semibold tracking-wider ${options.isDanger ? 'text-app-error hover:bg-red-200' : 'text-app-dark hover:bg-slate-50'}`}
				>
					{#if isLoading}
						<SpinnerIcon dark={true} />
					{:else}
						{options.confirmTitle ?? $_('confirm')}
					{/if}
				</button>
			</div>
		</div>
	{/if}
</OverlayModal>
