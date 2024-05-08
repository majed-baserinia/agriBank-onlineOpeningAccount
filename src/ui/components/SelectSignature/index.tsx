import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Divider, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import infoIcon from 'assets/icon/info-circle.svg';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import SvgToIcon from 'ui/htsc-components/SvgToIcon';

export default function SelectSignature({
	setSelectedSigniture
}: {
	setSelectedSigniture: Dispatch<SetStateAction<'group' | 'myslef' | undefined>>;
}) {
	const { t } = useTranslation();
	const theme = useTheme();
	const isMatched = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<Grid
			sx={{ padding: isMatched ? '16px' : '40px' }}
			container
			direction={'column'}
			gap={'60px'}
		>
			<Grid
				container
				direction={'column'}
				gap={'8px'}
			>
				<Grid
					container
					sx={{ gap: '8px' }}
				>
					<SvgToIcon
						icon={infoIcon}
						alt="info"
					/>
					<Typography>{t('IssuerSignature')}</Typography>
				</Grid>
				<Typography variant="body2">{t('selectSignatureText')}</Typography>
			</Grid>
			<Grid>
				<Grid
					container
					justifyContent={'space-between'}
					sx={{ padding: '20px 0', minWidth: '300px', cursor: 'pointer' }}
					onClick={() => setSelectedSigniture('myslef')}
				>
					<Grid>
						<Typography>{t('mySignature')}</Typography>
						<Typography variant="body2">{t('mySignatureSubText')}</Typography>
					</Grid>
					{/* TODO: change the icon on ltr to  ArrowForwardIosIcon  */}

					<ArrowBackIosNewIcon />
				</Grid>
				<Divider />
				<Grid
					container
					justifyContent={'space-between'}
					sx={{ padding: '20px 0', minWidth: '300px', cursor: 'pointer' }}
					onClick={() => setSelectedSigniture('group')}
				>
					<Grid>
						<Typography>{t('selectSignatureGroup')}</Typography>
						<Typography variant="body2">{t('selectSignatureGroupSubText')}</Typography>
					</Grid>
					{/* TODO: change the icon on ltr to  ArrowForwardIosIcon  */}

					<ArrowBackIosNewIcon />
				</Grid>
			</Grid>
		</Grid>
	);
}
