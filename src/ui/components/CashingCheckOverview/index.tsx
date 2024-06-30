import { Divider, Grid, Typography, useTheme } from '@mui/material';
import { ReceiverInquiryChequeResponse } from 'common/entities/cheque/cashCheck/ReceiverInquiryCheque/ReceiverInquiryChequeResponse';
import { useTranslation } from 'react-i18next';
import OverviewItem from '../CheckOverview/OverviewItem';

type Props = {
	check: ReceiverInquiryChequeResponse;
};
export default function CashingCheckOverview(props: Props) {
	const { amount, sayadId, serialNo, seriesNo, chequeStatusDescription, dueDate, reasonDescription, description } =
		props.check;
	const theme = useTheme();
	const { t } = useTranslation();

	return (
		<Grid
			container
			direction={'column'}
			gap={'8px'}
			sx={{
				backgroundColor: theme.palette.primary[50],
				padding: '16px',
				borderRadius: '16px'
			}}
		>
			<Typography
				variant="bodyMd"
				fontWeight={'medium'}
				align="center"
			>
				{t('checkInfo')}
			</Typography>
			<OverviewItem
				title={t('sayadNo')}
				value={sayadId}
			/>
			<OverviewItem
				title={t('series')}
				value={seriesNo}
			/>
			<OverviewItem
				title={t('serial')}
				value={serialNo}
			/>
			<Divider />
			<OverviewItem
				title={t('amount')}
				value={amount}
			/>
			<OverviewItem
				title={t('checkStatus')}
				value={chequeStatusDescription}
			/>
			<OverviewItem
				title={t('dueDate')}
				value={dueDate}
			/>
			<OverviewItem
				title={t('reason')}
				value={reasonDescription}
			/>
			<Divider />
			<Typography
				variant="bodySm"
				fontWeight={'medium'}
			>
				{t('description')}
			</Typography>
			<Typography variant="bodySm">{description}</Typography>
		</Grid>
	);
}
