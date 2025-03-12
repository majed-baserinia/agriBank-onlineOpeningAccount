import resolver from '@Fluentvalidator/extentions/fluentValidationResolver';
import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import VerificationOTPCommand from 'business/application/onlineOpenAccount/VerificationOTP/VerificationOTPCommand';
import useCreateAuthRequest from 'business/hooks/useCreateAuthRequest';
import useVerificationOTP from 'business/hooks/useVerificationOTP';

import usePostMessage from 'business/hooks/postMessage/usePostMessage';
import { usePreventNavigate } from 'business/hooks/usePreventNavigate';
import { pushAlert } from 'business/stores/AppAlertsStore';
import { useDataSteps } from 'business/stores/onlineOpenAccount/dataSteps';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import StagesListComp from 'ui/components/StagesListComp';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import Loader from 'ui/htsc-components/loader/Loader';
import Otp from 'ui/htsc-components/Otp';
import Stepper from 'ui/htsc-components/Stepper';
import { paths } from 'ui/route-config/paths';
import { stagesList } from '../HomePage';

export default function OtpPage() {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const matchesInfo = useMediaQuery(theme.breakpoints.down('lg'));
	const { t } = useTranslation();
	const location = useLocation();
	const { navigate } = usePreventNavigate();

	const [otpTime, setOtpTime] = useState<{ timer: number }>();

	const { personalInfo, addNewData } = useDataSteps();
	const { mutate: verifyOtp, isLoading: isLoadingVerify, isSuccess } = useVerificationOTP();
	const { mutate: sendAgain, isLoading: isLoadingSendAgain } = useCreateAuthRequest();

	usePostMessage({ callback: readOtp, message: { type: 'GetOTP', OTPLen: '8', ReadMode: 'UserConsent' } });

	useEffect(() => {
		setOtpTime({ timer: location.state.otpTime });
	}, []);

	function readOtp(e: MessageEvent<any>) {
		if (e.data.type === 'ResOTP') {
			setValue('verifyCode', e.data.OTP);
		}
	}

	const {
		handleSubmit: handleSubmitForVerifyOtp,
		formState,
		control,
		setValue
	} = useForm<VerificationOTPCommand>({
		resolver: (values, context, options) => {
			values = { ...values };
			return resolver(values, context, options);
		},
		context: VerificationOTPCommand
	});

	const handleOtpVerify = (data: VerificationOTPCommand) => {
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
							// TODO: needs to refactor but when? first backend needs to change it and give us the new version of the api
							// @ts-ignore: Unreachable code error
							messageText: err.error ? (err.error.message as string) : err.detail,
							hasConfirmAction: true,
							actions: {
								onConfirm() {
									// @ts-ignore: Unreachable code error
									if ((err.error.code as number) === 401) {
										navigate(paths.Home);
									}
								}
							}
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
					setOtpTime({ timer: response });
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
			container={matchesInfo ? false : true}
			sx={{ padding: matches ? '0' : '10px 0' }}
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
									active={1}
								/>
							) : null}
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
											defaultValue={field.value}
											error={!!formState?.errors?.verifyCode}
											helperText={formState?.errors?.verifyCode?.message}
											label={t('activationCodeOtp')}
											maxLength={8}
											timerInSeconds={otpTime}
											handleResend={handleSendAgain}
										/>
									)}
								/>
							</Grid>
						</Grid>
						<Grid container>
							<ButtonAdapter
								disabled={isLoadingSendAgain || isLoadingVerify || isSuccess}
								variant="contained"
								size="medium"
								muiButtonProps={{ sx: { width: '100%', marginTop: '20px' } }}
								onClick={handleSubmitForVerifyOtp(handleOtpVerify)}
							>
								{t('continue')}
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
			<Loader showLoader={isLoadingVerify || isLoadingSendAgain} />
		</Grid>
	);
}
