import { DateObject } from "react-multi-date-picker";

export type Props = {
	placeHolder?: string;
	className?: string;
	error?: boolean;
	helperText?: string;
	onChange: (DateObject: DateObject | DateObject[] | null) => void;
};
