import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { sendPostmessage } from 'business/hooks/postMessage/useInitPostMessage';
import { usePreventNavigate } from 'business/hooks/usePreventNavigate';
import { useDataSteps } from 'business/stores/onlineOpenAccount/dataSteps';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import StagesListComp from 'ui/components/StagesListComp';
import AlertIcon from 'ui/htsc-components/alerts/alertIcon';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import Loader from 'ui/htsc-components/loader/Loader';
import Stepper from 'ui/htsc-components/Stepper';
import { stagesList } from '../HomePage';

export default function ResultPage() {
	const { t } = useTranslation();
	const location = useLocation();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const matchesInfo = useMediaQuery(theme.breakpoints.down('lg'));
	const { reset } = useDataSteps();
	usePreventNavigate();
	const handleSubmit = () => {
		reset();
		sendPostmessage('isFinishedBack', 'true');
	};

	return (
		<Grid
			container={matchesInfo ? false : true}
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
									active={8}
								/>
							) : null}
							<Grid
								container
								direction={'column'}
								justifyContent={'center'}
								alignItems={'center'}
								gap={'16px'}
							>
								<Grid>
									{location.state.status === 'Approved' ? (
										<AlertIcon type={'success'} />
									) : (
										<AlertIcon type={'error'} />
									)}
								</Grid>
								<Grid>
									<Typography
										variant="bodyMd"
										fontWeight={'bold'}
										textAlign={'center'}
									>
										{location.state.status === 'Approved' ? t('success') : t('error')}
									</Typography>
								</Grid>

								<Grid>
									<Typography
										textAlign={'center'}
										variant="bodySm"
										fontWeight={'regular'}
									>
										{location.state.status === 'Approved'
											? t('endPageSuccessText')
											: t('endPageErrorText')}
									</Typography>
								</Grid>
							</Grid>
						</Grid>
						<Grid container>
							<ButtonAdapter
								variant="contained"
								size="medium"
								muiButtonProps={{ sx: { width: '100%', marginTop: '16px' } }}
								onClick={handleSubmit}
							>
								{t('confirm')}
							</ButtonAdapter>
						</Grid>
					</Grid>
				</BoxAdapter>
			</Grid>
			{matchesInfo ? null : (
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
			<Loader showLoader={false} />
		</Grid>
	);
}
