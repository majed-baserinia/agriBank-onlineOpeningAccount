import { Divider, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import OverviewItem from '../OverviewItem';
import { Props } from './types';

export default function BasicCheckDetials(props: Props) {
	const { sayadNo, amount, dueDate, reason, serialSerie, sheba, description, cashStatus, transferStatus } = props;
	const { t } = useTranslation();

	return (
		<>
			<Grid
				container
				direction={'column'}
				gap={'16px'}
			>
				<OverviewItem
					title={t('sayadNo')}
					value={sayadNo}
				/>

				<OverviewItem
					title={t('serieAndSerial')}
					value={serialSerie}
				/>
				<Divider />
				{sheba ? (
					<OverviewItem
						title={t('shebaOrigin')}
						value={sheba}
					/>
				) : null}
				<OverviewItem
					title={t('amount')}
					value={amount}
				/>
				<OverviewItem
					title={t('dueDate')}
					value={dueDate}
				/>
				<OverviewItem
					title={t('reason')}
					value={reason}
				/>
				<Divider />
				{cashStatus ? (
					<OverviewItem
						title={t('cashStatus')}
						value={cashStatus}
					/>
				) : null}
				{transferStatus ? (
					<OverviewItem
						title={t('transferStatus')}
						value={transferStatus}
					/>
				) : null}
				{transferStatus || cashStatus ? <Divider /> : null}
			</Grid>
			<Grid sx={{ marginTop: '16px', marginBottom: '16px' }}>
				<Typography
					variant="bodySm"
					fontWeight={'medium'}
				>
					{t('description')}
				</Typography>
				<Typography variant="bodySm">{description}</Typography>
			</Grid>
		</>
	);
}
