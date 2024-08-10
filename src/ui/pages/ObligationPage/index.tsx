import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import useGetObligation from 'business/hooks/useGetObligation';
import useSaveObligation from 'business/hooks/useSaveObligation';
import { pushAlert } from 'business/stores/AppAlertsStore';

import { useDataSteps } from 'business/stores/onlineOpenAccount/dataSteps';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Title from 'ui/components/Title';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import Loader from 'ui/htsc-components/loader/Loader';
import SwitchAdapter from 'ui/htsc-components/SwitchAdapter';
import { paths } from 'ui/route-config/paths';

export default function ObligationPage() {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const { t } = useTranslation();
	const navigate = useNavigate();

	const { token, addNewData } = useDataSteps();
	const [aggrementAccepted, setAggrementAccepted] = useState(false);

	const { data: obligation, mutate: getObligation, isLoading: isLoadingGetObligation } = useGetObligation();
	const { mutate: saveObligation, isLoading: isLoadingSaveObligation } = useSaveObligation();

	useEffect(() => {
		if (token) {
			getObligation(
				{ token },
				{
					onSuccess: (res) => {
						addNewData({ isKycNeeded: res.isKYCNeeded });
					},
					onError: (err) => {
						pushAlert({
							type: 'error',
							messageText: err.detail,
							hasConfirmAction: true,
							actions: {
								onConfirm: () => navigate(paths.Home)
							}
						});
					}
				}
			);
		} else {
			navigate(paths.Home);
		}
	}, []);

	const handleSubmit = () => {
		if (token && aggrementAccepted) {
			saveObligation(
				{ token },
				{
					onSuccess: () => {
						navigate(paths.locationInfo);
					},
					onError: (err) => {
						pushAlert({
							type: 'error',
							messageText: err.detail,
							hasConfirmAction: true
						});
					}
				}
			);
		}
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
							<Title>{t('obligationTitle')}</Title>

							{!isLoadingGetObligation ? (
								<>
									<Grid item>
										<Typography variant={'body1'}>
											<div dangerouslySetInnerHTML={{ __html: obligation?.aggrementText! }} />
										</Typography>
									</Grid>
									<Grid item>
										<SwitchAdapter
											checked={aggrementAccepted}
											label={t('acceptObligation')}
											onChange={() => {
												setAggrementAccepted(!aggrementAccepted);
											}}
											type="small"
										></SwitchAdapter>
									</Grid>
								</>
							) : null}
						</Grid>
						<Grid container>
							<ButtonAdapter
								disabled={!aggrementAccepted}
								variant="contained"
								size="medium"
								muiButtonProps={{ sx: { width: '100%', marginTop: '16px' } }}
								onClick={handleSubmit}
							>
								{t('continue')}
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
			<Loader showLoader={isLoadingGetObligation || isLoadingSaveObligation} />
		</Grid>
	);
}
