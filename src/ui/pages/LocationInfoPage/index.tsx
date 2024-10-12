import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';

import validator from '@Fluentvalidator/extentions/fluentValidationResolver';
import SaveAddressCommand from 'business/application/onlineOpenAccount/SaveAddress/SaveAddressCommand';
import useGetBranches from 'business/hooks/useGetBranches';
import { usePreventNavigate } from 'business/hooks/usePreventNavigate';
import useProvinceAndCities from 'business/hooks/useProvinceAndCities';
import useSaveAddress from 'business/hooks/useSaveAdderss';
import { pushAlert } from 'business/stores/AppAlertsStore';
import { useDataSteps } from 'business/stores/onlineOpenAccount/dataSteps';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import RequestCardBottomSheet from 'ui/components/RequestCardBottomSheet';
import StagesListComp from 'ui/components/StagesListComp';
import AutoCompleteAdapter from 'ui/htsc-components/AutoCompleteAdapter';
import BottomSheetSelect from 'ui/htsc-components/BottomSheetSelect';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import InputAdapter from 'ui/htsc-components/InputAdapter';
import Loader from 'ui/htsc-components/loader/Loader';
import Stepper from 'ui/htsc-components/Stepper';
import { paths } from 'ui/route-config/paths';
import { stagesList } from '../HomePage';
import { Option } from './type';
import useHandlejobs from '../../../business/hooks/useHandleJobs';

