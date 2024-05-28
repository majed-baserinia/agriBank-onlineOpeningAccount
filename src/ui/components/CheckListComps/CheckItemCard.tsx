import { Grid, useMediaQuery, useTheme } from '@mui/material';
import { Check } from 'common/entities/cheque/chekList/CartableInquiry/CartableInquiryResponse';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import Loader from 'ui/htsc-components/loader/Loader';
import { paths } from 'ui/route-config/paths';
import OverviewItem from '../OverviewItem';
import BottomSheetActionButton from './BottomSheetActionButton';
import ChipsStatusGenerator from './ChipsStatusGenerator';
import { AllowedNumbers } from './types';

export default function CheckItemCard({ check }: { check?: Check }) {
	const { t } = useTranslation();
	const navigate = useNavigate();
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
			<Loader showLoader={!check} />
			<Grid
				container
				item
				justifyContent={'space-between'}
				alignItems={'center'}
			>
				<Grid>{check?.sayadNo}</Grid>
				<Grid>
					<ChipsStatusGenerator status={check?.chequeStatus as AllowedNumbers} />
				</Grid>
			</Grid>
			<Grid
				container
				item
				justifyContent={'space-between'}
			>
				<OverviewItem
					title={t('serieAndSerial')}
					value={check?.serialNo + '/' + check?.seriesNo}
				/>
				<OverviewItem
					title={t('amount')}
					value={check?.amount}
				/>
				<OverviewItem
					title={t('reason')}
					value={check?.reasonDescription}
				/>
				<OverviewItem
					title={t('date')}
					value={check?.dueDate}
				/>
			</Grid>
			<Grid
				container
				item
				gap={'16px'}
				wrap="nowrap"
			>
				<BottomSheetActionButton />
				<ButtonAdapter
					muiButtonProps={{
						sx: {
							width: '100%'
						}
					}}
					variant="outlined"
					forwardIcon
					onClick={() => {
						navigate(`${paths.ReceivedChecksList.Detail}?sayadNo=${check?.sayadNo}`);
					}}
				>
					{t('details')}
				</ButtonAdapter>
			</Grid>
		</Grid>
	);
}
