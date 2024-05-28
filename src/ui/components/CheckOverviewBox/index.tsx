import { Divider, Grid, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import OverviewItem from '../CheckOverview/OverviewItem';


export default function CheckOverViewBox() {
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
				value={'overviewData?.reason'}
			/>
			<OverviewItem
				sx={{ marginTop: '8px', marginBottom: '8px' }}
				title={t('amount')}
				value={'overviewData?.reason'}
			/>
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
		</Grid>
	);
}
