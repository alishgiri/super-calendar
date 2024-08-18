<script lang="ts">
	export let show: boolean;
	export let onClose: () => void;
	export let size: 'sm' | 'lg' | 'xl' = 'sm';

	function getSizeBasedClass(): string {
		if (size === 'sm') {
			return '';
		} else if (size === 'lg') {
			return 'flex flex-1 m-52 px-2';
		} else if (size === 'xl') {
			return 'flex flex-1 m-10 px-2';
		}
		return '';
	}
</script>

{#if show}
	<div
		data-testid="overlay-modal"
		class={`absolute bottom-0 left-0 right-0 top-0 z-50 flex ${size === 'xl' ? '' : 'items-center justify-center'}`}
	>
		<button
			on:click={onClose}
			class="absolute bottom-0 left-0 right-0 top-0 z-0 backdrop-brightness-50"
		/>
		<div class={`z-10 rounded-xl bg-white text-black ${getSizeBasedClass()}`}>
			<slot />
		</div>
	</div>
{/if}
