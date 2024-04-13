import { Grid, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';

export default function CheqeCard() {
	const { t } = useTranslation();
	const theme = useTheme();

	return (
		<Grid>
			<Typography>2. از دسته چک مورد نطر خود یک برگ انتخاب کنید.</Typography>
			<Grid
				sx={{
					border: `1px solid ${theme.palette.grey[100]}`,
					borderRadius: '16px',
					padding: '16px'
				}}
				gap={'8px'}
				container
				direction={'column'}
			>
				<Grid
					container
					sx={{ marginBottom: '16px' }}
				>
					<Typography>شماره چک:</Typography>
					<Typography>123132132132</Typography>
				</Grid>
				<Grid
					container
					justifyContent={'space-between'}
				>
					<Typography>کد شعبه صادر کننده:</Typography>
					<Typography>2131231231</Typography>
				</Grid>
				<Grid
					container
					justifyContent={'space-between'}
				>
					<Typography>تاریخ صدور:</Typography>
					<Typography>2131231231</Typography>
				</Grid>
				<Grid
					container
					justifyContent={'space-between'}
				>
					<Typography>تاریخ انقضا:</Typography>
					<Typography>2131231231</Typography>
				</Grid>
				<ButtonAdapter
					variant="contained"
					size="medium"
					muiButtonProps={{ sx: { width: '100%' } }}
					onClick={() => console.log()}
				>
					{t('selectCheckSheet')}
				</ButtonAdapter>
			</Grid>
		</Grid>
	);
}
