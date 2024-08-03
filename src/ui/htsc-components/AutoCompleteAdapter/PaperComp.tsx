import { Paper, PaperProps, useMediaQuery, useTheme } from '@mui/material';

export default function PaperComp(props: PaperProps) {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<Paper
			{...props}
			elevation={0}
			sx={
				matches
					? {
							overflow: 'hidden',
							backgroundColor: theme.palette.background.paper,
							height: '100%',
							width: '100%',
							boxShadow: 'none'
						}
					: null
			}
		/>
	);
}
