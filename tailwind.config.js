/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'selector',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			body: ['"Montserrat"']
		},
		extend: {
			colors: ({ colors }) => ({
				black: '#111111',
				white: '#F5F5F5',
				app: {
					black: '#2E073F',
					dark: '#7A1CAC',
					primary: '#AD49E1',
					light: '#EBD3F8',
					error: '#D71313'
				},
				teal: colors.teal,
				slate: colors.slate,
				gray: colors.gray,
				purple: colors.purple,
				inherit: colors.inherit,
				current: colors.current,
				transparent: colors.transparent,
				zinc: colors.zinc,
				neutral: colors.neutral,
				stone: colors.stone,
				red: colors.red,
				orange: colors.orange,
				amber: colors.amber,
				yellow: colors.yellow,
				lime: colors.lime,
				green: colors.green,
				emerald: colors.emerald,
				cyan: colors.cyan,
				sky: colors.sky,
				blue: colors.blue,
				indigo: colors.indigo,
				violet: colors.violet,
				fuchsia: colors.fuchsia,
				pink: colors.pink,
				rose: colors.rose
			})
		}
	},
	plugins: []
};
