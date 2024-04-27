export type Props = {
	type?: 'small' | 'large';
	checked: boolean;
	onChange: () => void;
	label: string;
};