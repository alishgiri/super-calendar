import { register, init, getLocaleFromNavigator } from 'svelte-i18n';

register('en', () => import('./lang/en.json'));

init({
	fallbackLocale: 'en',
	initialLocale: getLocaleFromNavigator() ?? 'en'
});
