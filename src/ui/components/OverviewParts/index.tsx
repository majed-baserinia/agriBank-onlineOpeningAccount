import { Grid, Typography } from '@mui/material';

type Props =
	| {
			name: string;
			shahabCode?: string | number;
			IDCode: string | number;
			comprehensiveCode?: never;
	  }
	| {
			name: string;
			shahabCode?: string | number;
			comprehensiveCode: string | number;
			IDCode?: never;
	  };

export default function OverviewParts(props: Props) {
	const { name, shahabCode, IDCode, comprehensiveCode } = props;

	return (
		<Grid
			container
			direction={'column'}
			justifyContent={'space-between'}
			alignItems={'start'}
			sx={{ padding: '16px' }}
		>
			<Grid>{name}</Grid>
			<Grid
				container
				gap={'4px'}
				justifyContent={'start'}
			>
				{IDCode ? (
					<>
						<Typography variant="body2">IDCode:</Typography>
						<Typography variant="body2">{IDCode}</Typography>
					</>
				) : null}
				{comprehensiveCode ? (
					<>
						<Typography variant="body2">comprehensiveCode:</Typography>
						<Typography variant="body2">{comprehensiveCode}</Typography>
					</>
				) : null}
				{shahabCode ? (
					<>
						<Typography variant="body2"> | shahab:</Typography>
						<Typography variant="body2">{shahabCode}</Typography>{' '}
					</>
				) : null}
			</Grid>
		</Grid>
	);
}
