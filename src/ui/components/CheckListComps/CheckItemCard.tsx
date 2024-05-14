import { Grid, useMediaQuery, useTheme } from '@mui/material';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import ChipStatusAdapter from 'ui/htsc-components/ChipStatusAdapter';
import OverviewItem from '../OverviewItem';
import BottomSheetActionButton from './BottomSheetActionButton';

export default function CheckItemCard() {
	const theme = useTheme();
	const matchesSmall = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<Grid
			container
			justifyContent={'center'}
			alignItems={'center'}
			direction={'column'}
			sx={{
				padding: '16px',
				border: `1px solid ${theme.palette.grey[50]}`,
				borderRadius: '16px',
				//TODO: fix the width on mediaquery
				maxWidth: matchesSmall ? 'unset' : '285px'
			}}
			gap={'16px'}
			wrap="nowrap"
		>
			<Grid
				container
				item
				justifyContent={'space-between'}
				alignItems={'center'}
			>
				<Grid>{'saysdnum'}</Grid>
				<Grid>
					<ChipStatusAdapter
						label="test"
						type="info"
					/>
				</Grid>
			</Grid>
			<Grid
				container
				item
				justifyContent={'space-between'}
			>
				<OverviewItem
					title="sds"
					value={'dvsdv'}
				/>
				<OverviewItem
					title="sds"
					value={'dvsdv'}
				/>
				<OverviewItem
					title="sds"
					value={'dvsdv'}
				/>
			</Grid>
			<Grid
				container
				item
				gap={'16px'}
				wrap="nowrap"
			>
				<BottomSheetActionButton/>
				<ButtonAdapter
					muiButtonProps={{
						sx: {
							width: '100%'
						}
					}}
					variant="outlined"
					forwardIcon
					onClick={() => console.log()}
				>
					cdhj
				</ButtonAdapter>
			</Grid>
		</Grid>
	);
}
