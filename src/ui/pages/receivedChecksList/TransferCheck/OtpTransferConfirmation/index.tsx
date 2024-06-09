import resolver from '@Fluentvalidator/extentions/fluentValidationResolver';
import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import infoIcon from 'assets/icon/info-circle.svg';
import TransferChequeVerifyOtpCommand from 'business/application/cheque/transferCheck/TransferChequeVerifyOtp/TransferChequeVerifyOtpCommand';
import useDetectOtpType from 'business/hooks/cheque/transferCheck/useDetectOtpType';
import { pushAlert } from 'business/stores/AppAlertsStore';
import { useChecklistData } from 'business/stores/checklistData/checklistData';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Menu from 'ui/components/Menu';
import Title from 'ui/components/Title';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import Otp from 'ui/htsc-components/Otp';
import Stepper from 'ui/htsc-components/Stepper';
import SvgToIcon from 'ui/htsc-components/SvgToIcon';
import { menuList } from 'ui/pages/HomePage/menuList';
import { paths } from 'ui/route-config/paths';

export default function OtpTransferConfirmation() {
	const theme = useTheme();
	const { t } = useTranslation();
	const navigate = useNavigate();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const { otpTransferRequirments, addNewData } = useChecklistData();
	const { initOtp, verifyOtp } = useDetectOtpType();

	const { data: InitiateOtpRes, mutate: initiateOtp } = initOtp();
	const { mutate: VerifyOtp } = verifyOtp();

	const { handleSubmit, formState, control } = useForm<TransferChequeVerifyOtpCommand>({
		resolver: (values, context, options) => resolver(values, context, options),
		context: TransferChequeVerifyOtpCommand
	});

	useEffect(() => {
		initiateOtpHandler();
	}, []);

	const initiateOtpHandler = () => {
		if (otpTransferRequirments && otpTransferRequirments.transferChequeKey) {
			initiateOtp(
				{ transferChequeKey: otpTransferRequirments.transferChequeKey },
				{
					onError: (err) => {
						pushAlert({ type: 'error', messageText: err.detail, hasConfirmAction: true });
					}
				}
			);
		}
	};

	const VerifyOtpHandler = (data: TransferChequeVerifyOtpCommand) => {
		if (otpTransferRequirments && otpTransferRequirments.transferChequeKey) {
			VerifyOtp(
				{
					otpCode: data.otpCode,
					selectSingleSignatureLegal: true,
					transferChequeKey: otpTransferRequirments.transferChequeKey
				},
				{
					onError: (err) => {
						pushAlert({ type: 'error', messageText: err.detail, hasConfirmAction: true });
					},
					onSuccess: (res) => {
						addNewData({ transferOverview: res });
						navigate(paths.ReceivedChecksList.TransferOverView);
						//TODO:
						//if ('hoghooghi') navigate(paths.ReceivedChecksList.TransferSignatureGroup);
						//if ('haghighi') navigate(paths.ReceivedChecksList.Detail);
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
						<Title>{t('transferCheckEl')}</Title>
							{!matches ? (
								<Stepper
									list={[
										t('checkInfo'),
										t('recivers'),
										t('verificationCode'),
										t('selectSignatureGroup'),
										t('end')
									]}
									active={2}
								/>
							) : null}

							<Grid
								marginBottom={'64px'}
								container
								flexWrap={'nowrap'}
								gap={'8px'}
							>
								<SvgToIcon
									icon={infoIcon}
									alt="info"
								/>
								<Typography
									variant="bodyMd"
									sx={{ marginBottom: '8px' }}
								>
									{t('transferOtpText')}
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
									name="otpCode"
									control={control}
									render={({ field }) => (
										<Otp
											label={t('activationCodeOtp')}
											maxLength={InitiateOtpRes?.codeLength}
											timerInSeconds={InitiateOtpRes?.lifeTime}
											onChange={(value) => field.onChange(value)}
											handleResend={initiateOtpHandler}
											error={!!formState?.errors?.otpCode}
											helperText={formState?.errors?.otpCode?.message}
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
								onClick={handleSubmit(VerifyOtpHandler)}
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
			)}
		</Grid>
	);
}
