import { ChangeEvent } from "react";

export type Props = {
	type?: 'small' | 'large';
	checked: boolean;
	onChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
	label: string;
};