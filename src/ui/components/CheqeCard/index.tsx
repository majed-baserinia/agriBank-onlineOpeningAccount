import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import { Grid, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

type Props = {
	checkbookNumber: string;
	checkbookType: string;
	branchCode: string;
	issueDate: string;
	expireDate: string;
};

export default function CheqeCard(props: Props) {
	const { checkbookNumber, checkbookType, branchCode, issueDate, expireDate } = props;
	const { t } = useTranslation();
	const theme = useTheme();

	return (
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
				<Typography>{t('checkbookNumber')}:</Typography>
				<Typography>{checkbookNumber}</Typography>
			</Grid>
			<Grid
				container
				justifyContent={'space-between'}
			>
				<Typography>{t('checkbookType')}:</Typography>
				<Typography>{checkbookType}</Typography>
			</Grid>
			<Grid
				container
				justifyContent={'space-between'}
			>
				<Typography>{t('branchCode')}:</Typography>
				<Typography>{branchCode}</Typography>
			</Grid>
			<Grid
				container
				justifyContent={'space-between'}
			>
				<Typography>{t('issueDate')}:</Typography>
				<Typography>{issueDate}</Typography>
			</Grid>
			<Grid
				container
				justifyContent={'space-between'}
			>
				<Typography>{t('expireDate')}:</Typography>
				<Typography>{expireDate}</Typography>
			</Grid>
			<ButtonAdapter
				variant="contained"
				size="medium"
				muiButtonProps={{ sx: { width: '100%', marginTop: '16px' } }}
				onClick={() => console.log()}
			>
				{t('selectCheckSheet')}
			</ButtonAdapter>
		</Grid>
	);
}
