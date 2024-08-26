import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import useGetObligation from 'business/hooks/useGetObligation';
import useSaveObligation from 'business/hooks/useSaveObligation';
import { pushAlert } from 'business/stores/AppAlertsStore';

import { usePreventNavigate } from 'business/hooks/usePreventNavigate';
import { useDataSteps } from 'business/stores/onlineOpenAccount/dataSteps';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import StagesListComp from 'ui/components/StagesListComp';
import Title from 'ui/components/Title';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import Loader from 'ui/htsc-components/loader/Loader';
import Stepper from 'ui/htsc-components/Stepper';
import SwitchAdapter from 'ui/htsc-components/SwitchAdapter';
import { paths } from 'ui/route-config/paths';
import { stagesList } from '../HomePage';

export default function ObligationPage() {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const { t } = useTranslation();
	const { navigate } = usePreventNavigate();

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
							// TODO: needs to refactor but when? first backend needs to change it and give us the new version of the api
							// @ts-ignore: Unreachable code error
							messageText: err.error ? (err.error.message as string) : err.detail,
							hasConfirmAction: true,
							actions: {
								onCloseModal: () => {
									navigate(paths.Home);
								},
								onConfirm: () => {
									navigate(paths.Home);
								}
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
							{!matches ? (
								<Stepper
									list={[
										t('enterInformation'),
										t('activationCodeTitle'),
										t('commitmentLetter'),
										t('residenceBranch'),
										t('cardType'),
										t('cardDesign'),
										t('cardIssuance'),
										t('sendDocuments'),
										t('end')
									]}
									active={2}
								/>
							) : null}
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
			{matches ? null : (
				<Grid
					item
					md={3}
					dir={theme.direction}
				>
					<BoxAdapter>
						<StagesListComp list={stagesList} />
					</BoxAdapter>
				</Grid>
			)}
			<Loader showLoader={isLoadingGetObligation || isLoadingSaveObligation} />
		</Grid>
	);
}
