import { CSSProperties } from 'react';

export type Props = {
	listOfOptions: radioOptions[];
	variant?: 'borderedSelected' | 'backgroundSelected';
	defaultValue?: string;
	title?: string;
	onChange: (value: string) => void;
	layoutColumns: number;
};

type radioOptions = {
	value: string;
	label: string;
	subLabel?: string;
	disabled?: boolean;
	sx?: CSSProperties;
};
