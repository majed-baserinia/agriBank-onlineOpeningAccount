import validator from '@Fluentvalidator/extentions/fluentValidationResolver';
import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import InquiryGNAFForCardCommand from 'business/application/onlineOpenAccount/InquiryGNAFForCard/InquiryGNAFForCardCommand';
import RequestCardCommand from 'business/application/onlineOpenAccount/RequestCard/RequestCardCommand';
import useCities from 'business/hooks/useCities';
import useInquiryGNAFForCard from 'business/hooks/useInquiryGNAFForCard';
import useProvinces from 'business/hooks/useProvinces';
import useRequestCard from 'business/hooks/useRequestCard';
import { pushAlert } from 'business/stores/AppAlertsStore';
import { useDataSteps } from 'business/stores/onlineOpenAccount/dataSteps';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import StagesListComp from 'ui/components/StagesListComp';
import BottomSheetSelect from 'ui/htsc-components/BottomSheetSelect';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import InputAdapter from 'ui/htsc-components/InputAdapter';
import Loader from 'ui/htsc-components/loader/Loader';
import RadioButtonAdapter from 'ui/htsc-components/RadioButtonAdapter';
import Stepper from 'ui/htsc-components/Stepper';
import TextareaAdapter from 'ui/htsc-components/TextareaAdapter';
import { paths } from 'ui/route-config/paths';
import { stagesList } from '../HomePage';
import { usePreventNavigate } from 'business/hooks/usePreventNavigate';

