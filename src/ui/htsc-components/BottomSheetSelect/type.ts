export type Props = {
	list: { value: string; name: string }[];
	label: string;
	breackpoint?: 'md' | 'sm' | 'lg' | 'xs';
	defaultValue?: string;
	onChange: (item: { value: string; name: string }) => void;
	isRequired?: boolean;
	error?: boolean;
	helperText?: string;
};
