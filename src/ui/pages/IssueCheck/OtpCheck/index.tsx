import resolver from '@Fluentvalidator/extentions/fluentValidationResolver';
import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import infoIcon from 'assets/icon/info-circle.svg';
import sendAaginIcon from 'assets/icon/refresh-alert.svg';
import CheckInitiateOtpCommand from 'business/application/cheque/Digital Cheque/Send Otp/CheckInitiateOtpCommand';
import VerifyOtpCommand from 'business/application/cheque/Digital Cheque/Verify Otp/VerifyOtpCommand';
import useCheckInitiateOtp from 'business/hooks/cheque/Digital Cheque/useCheckInitiateOtp';
import useSecondStepCall from 'business/hooks/cheque/activation/useSecondStepCall';
import { pushAlert } from 'business/stores/AppAlertsStore';
import { useDataSteps } from 'business/stores/issueCheck/dataSteps';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Menu from 'ui/components/Menu';
import Title from 'ui/components/Title';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import InputAdapter from 'ui/htsc-components/InputAdapter';
import Stepper from 'ui/htsc-components/Stepper';
import SvgToIcon from 'ui/htsc-components/SvgToIcon';
import CountDownTimer from 'ui/htsc-components/count-down-timer/CountdownTimer';
import { menuList } from '../../HomePage/menuList';
export default function OtpCheck() {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const { t } = useTranslation();
	const navigate = useNavigate();
	const setDataForNextStep = useDataSteps((store) => store);
	const [timerInSeconds, settimerInSeconds] = useState<number>(0);
	const [IsCountDownTimerCounting, setIsCountDownTimerCounting] = useState<boolean>();
	const [open, setOpen] = useState(false);
	const [IsSendAgain, setSendAgain] = useState(false);

	const activationKey = '3fa85f64-5717-4562-b3fc-2c963f66afa6'; // useAccountChargeStore((s) => s.activationKeyStore.ActivationKey);
	const { mutate: sendAgain } = useSecondStepCall();
	//const { mutate: CheckInitiateOtpMutate, handleSubmit } = useCheckInitiateOtp();
	const {
		data: CheckInitiateOtpData,
		mutate: CheckInitiateOtpMutate,
		error: CheckInitiateOtpError
	} = useCheckInitiateOtp();

	const {
		register: VerifyOtpRequest,
		handleSubmit: handleSubmitForVerifyOtp,
		formState,
		control
	} = useForm<VerifyOtpCommand>({
		resolver: (values, context, options) => {
			values = { ...values };
			return resolver(values, context, options);
		},
		context: VerifyOtpCommand
	});

	useEffect(() => {
		CheckInitiateOtpMutate(
			{ issueChequeKey: activationKey },
			{
				onError: (err) => {
					pushAlert({ type: 'error', messageText: err.detail, hasConfirmAction: true });
				}
			}
		);
	}, []);

	const CheckInitiateOtp = (data: CheckInitiateOtpCommand) => {
		CheckInitiateOtpMutate(data, {
			onSuccess: (response) => {
				settimerInSeconds(response.lifeTime);
				pushAlert({
					type: 'success',
					messageText: response.message,
					hasConfirmAction: true,
					actions: {
						onCloseModal: () => navigate('/cheque'),
						onConfirm: () => navigate('/cheque')
					}
				});
			},
			onError: (err) => {
				if (err.status == 453) {
					pushAlert({
						type: 'error',
						messageText: err.detail,
						hasConfirmAction: true,
						actions: {
							onCloseModal: () => navigate('/cheque'),
							onConfirm: () => navigate('/cheque')
						}
					});
				}
				pushAlert({ type: 'error', messageText: err.detail, hasConfirmAction: true });
			}
		});
	};
	const handleSendAgain = () => {
		CheckInitiateOtpMutate(
			{ issueChequeKey: activationKey },
			{
				onSuccess: (response) => {
					pushAlert({
						type: 'info',
						messageText: response.message,
						hasConfirmAction: true
					});
				},
				onError: (err) => {
					pushAlert({ type: 'error', messageText: err.detail, hasConfirmAction: true });
				}
			}
		);
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
							<Title>{t('activationElCheck')}</Title>
							{!matches ? (
								<Stepper
									list={[
										t('selectCheck'),
										t('checkInfo'),
										t('recivers'),
										t('activationCode'),
										t('end')
									]}
									active={3}
								/>
							) : null}

							<Grid
								container
								flexWrap={'nowrap'}
								gap={'8px'}
							>
								<SvgToIcon
									icon={infoIcon}
									alt="info"
								/>
								<Typography
									variant="body1"
									sx={{ marginBottom: '8px' }}
								>
									{t('reciveOptText')}
								</Typography>
							</Grid>
							<Grid
								container
								alignItems={'baseline'}
							>
								<Controller
									name="otpCode"
									control={control}
									render={({ field }) => (
										<InputAdapter
											inputProps={max}
											isRequired
											label={t('activationCodeOtp')}
											onChange={(value) => field.onChange(value)}
											type="number"
											error={!!formState?.errors?.otpCode}
											helperText={formState?.errors?.otpCode?.message}
										/>
									)}
								/>
							</Grid>
							<Grid
								container
								alignItems={'baseline'}
							>
								{/* TODO add timer */}
								<Typography
									sx={{ margin: '0 24px' }}
									hidden={!IsCountDownTimerCounting}
								>
									زمان باقی مانده
									<CountDownTimer
										timerInSeconds={20}
										onCountDownStarted={() => {
											setIsCountDownTimerCounting(true);
										}}
										onCountDownEnded={() => {
											setIsCountDownTimerCounting(false);
										}}
									/>
								</Typography>
								<ButtonAdapter
									onClick={handleSendAgain}
									disabled={!IsSendAgain}
								>
									{t('sendAgain')}
									<span>
										<SvgToIcon
											icon={sendAaginIcon}
											alt="send again"
										/>
									</span>
								</ButtonAdapter>
							</Grid>
						</Grid>
						<Grid container>
							<ButtonAdapter
								variant="contained"
								size="medium"
								muiButtonProps={{ sx: { width: '100%' } }}
								onClick={handleSubmitForVerifyOtp(CheckInitiateOtp)}
							>
								{t('continue')}
							</ButtonAdapter>
						</Grid>
					</Grid>
				</BoxAdapter>
			</Grid>
			{matches ? null : (
				<Grid
					md={3}
					dir={theme.direction}
				>
					<BoxAdapter>
						<Menu list={menuList} />
					</BoxAdapter>
				</Grid>
			)}
		</Grid>
	);
}
