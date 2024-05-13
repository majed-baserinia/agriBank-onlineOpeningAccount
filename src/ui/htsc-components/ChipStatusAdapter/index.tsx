import { Chip, useTheme } from '@mui/material';
import { Props } from "./type";

export default function ChipStatusAdapter(props:Props) {
	const { type, label } = props;
	const theme = useTheme();

	const types = {
		disabled: {
			backgroundColor: theme.palette.grey[50],
			color: theme.palette.grey[200]
		},

		success: {
			backgroundColor: theme.palette.success[50],
			color: theme.palette.primary[600]
		},
		error: {
			backgroundColor: theme.palette.error[50],
			color: theme.palette.error[600]
		},
		warning: {
			backgroundColor: theme.palette.warning[50],
			color: theme.palette.warning[700]
		},
		info: {
			backgroundColor: theme.palette.info[50],
			color: theme.palette.info[600]
		}
	};

	return (
		<Chip
			variant="filled"
			sx={{ ...types[type], padding: '8px' }}
			label={label}
		/>
	);
}
