<script lang="ts">
	import type { Validator } from 'svelte-use-form/models/validator';
	import { email, maxLength, minLength, required } from 'svelte-use-form';
	import { validators as sanitizers } from 'svelte-use-form/validatorsAction';

	import type { FormValidators } from '$lib';
	import FormValidationMessages from './form-validation-messages.svelte';

	export let id: string = '';
	export let name: string = '';
	export let value: string = '';
	export let type: string = 'text';
	export let className: string = '';
	export let placeholder: string = '';
	export let autofocus: boolean = false;
	export let testId: string | undefined = undefined;
	export let labelText: string | undefined = undefined;
	export let validators: FormValidators | undefined = undefined;
	export let autocapitalize: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters' =
		'sentences';

	function getValidators(): Validator[] {
		if (!validators) return [];
		const output: Validator[] = [];
		if (validators.required) output.push(required);
		if (validators.email) output.push(email);
		if (validators.minLength) output.push(minLength(validators.minLength));
		if (validators.maxLength) output.push(maxLength(validators.maxLength));
		return output;
	}
</script>

<div class="flex flex-col">
	{#if labelText}
		<label class="mb-1" for={name}>{labelText}</label>
	{/if}
	<input
		{id}
		{name}
		{type}
		{value}
		{autofocus}
		{placeholder}
		{autocapitalize}
		spellcheck="false"
		autocomplete="off"
		data-testid={testId}
		use:sanitizers={getValidators()}
		class=" rounded-xl border-2 border-app-light bg-[#ffffff] p-3 tracking-wide text-app-primary placeholder-gray-400 outline-none {className}"
	/>
	{#if validators}
		<FormValidationMessages fieldName={name} {validators} />
	{/if}
</div>
