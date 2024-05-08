import 'i18next';
import EN_TRANSLATION from './common/locales/en/translation.json';
import FA_TRANSLATION from './common/locales/fa/translation.json';

declare module 'i18next' {
	interface CustomTypeOptions {
		defaultNS: 'FA_TRANSLATION';
		resources: {
			FA_TRANSLATION: typeof FA_TRANSLATION;
			EN_TRANSLATION: typeof EN_TRANSLATION;
		};
	}
}
