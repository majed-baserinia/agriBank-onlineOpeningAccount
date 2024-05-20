import { Grid, Typography } from '@mui/material';

type Props = {
	title?: string;
	value?: string | number;
};

export default function OverviewItem(props: Props) {
	const { title, value } = props;
	return (
		<Grid
			container
			justifyContent={'space-between'}
			alignItems={'center'}
		>
			<Typography
				variant="bodySm"
				fontWeight={'medium'}
			>
				{title}
			</Typography>
			<Typography variant="bodySm">{value}</Typography>
		</Grid>
	);
}
