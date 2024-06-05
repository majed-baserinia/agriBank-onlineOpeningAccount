import { Divider, Grid, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import OverviewItem from '../CheckOverview/OverviewItem';

type Props = {
	sayadNo?: number;
	amount?: string;
	beneficiaries?: [];
};
export default function CheckOverViewBox(props: Props) {
	const { beneficiaries, sayadNo, amount } = props;
	const theme = useTheme();
	const { t } = useTranslation();

	return (
		<Grid
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
				sx={{ marginTop: '8px', marginBottom: '8px' }}
				title={t('sayadNo')}
				value={sayadNo}
			/>
			<OverviewItem
				sx={{ marginTop: '8px', marginBottom: '8px' }}
				title={t('amount')}
				value={amount}
			/>
			{beneficiaries ? (
				<>
					<Divider />
					<OverviewItem
						sx={{ marginTop: '8px', marginBottom: '8px' }}
						title={t('beneficiary')}
						value={'overviewData?.reason'}
					/>
					<OverviewItem
						sx={{ marginTop: '8px', marginBottom: '8px' }}
						title={t('beneficiary')}
						value={'overviewData?.reason'}
					/>
				</>
			) : null}
		</Grid>
	);
}