export default function SelectAddressPage() {
	const { t } = useTranslation();
	const location = useLocation()
	const { navigate } = usePreventNavigate({ condition: () => !location.state.canGoBack });
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const { locationInfo, token, selectedCardData } = useDataSteps();
	const [preventNextStep, setPreventNextStep] = useState(false);

	const [showNewAddressForm, setShowNewAddressForm] = useState(false);
	const addressRef = useRef(`${locationInfo?.village} ${locationInfo?.mainStreet} ${locationInfo?.alley} `);
	const listOfOptions = useRef([
		{ value: 'myLocation', label: 'sendMyLocationTitle', subLabel: addressRef.current, sx: { order: 1 } },
		{ value: 'otherLocation', label: 'sendOtherLocationTitle', sx: { order: 2 } }
	]);

	const { data: provinces, mutate: getProvinces, isLoading: isLoadingProvinces } = useProvinces();
	const { data: cities, mutate: getCities, isLoading: isLoadingCities } = useCities();
	const { mutate: requestCard, isLoading: isLoadingRequestCard } = useRequestCard();
	const { mutate: InquiryGNAFForCard, isLoading: isLoadingInquiryGNAFForCard } = useInquiryGNAFForCard();

	useEffect(() => {
		getProvinces(
			{},
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

	const handlProvinceChahange = (provinceId: number) => {
		getCities(
			{ provinceId: provinceId },
			{
				onError: (err) => {
					pushAlert({
						type: 'error',
						messageText: err.detail,
						hasConfirmAction: true
					});
				}
			}
		);
	};

	const handleRadioChange = (value: string) => {
		if (value === 'otherLocation') {
			setShowNewAddressForm(true);
		} else {
			setShowNewAddressForm(false);
		}
	};

	const { handleSubmit, control, setValue } = useForm<RequestCardCommand>({
		resolver: (values, context, options) => {
			return validator(values, context, options);
		},
		context: RequestCardCommand
	});

	const {
		handleSubmit: handleInquiryPostalCode,
		control: controlPostalCode,
		getValues: getValuesFromInquiry
	} = useForm<InquiryGNAFForCardCommand>({
		resolver: (values, context, options) => {
			return validator(values, context, options);
		},
		context: InquiryGNAFForCardCommand
	});

	const handleSubmitWithNewAddress = (data: RequestCardCommand) => {
		requestCard(
			{
				cardAddress: data.cardAddress,
				cityId: data.cityId,
				cardPostalCode: getValuesFromInquiry('postalCode'),
				requestCard: true,
				cardPatternId: selectedCardData!.cardPatternId,
				identifierValue: '',
				sameHomeAddressForCard: false,
				token: token!
			},
			{
				onSuccess: () => {
					navigate(paths.nationalCardImage);
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

	const handleSubmitWithDefaultAddress = () => {
		requestCard(
			{
				cardAddress: addressRef.current,
				cityId: locationInfo!.cityId,
				cardPostalCode: locationInfo!.postalCode,
				requestCard: true,
				cardPatternId: selectedCardData!.cardPatternId,
				identifierValue: '',
				sameHomeAddressForCard: true,
				token: token!
			},
			{
				onSuccess: () => {
					navigate(paths.nationalCardImage);
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
									active={6}
								/>
							) : null}
							<Grid
								marginBottom={'64px'}
								container
								flexWrap={'nowrap'}
								direction={'column'}
								gap={'8px'}
							>
								<Typography variant="bodyMd">{t('selectAddressPageTitleText')}</Typography>
								<Grid>
									<RadioButtonAdapter
										layoutColumns={matches ? 1 : 2}
										listOfOptions={listOfOptions.current}
										onChange={handleRadioChange}
										variant="backgroundSelected"
										defaultValue="myLocation"
									/>
								</Grid>
							</Grid>

							{showNewAddressForm ? (
								<Grid
									container
									direction={'column'}
									gap={16}
								>
									<Grid>
										<BottomSheetSelect
											isRequired
											list={
												provinces?.data.map((province) => ({
													value: province.id,
													name: province.title
												})) || []
											}
											label={t('province')}
											onChange={(selectedProvince) => {
												handlProvinceChahange(Number(selectedProvince.value));
											}}
											// error={!!formState.errors.cityId?.message}
											// helperText={formState.errors.cityId?.message}
										/>
									</Grid>
									<Grid>
										<Controller
											control={control}
											name="cityId"
											render={({ field }) => (
												<BottomSheetSelect
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
													// error={!!formState.errors.cityId?.message}
													// helperText={formState.errors.cityId?.message}
												/>
											)}
										/>
									</Grid>
									<Grid
										container
										gap={8}
										alignItems={'center'}
									>
										<Grid sx={{ flex: 1 }}>
											<Controller
												control={controlPostalCode}
												name="postalCode"
												render={({ field }) => (
													<InputAdapter
														isRequired
														type="number"
														label={t('postalCode')}
														onChange={(value) => field.onChange(value)}
														// error={!!formState.errors.postalCode?.message}
														// helperText={formState.errors.postalCode?.message}
													/>
												)}
											/>
										</Grid>
										<Grid sx={{ flex: 1 }}>
											<ButtonAdapter
												variant="outlined"
												size="medium"
												muiButtonProps={{ sx: { width: '100%' } }}
												onClick={handleInquiryPostalCode((values) => {
													InquiryGNAFForCard(
														{
															postalCode: values.postalCode,
															token: token!
														},
														{
															onSuccess: (data) => {
																setPreventNextStep(false);
																setValue('cardAddress', data.address);
															},
															onError: (err) => {
																// @ts-ignore: Unreachable code error
																if (err.error.code === 410) {
																	//set button disable
																	setPreventNextStep(true);
																} else {
																	setPreventNextStep(false);
																}
																pushAlert({
																	type: 'error',
																	// TODO: needs to refactor but when? first backend needs to change it and give us the new version of the api
																	// @ts-ignore: Unreachable code error
																	messageText: err.error
																		? // @ts-ignore: Unreachable code error
																			(err.error.message as string)
																		: err.detail,
																	hasConfirmAction: true
																});
															}
														}
													);
												})}
											>
												{t('inquiry')}
											</ButtonAdapter>
										</Grid>
									</Grid>
									<Grid>
										<Controller
											control={control}
											name="cardAddress"
											render={({ field }) => (
												<TextareaAdapter
													defaultValue={field.value}
													isRequired
													label={t('address')}
													onChange={(value) => field.onChange(value)}
												/>
											)}
										/>
									</Grid>
								</Grid>
							) : null}
						</Grid>
						<Grid container>
							<ButtonAdapter
								disabled={preventNextStep}
								variant="contained"
								size="medium"
								muiButtonProps={{ sx: { width: '100%', marginTop: '16px' } }}
								onClick={
									showNewAddressForm
										? handleSubmit(handleSubmitWithNewAddress)
										: handleSubmitWithDefaultAddress
								}
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
			<Loader
				showLoader={
					isLoadingCities || isLoadingInquiryGNAFForCard || isLoadingProvinces || isLoadingRequestCard
				}
			/>
		</Grid>
	);
}
