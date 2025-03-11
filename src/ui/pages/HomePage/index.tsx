import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';

import cameraIcon from 'assets/icon/menu/camera.svg';
import identityCardIcon from 'assets/icon/menu/identity-card.svg';
import locationPinIcon from 'assets/icon/menu/location-pin.svg';
import noteSquareIcon from 'assets/icon/menu/note-square.svg';
import soundOffIcon from 'assets/icon/menu/sound-off.svg';
import userIcon from 'assets/icon/user.svg';
import { useNavigate } from 'react-router-dom';
import StagesListComp from 'ui/components/StagesListComp';
import Title from 'ui/components/Title';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import { paths } from 'ui/route-config/paths';
import { useDataSteps } from 'business/stores/onlineOpenAccount/dataSteps';
import { useEffect } from 'react';

export const stagesList = [
	{
		id: 1,
		title: 'nationalCardHomePageTitle',
		icon: identityCardIcon,
		iconAlt: 'identity-Card'
	},
	{
		id: 2,
		title: 'cameraAccessHomePageTitle',
		icon: cameraIcon,
		iconAlt: 'camera'
	},
	{
		id: 3,
		title: 'noVoiceHomePageTitle',
		icon: soundOffIcon,
		iconAlt: 'sound Off'
	},
	{
		id: 4,
		title: 'identificationHomePageTitle',
		icon: locationPinIcon,
		iconAlt: 'location-icon'
	},
	{
		id: 5,
		title: 'hijabHomePageTitle',
		icon: userIcon,
		iconAlt: 'user-icon'
	},
	{
		id: 6,
		title: 'penHomePageTitle',
		icon: noteSquareIcon,
		iconAlt: 'note-square-icon'
	}
];

export default function HomePage() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const { reset } = useDataSteps();

	useEffect(() => {
		reset();
	}, [])

	const handleSubmit = () => {
		navigate(paths.PersonalInfoPage);
	};

	return (
		<Grid
			container
			sx={{ padding: matches ? '0' : '64px 0' }}
			justifyContent={'center'}
			gap={'24px'}
			dir={theme.direction}
		>
			<Grid
				item
				xs={12}
				md={8}
			>
				<BoxAdapter fullWidth={matches}>
					<Grid
						minHeight={matches ? 'calc(100vh - 64px)' : 'calc(100vh - 192px)'}
						container
						direction={'column'}
						justifyContent={'space-between'}
						wrap="nowrap"
					>
						<Grid>
							<Title>{t('openingAccountSteps')}</Title>

							<Typography
								variant="bodyMd"
								sx={{ marginBottom: '8px' }}
							>
								{t('openingAccountStepsText')}
							</Typography>

							<StagesListComp list={stagesList} />
						</Grid>
						<Grid container>
							<ButtonAdapter
								variant="contained"
								size="medium"
								muiButtonProps={{ sx: { width: '100%' } }}
								onClick={() => handleSubmit()}
							>
								{t('openAccount')}
							</ButtonAdapter>
						</Grid>
					</Grid>
				</BoxAdapter>
			</Grid>
			{/* {matches ? null : (
				<Grid
					item
					md={3}
					dir={theme.direction}
				>
					<BoxAdapter>
						<Menu list={menuList.management} />
						<Menu list={menuList.services} />
					</BoxAdapter>
				</Grid>
			)} */}
		</Grid>
	);
}
