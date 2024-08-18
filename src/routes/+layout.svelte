<script lang="ts">
	import { _, isLoading } from 'svelte-i18n';

	import '../i18n';
	import '../app.css';
	import Navbar from '$lib/components/navbar.svelte';
	import Footer from '$lib/components/footer.svelte';
	import Notifier from '$lib/components/shared/notifier.svelte';
	import ConfirmDialog from '$lib/components/shared/confirm-dialog.svelte';
</script>

{#if $isLoading}
	<p class="p-2">loading…</p>
{:else}
	<Navbar />

	<slot />

	<Notifier />

	<ConfirmDialog />


	<Footer />
{/if}
