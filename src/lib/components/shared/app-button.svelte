<script lang="ts">
	import type { ComponentType } from 'svelte';
	import SpinnerIcon from '$lib/icons/spinner-icon.svelte';

	export let className: string = '';
	export let isRed: boolean = false;
	export let isDark: boolean = false;
	export let isLight: boolean = false;
	export let outlined: boolean = false;
	export let isLoading: boolean = false;
	export let title: string | undefined = undefined;
	export let testId: string | undefined = undefined;
	export let size: 'sm' | 'md' | 'lg' | 'xl' = 'lg';
	export let iconSize: number | undefined = undefined;
	export let iconColor: string | undefined = undefined;
	export let icon: ComponentType | undefined = undefined;
	export let useTrailingLoadingIndicator: boolean = false;
	export let onClick: (() => void) | undefined = undefined;
	export let leading: ComponentType | undefined = undefined;
	export let trailing: ComponentType | undefined = undefined;
	export let type: 'button' | 'submit' | 'reset' | undefined | undefined = 'button';

	function onSize(): string {
		if (size === 'sm') {
			return 'px-2 py-1 text-xs font-medium rounded-full';
		}

		if (size === 'md') {
			return 'px-4 py-2 text-sm font-medium rounded-lg h-8';
		}

		if (size === 'lg') {
			return 'px-4 py-2 text-sm font-medium rounded-xl h-12';
		}

		return 'p-4 my-5 rounded-2xl';
	}

	function onBg(): string {
		if (isRed) return 'bg-app-error text-white';
		if (isDark) return 'bg-app-primary text-white';
		if (isLight) return 'bg-app-light text-app-primary';
		if (outlined) return 'bg-transparent border-2 border-app-primary !text-app-primary';
		return 'text-app-black';
	}

	function onButtonClick(): (() => void) | undefined {
		if (!isLoading && onClick) onClick();
		return undefined;
	}
</script>

<button
	{type}
	data-testid={testId}
	on:click={onButtonClick}
	class={`flex flex-row items-center justify-center ${onSize()} ${onBg()} ${className}`}
>
	{#if isLoading && !useTrailingLoadingIndicator}
		<SpinnerIcon className="mr-2" />
	{/if}

	{#if icon}
		<svelte:component this={icon} color={iconColor} size={iconSize} />
	{:else}
		{#if leading}
			<svelte:component this={leading} color={iconColor} size={iconSize} />
		{/if}
		<span class={`tracking-wider ${leading ? 'ml-2' : ''} ${trailing ? 'mr-2' : ''}`}>
			{title}
		</span>
		{#if trailing}
			{#if isLoading && useTrailingLoadingIndicator}
				<SpinnerIcon dark />
			{:else}
				<svelte:component this={trailing} color={iconColor} size={iconSize} />
			{/if}
		{/if}
	{/if}
</button>
