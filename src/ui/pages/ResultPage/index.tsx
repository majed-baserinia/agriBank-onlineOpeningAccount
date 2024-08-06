import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useDataSteps } from 'business/stores/onlineOpenAccount/dataSteps';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Title from 'ui/components/Title';
import AlertIcon from 'ui/htsc-components/alerts/alertIcon';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import Loader from 'ui/htsc-components/loader/Loader';
import { paths } from 'ui/route-config/paths';

export default function ResultPage() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const { reset } = useDataSteps();

	const handlesubmit = () => {
		reset();
		navigate(paths.Home);
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
							<Title>{t('openAccount')}</Title>

							<Grid
								container
								direction={'column'}
								justifyContent={'center'}
								alignItems={'center'}
								gap={'16px'}
							>
								<Grid>
									<AlertIcon type={'success'} />
								</Grid>
								<Grid>
									<Typography
										variant="bodyMd"
										fontWeight={'bold'}
										textAlign={'center'}
									>
										{t('success')}
									</Typography>
								</Grid>

								<Grid>
									<Typography
										textAlign={'center'}
										variant="bodySm"
										fontWeight={'regular'}
									>
										{t('endPageSuccessText')}
									</Typography>
								</Grid>
							</Grid>
						</Grid>
						<Grid container>
							<ButtonAdapter
								variant="contained"
								size="medium"
								muiButtonProps={{ sx: { width: '100%', marginTop: '16px' } }}
								onClick={handlesubmit}
							>
								{t('confirm')}
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
						<Menu
							divider={false}
							list={menuList.management}
						/>
						<Menu
							divider={false}
							list={menuList.services}
						/>{' '}
					</BoxAdapter>
				</Grid>
			)} */}
			<Loader showLoader={false} />
		</Grid>
	);
}
