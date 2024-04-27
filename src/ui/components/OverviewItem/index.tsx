import { Grid } from '@mui/material';

type Props = {
	title: string;
	value: string | number;
};

export default function OverviewItem(props: Props) {
	const { title, value } = props;
	return (
		<Grid
			container
			justifyContent={'space-between'}
			alignItems={'center'}
		>
			<Grid>{title}</Grid>
			<Grid>{value}</Grid>
		</Grid>
	);
}
