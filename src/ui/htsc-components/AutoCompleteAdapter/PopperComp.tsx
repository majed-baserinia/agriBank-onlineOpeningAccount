import { Popper, PopperProps, useMediaQuery, useTheme } from '@mui/material';

export default function PopperComp(props: PopperProps) {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<Popper
			{...props}
			sx={{
				boxShadow: matches ? 0 : 3
			}}
		/>
	);
}
