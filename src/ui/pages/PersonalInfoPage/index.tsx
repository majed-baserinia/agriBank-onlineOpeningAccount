import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';

import validator from '@Fluentvalidator/extentions/fluentValidationResolver';
import CreateAuthRequestCommand from 'business/application/onlineOpenAccount/CreateAuthRequest/CreateAuthRequestCommand';
import useAccountsList from 'business/hooks/useAccountsList';
import useCreateAuthRequest from 'business/hooks/useCreateAuthRequest';
import { pushAlert } from 'business/stores/AppAlertsStore';
import { useDataSteps } from 'business/stores/onlineOpenAccount/dataSteps';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Title from 'ui/components/Title';
import BottomSheetSelect from 'ui/htsc-components/BottomSheetSelect';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import DatePickerAdapter from 'ui/htsc-components/DatePickerAdapter';
import InputAdapter from 'ui/htsc-components/InputAdapter';
import Loader from 'ui/htsc-components/loader/Loader';
import { paths } from 'ui/route-config/paths';

export default function PersonalInfoPage() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const { addNewData } = useDataSteps();

	const [accountCode, setAccountCode] = useState('');

	const { data: accountsList, mutate: getAccountsList, isLoading: isLoadingGettingAccounts } = useAccountsList();
	const { mutate: createAuthRequest, isLoading: isLoadingCreateAuthRequest } = useCreateAuthRequest();

	const { handleSubmit, control, reset } = useForm<CreateAuthRequestCommand>({
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
			reset({ ...dataSteps.personalInfo, accountCode: undefined });
		}
	}, []);

	const submitHandler = (data: CreateAuthRequestCommand) => {
		createAuthRequest(
			{ ...data },
			{
				onSuccess: (res) => {
					addNewData({ personalInfo: { ...data, accountCode: accountCode } });
					navigate(paths.otp, { state: { otpTime: res.otpTime } });
				},
				onError: (err) => {
					pushAlert({
						type: 'error',
						// TODO: needs to refactor but when? first backend needs to change it and give us the new version of the api
						// @ts-ignore: Unreachable code error
						messageText: err.error ? (err.error.message as string) : err.detail,
						hasConfirmAction: true
					});
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

							<Typography
								variant="bodyMd"
								sx={{ marginBottom: '8px' }}
							>
								{t('personalInfoPageTitleText')}
							</Typography>
							<Grid
								container
								direction={'column'}
								gap={'16px'}
							>
								<Grid>
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
												// error={!!formState.errors.accountTypeId?.message}
												// helperText={formState.errors.accountTypeId?.message}
											/>
										)}
									/>
								</Grid>
								<Grid>
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
												// error={!!formState.errors.mobile?.message}
												// helperText={formState.errors.mobile?.message}
											/>
										)}
									/>
								</Grid>
								<Grid>
									<Controller
										control={control}
										name="nationalCodeSerial"
										render={({ field }) => (
											<InputAdapter
												defaultValue={field?.value}
												isRequired
												label={t('nationalCodeSerial')}
												onChange={(value) => field.onChange(value)}
												// error={!!formState.errors.nationalCodeSerial?.message}
												// helperText={formState.errors.nationalCodeSerial?.message}
											/>
										)}
									/>
								</Grid>
								<Grid>
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
												// error={!!formState.errors.nationalCode?.message}
												// helperText={formState.errors.nationalCode?.message}
											/>
										)}
									/>
								</Grid>
								<Grid>
									<Controller
										control={control}
										name="birthDate"
										render={({ field }) => (
											<DatePickerAdapter
												defaultValue={field?.value}
												placeHolder={t('birthDate')}
												onChange={(value) => field.onChange(value)}
												// error={!!formState.errors.birthDate?.message}
												// helperText={formState.errors.birthDate?.message}
											/>
										)}
									/>
								</Grid>
								<Grid>
									<Controller
										control={control}
										name="identityIssueDate"
										render={({ field }) => (
											<DatePickerAdapter
												defaultValue={field?.value}
												placeHolder={t('identityIssueDate')}
												onChange={(value) => field.onChange(value)}
												// error={!!formState.errors.identityIssueDate?.message}
												// helperText={formState.errors.identityIssueDate?.message}
											/>
										)}
									/>
								</Grid>
							</Grid>
						</Grid>
						<Grid container>
							<ButtonAdapter
								variant="contained"
								size="medium"
								muiButtonProps={{ sx: { width: '100%' } }}
								onClick={handleSubmit(submitHandler)}
							>
								{t('checkAndContinue')}
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
			<Loader showLoader={isLoadingGettingAccounts || isLoadingCreateAuthRequest} />
		</Grid>
	);
}
