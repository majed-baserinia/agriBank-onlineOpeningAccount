import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';

import validator from '@Fluentvalidator/extentions/fluentValidationResolver';
import CreateAuthRequestCommand from 'business/application/onlineOpenAccount/CreateAuthRequest/CreateAuthRequestCommand';
import { sendPostmessage } from 'business/hooks/postMessage/useInitPostMessage';
import useAccountsList from 'business/hooks/useAccountsList';
import useCreateAuthRequest from 'business/hooks/useCreateAuthRequest';
import { pushAlert } from 'business/stores/AppAlertsStore';
import { useDataSteps } from 'business/stores/onlineOpenAccount/dataSteps';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import StagesListComp from 'ui/components/StagesListComp';
import BottomSheetSelect from 'ui/htsc-components/BottomSheetSelect';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import DatePickerAdapter from 'ui/htsc-components/DatePickerAdapter';
import InputAdapter from 'ui/htsc-components/InputAdapter';
import Loader from 'ui/htsc-components/loader/Loader';
import Stepper from 'ui/htsc-components/Stepper';
import { paths } from 'ui/route-config/paths';
import { stagesList } from '../HomePage';

export default function PersonalInfoPage() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const matchesInfo = useMediaQuery(theme.breakpoints.down('lg'));
	const { addNewData, otl } = useDataSteps();

	const [accountCode, setAccountCode] = useState('');

	const { data: accountsList, mutate: getAccountsList, isLoading: isLoadingGettingAccounts } = useAccountsList();
	const {
		mutate: createAuthRequest,
		isLoading: isLoadingCreateAuthRequest,
		isSuccess
	} = useCreateAuthRequest();

	const { handleSubmit, control, reset, formState } = useForm<CreateAuthRequestCommand>({
		resolver: (values, context, options) => {
			return validator(values, context, options);
		},
		context: CreateAuthRequestCommand
	});

	useEffect(() => {
		getAccountsList(
			{ requestTypeId: 0 },
			{
				onError: () => {
					pushAlert({
						type: 'error',
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
	}, []);

	useEffect(() => {
		const savedData = localStorage.getItem('dataSteps');
		if (savedData) {
			const dataSteps = JSON.parse(savedData);
			setAccountCode(dataSteps.personalInfo?.accountCode);
			reset({ ...dataSteps.personalInfo });
		}
	}, []);

	const submitHandler = (data: CreateAuthRequestCommand) => {
		createAuthRequest(
			{ ...data, oneTimeLinkCode: otl },
			{
				onSuccess: (res) => {
					addNewData({ personalInfo: { ...data, accountCode: accountCode } });
					navigate(paths.otp, { state: { otpTime: res } });
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
								if ((err.error.code as number) === 420) {
									sendPostmessage('isFinishedBack', '');
									// @ts-ignore: Unreachable code error
								} else if ((err.error.code as number) === 401) {
									navigate(paths.Home);
								}
							}
						}
					});
				}
			}
		);
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
									active={0}
								/>
							) : null}
							<Typography
								variant="bodyMd"
								sx={{ marginBottom: '8px' }}
							>
								{t('personalInfoPageTitleText')}
							</Typography>
							<Grid
								container
								direction={'row'}
								spacing={'16px'}
							>
								<Grid
									item
									xs={12}
									sm={12}
									md={6}
									lg={6}
									xl={6}
									sx={{ order: { xs: 1, sm: 1, md: 1, lg: 1, xl: 1 } }}
								>
									<Controller
										control={control}
										name="accountTypeId"
										render={({ field }) => (
											<BottomSheetSelect
												defaultValue={field?.value?.toString()}
												isRequired
												list={
													accountsList?.data?.map((acc) => ({
														value: acc.id,
														name: acc.title,
														additionalData: acc.code
													})) || []
												}
												label={t('account')}
												onChange={(selectedDeposite) => {
													field.onChange(Number(selectedDeposite.value));
													setAccountCode(selectedDeposite.additionalData);
												}}
												error={!!formState.errors.accountTypeId?.message}
												helperText={formState.errors.accountTypeId?.message}
											/>
										)}
									/>
								</Grid>
								<Grid
									item
									xs={12}
									sm={12}
									md={6}
									lg={6}
									xl={6}
									sx={{ order: { xs: 2, sm: 2, md: 2, lg: 2, xl: 2 } }}
								>
									<Controller
										control={control}
										name="mobile"
										render={({ field }) => (
											<InputAdapter
												defaultValue={field?.value}
												isRequired
												type="number"
												label={t('phoneNumber')}
												onChange={(value) => field.onChange(value)}
												error={!!formState.errors.mobile?.message}
												helperText={formState.errors.mobile?.message}
											/>
										)}
									/>
								</Grid>
								<Grid
									item
									xs={12}
									sm={12}
									md={6}
									lg={6}
									xl={6}
									sx={{ order: { xs: 3, sm: 3, md: 3, lg: 3, xl: 3 } }}
								>
									<Controller
										control={control}
										name="nationalCode"
										render={({ field }) => (
											<InputAdapter
												defaultValue={field?.value}
												isRequired
												type="number"
												label={t('nationalCode')}
												onChange={(value) => field.onChange(value)}
												error={!!formState.errors.nationalCode?.message}
												helperText={formState.errors.nationalCode?.message}
											/>
										)}
									/>
								</Grid>
								<Grid
									item
									xs={12}
									sm={12}
									md={6}
									lg={6}
									xl={6}
									sx={{ order: { xs: 4, sm: 4, md: 4, lg: 4, xl: 4 } }}
								>
									<Controller
										control={control}
										name="nationalCodeSerial"
										render={({ field }) => (
											<InputAdapter
												defaultValue={field?.value}
												isRequired
												label={t('nationalCodeSerial')}
												onChange={(value) => field.onChange(value)}
												error={!!formState.errors.nationalCodeSerial?.message}
												helperText={formState.errors.nationalCodeSerial?.message}
											/>
										)}
									/>
								</Grid>
								<Grid
									item
									xs={12}
									sm={12}
									md={6}
									lg={6}
									xl={6}
									sx={{ order: { xs: 5, sm: 5, md: 5, lg: 5, xl: 5 } }}
								>
									<Controller
										control={control}
										name="birthDate"
										render={({ field }) => (
											<DatePickerAdapter
												isRequired
												defaultValue={field?.value}
												label={t('birthDate')}
												onChange={(value) => field.onChange(value)}
												error={!!formState.errors.birthDate?.message}
												helperText={formState.errors.birthDate?.message}
											/>
										)}
									/>
								</Grid>
								<Grid
									item
									xs={12}
									sm={12}
									md={6}
									lg={6}
									xl={6}
									sx={{ order: { xs: 6, sm: 6, md: 6, lg: 6, xl: 6 } }}
								>
									<Controller
										control={control}
										name="identityIssueDate"
										render={({ field }) => (
											<DatePickerAdapter
												isRequired
												defaultValue={field?.value}
												label={t('identityIssueDate')}
												onChange={(value) => field.onChange(value)}
												error={!!formState.errors.identityIssueDate?.message}
												helperText={formState.errors.identityIssueDate?.message}
											/>
										)}
									/>
								</Grid>
							</Grid>
						</Grid>
						<Grid container>
							<ButtonAdapter
								disabled={isLoadingCreateAuthRequest || isSuccess}
								variant="contained"
								size="medium"
								muiButtonProps={{ sx: { width: '100%', marginTop: '20px' } }}
								onClick={handleSubmit(submitHandler)}
							>
								{t('checkAndContinue')}
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
			<Loader showLoader={isLoadingGettingAccounts || isLoadingCreateAuthRequest} />
		</Grid>
	);
}
