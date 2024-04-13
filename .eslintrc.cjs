module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: [
		"airbnb",
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
		'plugin:react/recommended',
		'standard',
		'standard-react'
	],
	parserOptions: {
		ecmaVersion: 'latest',
		ecmaFeatures: {
			jsx: true,
			tsx: true
		},
		sourceType: 'module',
		project: './tsconfig.json'
	},
	plugins: ['react'],
	rules: {
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
		'react/react-in-jsx-scope': 'off',
		'prettier/prettier': [
			'warn',
			{
				endOfLine: 'auto',
				arrowParens: 'always',
				bracketSpacing: true,
				jsxBracketSameLine: false,
				printWidth: 120,
				proseWrap: 'preserve',
				requirePragma: false,
				semi: true,
				singleQuote: true,
				tabWidth: 4,
				trailingComma: 'none',
				useTabs: true,
				singleAttributePerLine: true
			}
		]
	}
};
