<script lang="ts">
	import SuperCalendarLogo from '$lib/icons/super-calendar-logo.svelte';
</script>

<nav class="flex flex-row items-center py-5 md:p-3">
	<a href="/" class="flex flex-row">
		<SuperCalendarLogo />
		<p class="ml-2 hidden text-2xl font-black tracking-wider text-app-dark md:flex">
			Super Calendar
		</p>
	</a>
	<div class="flex flex-grow"></div>
	<div class="mx-4 flex flex-col items-end"></div>
</nav>
