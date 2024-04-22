import { Grid, Typography, useTheme } from '@mui/material';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import InputAdapter from 'ui/htsc-components/InputAdapter';
import { ReciversContext } from 'ui/pages/IssueCheck/AddRecievers';

export default function AddForm() {
	const theme = useTheme();
	const { t } = useTranslation();
	const [personal, setPersonal] = useState(true);

	const ReciversData = useContext(ReciversContext);

	const activeButtonStyle = {
		backgroundColor: theme.palette.primary.main,
		color: 'white'
	};

	return (
		<Grid
			sx={{ padding: '16px' }}
			container
			direction={'column'}
			gap={'16px'}
		>
			<Typography variant="body2">{t('addRecieverDataText')}</Typography>
			<Grid
				container
				sx={{
					borderRadius: '8px',
					width: '100%',
					padding: '4px',
					backgroundColor: theme.palette.primary[50],
					cursor: 'pointer'
				}}
			>
				<Grid
					sx={{
						width: '50%',
						padding: '10px 0',
						textAlign: 'center',
						borderRadius: '8px',
						color: theme.palette.primary.main,
						...(personal ? activeButtonStyle : null)
					}}
					onClick={() => setPersonal(true)}
				>
					{t('personal')}
				</Grid>
				<Grid
					sx={{
						color: theme.palette.primary.main,
						width: '50%',
						padding: '10px 5px',
						textAlign: 'center',
						borderRadius: '8px',
						...(!personal ? activeButtonStyle : null)
					}}
					onClick={() => setPersonal(false)}
				>
					{t('corporate')}
				</Grid>
			</Grid>
			<Grid>
				<Grid
					container
					direction={'column'}
					gap={'16px'}
				>
					<Grid
						container
						gap={'8px'}
						justifyContent={'center'}
						alignItems={'center'}
					>
						<InputAdapter
							sx={{ flex: 1 }}
							label={personal ?  t('personalIDOrUniversalID')  : t("companyLegalID")}
							isRequired
							onChange={(e) => {}}
						></InputAdapter>
						<ButtonAdapter
							variant="outlined"
							onClick={() => {}}
							muiButtonProps={{ sx: { borderRadius: '16px' } }}
						>
							{t('inquiry')}
						</ButtonAdapter>
					</Grid>
					<InputAdapter
						sx={{ flex: 1 }}
						type="number"
						label={personal ? t('first&lastName') : t("companyName")}
						isRequired
						onChange={(e) => {}}
					></InputAdapter>
					<InputAdapter
						type="number"
						sx={{ flex: 1 }}
						label={t('optionalShahab')}
						onChange={(e) => {}}
					></InputAdapter>
					<ButtonAdapter
						variant="contained"
						onClick={() => {}}
					>
						{t('add')}
					</ButtonAdapter>
				</Grid>
			</Grid>
		</Grid>
	);
}
