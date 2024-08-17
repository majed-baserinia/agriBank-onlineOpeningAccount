export type Props = {
	maxLength?: number;
	onChange: (value: string) => void;
	helperText?: string;
	error?: boolean;
	label: string;
	handleResend: () => void;
	timerInSeconds?: {
		timer: number
	}
};
