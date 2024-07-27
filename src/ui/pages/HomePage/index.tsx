import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';

import fileInvoiceIcon from 'assets/icon/menu/file-invoice.svg';
import identityCardIcon from 'assets/icon/menu/identity-card.svg';
import locationPinIcon from 'assets/icon/menu/location-pin.svg';
import cameraIcon from 'assets/icon/menu/camera.svg';
import Title from 'ui/components/Title';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import SvgToIcon from 'ui/htsc-components/SvgToIcon';
import { useNavigate } from 'react-router-dom';
import { paths } from 'ui/route-config/paths';


const stagesList = [
	{
		id: 1,
		title: 'selectDeposit',
		subtitle: 'selectDepositSub',
		icon: fileInvoiceIcon,
		iconAlt: 'file-Invoice'
	},
	{
		id: 2,
		title: 'sendDocuments',
		subtitle: 'sendDocumentsSub',
		icon: identityCardIcon,
		iconAlt: 'identity-Card'
	},
	{
		id: 3,
		title: 'address',
		subtitle: 'addressSub',
		icon: locationPinIcon,
		iconAlt: 'location-Pin'
	},
	{
		id: 4,
		title: 'Identification',
		subtitle: 'IdentificationSub',
		icon: cameraIcon,
		iconAlt: 'camera'
	},
] as const

export default function HomePage() {
	const { t } = useTranslation();
	const navigate = useNavigate()
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));

	const handleSubmit = () => {
		navigate(paths.selectDeposit)
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

							{stagesList.map((item)=> <Grid overflow={'hidden'}>
								<Grid
									container
									justifyContent={'space-between'}
									alignItems={'center'}
									minWidth={'290px'}
									sx={{ padding: matches ? '16px 0' : '24px 0', overflow: 'hidden' }}
								>
									<Grid>
										<Grid
											container
											gap={'8px'}
											alignItems={'start'}
											justifyContent={'center'}
										>
											<Grid item>
												<SvgToIcon
													icon={item.icon}
													alt={item.iconAlt}
												/>
											</Grid>
											<Grid>
												<Typography
													variant="bodyMd"
													fontWeight={'medium'}
													noWrap
												>
													
													{t(item.title)}
												</Typography>

												<Typography
													variant="bodyXs"
													fontWeight={'medium'}
													sx={{ color: theme.palette.text.secondary, marginTop: '8px' }}
												>
												{t(item.subtitle)}
												</Typography>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</Grid>)}
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
