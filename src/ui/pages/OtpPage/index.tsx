import resolver from '@Fluentvalidator/extentions/fluentValidationResolver';
import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import VerificationOTPCommand from 'business/application/onlineOpenAccount/VerificationOTP/VerificationOTPCommand';
import useCreateAuthRequest from 'business/hooks/useCreateAuthRequest';
import useVerificationOTP from 'business/hooks/useVerificationOTP';

import { pushAlert } from 'business/stores/AppAlertsStore';
import { useDataSteps } from 'business/stores/onlineOpenAccount/dataSteps';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import StagesListComp from 'ui/components/StagesListComp';
import Title from 'ui/components/Title';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import Loader from 'ui/htsc-components/loader/Loader';
import Otp from 'ui/htsc-components/Otp';
import { paths } from 'ui/route-config/paths';
import { stagesList } from '../HomePage';

export default function OtpPage() {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const { t } = useTranslation();
	const navigate = useNavigate();
	const location = useLocation();
	const otpTime = location.state.otpTime;

	const { personalInfo, addNewData } = useDataSteps();
	const { mutate: verifyOtp, isLoading: isLoadingVerify } = useVerificationOTP();
	const { data: createAuthRes, mutate: sendAgain, isLoading: isLoadingSendAgain } = useCreateAuthRequest();

	const {
		handleSubmit: handleSubmitForVerifyOtp,
		formState,
		control
	} = useForm<VerificationOTPCommand>({
		resolver: (values, context, options) => {
			values = { ...values };
			return resolver(values, context, options);
		},
		context: VerificationOTPCommand
	});

	const handlOtpVerify = (data: VerificationOTPCommand) => {
		if (personalInfo) {
			const { mobile, nationalCode } = personalInfo;
			verifyOtp(
				{ mobile: mobile, nationalCode: nationalCode, verifyCode: data.verifyCode },
				{
					onSuccess: (res) => {
						addNewData({ token: res.token });
						navigate(paths.obligation, { state: { token: res.token } });
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

	const handleSendAgain = () => {
		if (personalInfo) {
			sendAgain(personalInfo, {
				onSuccess: (response) => {
					pushAlert({
						type: 'info',
						messageText: t('otpSendAgainSuccess'),
						hasConfirmAction: true
					});
				},
				onError: (err) => {
					pushAlert({ type: 'error', messageText: err.detail, hasConfirmAction: true });
				}
			});
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
							<Title>{t('openAccount')}</Title>

							<Grid
								marginBottom={'64px'}
								container
								flexWrap={'nowrap'}
								gap={'8px'}
							>
								<Typography
									variant="bodyMd"
									sx={{ marginBottom: '8px' }}
								>
									{t('otpPageTitleText')}
								</Typography>
							</Grid>

							<Grid
								item
								xs={12}
								sm={12}
								md={6}
								lg={6}
								xl={6}
							>
								<Controller
									name="verifyCode"
									control={control}
									render={({ field }) => (
										<Otp
											onChange={(value) => field.onChange(value)}
											error={!!formState?.errors?.verifyCode}
											helperText={formState?.errors?.verifyCode?.message}
											label={t('activationCodeOtp')}
											maxLength={8}
											timerInSeconds={createAuthRes && otpTime}
											handleResend={handleSendAgain}
										/>
									)}
								/>
							</Grid>
						</Grid>
						<Grid container>
							<ButtonAdapter
								variant="contained"
								size="medium"
								muiButtonProps={{ sx: { width: '100%', marginTop: '16px' } }}
								onClick={handleSubmitForVerifyOtp(handlOtpVerify)}
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
			<Loader showLoader={isLoadingVerify || isLoadingSendAgain} />
		</Grid>
	);
}
