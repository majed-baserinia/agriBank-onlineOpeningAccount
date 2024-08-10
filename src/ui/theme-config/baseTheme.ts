import defaultTheme from '../../assets/defaultTheme.json';

export default async function themeInitializer(themeName: string | null, themeUrl: string) {
	try {
		const url = `${themeUrl}${themeName ? themeName : 'light'}.json`;
		const rawRes = await fetch(url);
		const res = await rawRes.json();
		const theme = { ...defaultTheme };
		theme.palette = res.palette;

		return theme;
	} catch (error) {
		return defaultTheme;
	}
}