export default function LocationInfoPage() {
	const { t } = useTranslation();
	const { navigate } = usePreventNavigate();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const { addNewData, token } = useDataSteps();
	const [openBottomSheet, setOpenBottomSheet] = useState(false);
	const { cities, handlProvinceChahange, isLoading, provinces } = useProvinceAndCities();
	const { handleJobChange, isLoading: jobLoading, jobDetails, jobs } = useHandlejobs();
	const { mutate: saveAddress, isLoading: isLoadingSaveAddress, isSuccess } = useSaveAddress();
	const {
		data: branches,
		mutate: getBranches,
		isLoading: isLoadingGetBranches,
		reset: clearBranches
	} = useGetBranches();

	const { handleSubmit, control, reset, formState } = useForm<SaveAddressCommand>({
		resolver: (values, context, options) => {
			return validator(values, context, options);
		},
		context: SaveAddressCommand
	});

	useEffect(() => {
		const savedData = localStorage.getItem('dataSteps');
		if (savedData) {
			const dataSteps = JSON.parse(savedData);
			reset({ ...dataSteps.locationInfo });
		}
	}, []);

	const handleBranchSearchWithDebounce = useMemo(() => {
		let timeoutId: ReturnType<typeof setTimeout>;

		return (value: string) => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				if (value) {
					getBranches({ branchSearch: value });
				} else {
					clearBranches();
				}
			}, 500);
		};
	}, []);

	const submitHandler = (data: SaveAddressCommand) => {
		addNewData({ locationInfo: data });
		saveAddress(
			{ ...data, token: token! },
			{
				onSuccess: (res) => {
					if (res.isRequestCardPossible) {
						setOpenBottomSheet(true);
					} else {
						navigate(paths.nationalCardImage);
					}
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
						gap={'16px'}
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
							<Grid
								container
								direction={'column'}
								gap={'16px'}
							>
								<Typography variant="bodyMd">{t('branchSelectTitleText')}</Typography>
								<Grid
									item
									xs={12}
									sm={12}
									md={6}
									lg={6}
									xl={6}
								>
									<Controller
										control={control}
										name="branchCode"
										render={({ field }) => (
											<AutoCompleteAdapter
												isRequired
												isOptionEqualToValue={(option: Option, value: Option) =>
													option === value
												}
												label={t('branch')}
												onChange={(val) => {
													if (typeof val !== 'string' && val) {
														field.onChange((val as Option).value);
													}
												}}
												onInputChange={(val) => handleBranchSearchWithDebounce(val)}
												options={branches?.map((branch) => ({
													label: `${branch.cityName} ${branch.branchName}  ${branch.branchCode}`,
													value: branch.branchCode
												}))}
												valueToShowToInput={(option: Option) => ({
													text: option.label
												})}
												loading={isLoadingGetBranches}
												error={!!formState.errors.branchCode?.message}
												helperText={formState.errors.branchCode?.message}
											/>
										)}
									/>
								</Grid>

								<Typography variant="bodyMd">{t('locationInfoTitleText')}</Typography>
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
											name="provinceId"
											render={({ field }) => (
												<BottomSheetSelect
													defaultValue={field?.value?.toString()}
													isRequired
													list={
														provinces?.data.map((province) => ({
															value: province.id,
															name: province.title
														})) || []
													}
													label={t('province')}
													onChange={(selectedProvince) => {
														field.onChange(Number(selectedProvince.value));
														handlProvinceChahange(Number(selectedProvince.value));
													}}
													error={!!formState.errors.provinceId?.message}
													helperText={formState.errors.provinceId?.message}
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
											name="cityId"
											render={({ field }) => (
												<BottomSheetSelect
													defaultValue={field?.value?.toString()}
													isRequired
													list={
														cities?.data?.map((city) => ({
															value: city.id,
															name: city.title
														})) || []
													}
													label={t('city')}
													onChange={(selectedCity) => {
														field.onChange(Number(selectedCity.value));
													}}
													error={!!formState.errors.cityId?.message}
													helperText={formState.errors.cityId?.message}
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
											name="village"
											render={({ field }) => (
												<InputAdapter
													defaultValue={field?.value}
													isRequired
													label={t('village')}
													onChange={(value) => field.onChange(value)}
													error={!!formState.errors.village?.message}
													helperText={formState.errors.village?.message}
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
											name="mainStreet"
											render={({ field }) => (
												<InputAdapter
													defaultValue={field?.value}
													isRequired
													label={t('street')}
													onChange={(value) => field.onChange(value)}
													error={!!formState.errors.mainStreet?.message}
													helperText={formState.errors.mainStreet?.message}
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
											name="alley"
											render={({ field }) => (
												<InputAdapter
													defaultValue={field?.value}
													isRequired
													label={t('alley')}
													onChange={(value) => field.onChange(value)}
													error={!!formState.errors.alley?.message}
													helperText={formState.errors.alley?.message}
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
											name="postalCode"
											render={({ field }) => (
												<InputAdapter
													defaultValue={field?.value}
													isRequired
													type="number"
													label={t('postalCode')}
													onChange={(value) => field.onChange(value)}
													error={!!formState.errors.postalCode?.message}
													helperText={formState.errors.postalCode?.message}
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
										sx={{ order: { xs: 7, sm: 7, md: 7, lg: 7, xl: 7 } }}
									>
										<Controller
											control={control}
											name="phone"
											render={({ field }) => (
												<InputAdapter
													defaultValue={field?.value}
													isRequired
													type="number"
													label={t('phone')}
													onChange={(value) => field.onChange(value)}
													error={!!formState.errors.phone?.message}
													helperText={formState.errors.phone?.message}
												/>
											)}
										/>
									</Grid>
								</Grid>

								<Typography variant="bodyMd">{t('jobInfoTitleText')}</Typography>

								<Grid
									item
									xs={12}
									sm={12}
									md={6}
									lg={6}
									xl={6}
								>
									<BottomSheetSelect
										isRequired
										list={
											jobs?.data?.map((job) => ({
												value: job.id,
												name: job.title
											})) || []
										}
										label={t('jobGroup')}
										onChange={(selectedJob) => {
											handleJobChange(selectedJob);
										}}
										error={!!formState.errors.jobDetailId?.message}
										helperText={formState.errors.jobDetailId?.message}
									/>
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
										control={control}
										name="jobDetailId"
										render={({ field }) => (
											<BottomSheetSelect
												defaultValue={field?.value?.toString()}
												isRequired
												list={
													jobDetails?.data?.map((job) => ({
														value: job.id,
														name: job.title
													})) || []
												}
												label={t('job')}
												onChange={(selectedCity) => {
													field.onChange(Number(selectedCity.value));
												}}
												error={!!formState.errors.jobDetailId?.message}
												helperText={formState.errors.jobDetailId?.message}
											/>
										)}
									/>
								</Grid>
							</Grid>
						</Grid>
						<Grid container>
							<ButtonAdapter
								disabled={isLoadingSaveAddress  || isSuccess}
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
			<Loader showLoader={isLoading || isLoadingSaveAddress || jobLoading} />
			<RequestCardBottomSheet
				open={openBottomSheet}
				setOpen={setOpenBottomSheet}
			/>
		</Grid>
	);
}
