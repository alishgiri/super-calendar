<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { Hint, HintGroup } from 'svelte-use-form';

	import type { FormValidators } from '$lib';

	export let fieldName: string | undefined;
	export let validators: FormValidators | undefined = undefined;
</script>

{#if validators}
	<HintGroup for={fieldName}>
		{#if validators.required}
			<Hint class="m-2 mb-0 text-sm font-medium tracking-wide text-red-800" on="required">
				{$_('this_is_mandatory_field')}
			</Hint>
		{/if}

		{#if validators.email}
			<Hint
				on="email"
				hideWhenRequired
				class="m-2 mb-0 text-sm font-medium tracking-wide text-red-800"
			>
				{$_('invalid_email')}
			</Hint>
		{/if}

		{#if !!validators.minLength}
			<Hint
				on="minLength"
				hideWhenRequired
				class="m-2 mb-0 text-sm font-medium tracking-wide text-red-800"
			>
				{$_('invalid_min_length', { values: { minLength: validators.minLength } })}
			</Hint>
		{/if}

		{#if !!validators.maxLength}
			<Hint
				on="maxLength"
				hideWhenRequired
				class="m-2 mb-0 text-sm font-medium tracking-wide text-red-800"
			>
				{$_('invalid_max_length', { values: { maxLength: validators.maxLength } })}
			</Hint>
		{/if}
	</HintGroup>
{/if}
