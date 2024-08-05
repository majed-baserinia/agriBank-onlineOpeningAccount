import validator from '@Fluentvalidator/extentions/fluentValidationResolver';
import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import InquiryGNAFForCardCommand from 'business/application/onlineOpenAccount/InquiryGNAFForCard/InquiryGNAFForCardCommand';
import RequestCardCommand from 'business/application/onlineOpenAccount/RequestCard/RequestCardCommand';
import useInquiryGNAFForCard from 'business/hooks/useInquiryGNAFForCard';
import useProvinces from 'business/hooks/useProvinces';
import useRequestCard from 'business/hooks/useRequestCard';
import { pushAlert } from 'business/stores/AppAlertsStore';
import { useDataSteps } from 'business/stores/onlineOpenAccount/dataSteps';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Title from 'ui/components/Title';
import BottomSheetSelect from 'ui/htsc-components/BottomSheetSelect';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import InputAdapter from 'ui/htsc-components/InputAdapter';
import Loader from 'ui/htsc-components/loader/Loader';
import RadioButtonAdapter from 'ui/htsc-components/RadioButtonAdapter';
import TextareaAdapter from 'ui/htsc-components/TextareaAdapter';
import { paths } from 'ui/route-config/paths';

export default function SelectAddress() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const { locationInfo, token } = useDataSteps();

	const [showNewAddressForm, setShowNewAddressForm] = useState(false);
	const { data: provinces, mutate: getProvinces, isLoading: isLoadingProvinces } = useProvinces();
	const { mutate: requestCard, isLoading: isLoadingRequestCard } = useRequestCard();
	const {
		data: newAddressForPostalCode,
		mutate: InquiryGNAFForCard,
		isLoading: isLoadingInquiryGNAFForCard
	} = useInquiryGNAFForCard();

	const address = `${locationInfo?.village} ${locationInfo?.mainStreet} ${locationInfo?.alley} `;

	const listOfOptions = [
		{ value: 'myLocation', label: 'sendMyLocationTitle', subLabel: address, sx: { order: 1 } },
		{ value: 'otherLocation', label: 'sendOtherLocationTitle', sx: { order: 2 } }
	];

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

	const { handleSubmit: handleInquiryPostalCode, control: controlPostalCode,getValues:getValuesFromInquiry } = useForm<InquiryGNAFForCardCommand>({
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
				cardPostalCode: getValuesFromInquiry("postalCode"),
				requestCard:true,
				cardPatternId: 0,
				identifierValue: '',
				sameHomeAddressForCard: true,
				token: token!
			},
			{
				onSuccess: () => {
					navigate(paths.nationalCardImage);
				}
			}
		);
	};


    const handleSubmitWithDefaultAddress = ()=>{
        
    }
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
									{t('selectAddressPageTitleText')}
								</Typography>
							</Grid>

							<Grid>
								<RadioButtonAdapter
									layoutColumns={matches ? 1 : 2}
									listOfOptions={listOfOptions}
									onChange={handleRadioChange}
									variant="backgroundSelected"
									defaultValue="myLocation"
								/>
							</Grid>
							{showNewAddressForm ? (
								<Grid
									container
									direction={'column'}
									gap={16}
									sx={{ marginTop: '32px' }}
								>
									<Grid>
										<Controller
											control={control}
											name="cityId"
											render={({ field }) => (
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
														field.onChange(Number(selectedProvince.value));
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
																setValue('cardAddress', data.address);
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
			{/* {matches ? null : (
				<Grid
				item
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
			)} */}
			<Loader showLoader={false} />
		</Grid>
	);
}
