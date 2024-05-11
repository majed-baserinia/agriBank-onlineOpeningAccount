import validator from '@Fluentvalidator/extentions/fluentValidationResolver';
import { Grid, Typography, useTheme } from '@mui/material';
import AddReceiversformValidationCommand from 'business/application/cheque/Digital Cheque/AddReceiversformValidation/AddReceiversformValidationCommand';
import useInqueryNationalId from 'business/hooks/cheque/Digital Cheque/useInqueryNationalId';
import { pushAlert } from 'business/stores/AppAlertsStore';
import { useDataSteps } from 'business/stores/issueCheck/dataSteps';
import { SetStateAction, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import CheckboxAdapter from 'ui/htsc-components/CheckboxAdapter';
import InputAdapter from 'ui/htsc-components/InputAdapter';

export default function AddForm({ setOpen }: { setOpen: (value: SetStateAction<boolean>) => void }) {
	const theme = useTheme();
	const { t } = useTranslation();
	const { addReceiver } = useDataSteps((store) => store);
	const { data: inqueriedData, isLoading, mutate: inqueryNationalId } = useInqueryNationalId();

	const [personal, setPersonal] = useState(true);
	const [checkedForeigner, setCheckedForeigner] = useState(false);

	const { control, formState, getValues, handleSubmit, reset } = useForm<AddReceiversformValidationCommand>({
		resolver: (values, context, options) => {
			return validator(values, context, options);
		},
		defaultValues: {
			name: '',
			nationalNo: '',
			shahabNo: ''
		},
		context: AddReceiversformValidationCommand
	});

	const handleAdd = () => {
		//save the data of the person
		addReceiver({ ...getValues(), customerType: detectCustomerType(personal, checkedForeigner) });

		//reset the form
		reset();

		//clode the modal
		setOpen(false);
	};

	const handleInquery = () => {
		//call api for inquery
		const { nationalNo } = getValues();
		inqueryNationalId(
			{ nationalId: nationalNo },
			{
				onError: (err) => {
					pushAlert({ type: 'error', messageText: err.detail, hasConfirmAction: true });
				},
				onSuccess: () => {
					//set the response to form
				}
			}
		);
	};

	const activeButtonStyle = {
		backgroundColor: theme.palette.primary.main,
		color: 'white'
	};

	return (
		<Grid
			sx={{ padding: '16px' }}
			container
			direction={'column'}
			gap={'16px'}
		>
			<Typography variant="body2">{t('addRecieverDataText')}</Typography>
			<Grid
				container
				sx={{
					borderRadius: '8px',
					width: '100%',
					padding: '4px',
					backgroundColor: theme.palette.primary[50],
					cursor: 'pointer'
				}}
			>
				<Grid
					sx={{
						width: '50%',
						padding: '10px 0',
						textAlign: 'center',
						borderRadius: '8px',
						color: theme.palette.primary.main,
						...(personal ? activeButtonStyle : null)
					}}
					onClick={() => setPersonal(true)}
				>
					{t('personal')}
				</Grid>
				<Grid
					sx={{
						color: theme.palette.primary.main,
						width: '50%',
						padding: '10px 5px',
						textAlign: 'center',
						borderRadius: '8px',
						...(!personal ? activeButtonStyle : null)
					}}
					onClick={() => setPersonal(false)}
				>
					{t('corporate')}
				</Grid>
			</Grid>
			<Grid>
				<Grid
					container
					direction={'column'}
					gap={'16px'}
				>
					<Grid
						container
						gap={'8px'}
						justifyContent={'center'}
						alignItems={'baseline'}
					>
						<Controller
							control={control}
							name="nationalNo"
							render={({ field }) => {
								return (
									<InputAdapter
										sx={{ flex: 1 }}
										label={personal ? t('personalIDOrUniversalID') : t('companyLegalID')}
										isRequired
										type="number"
										defaultValue={field.value}
										onChange={(value) => {
											field.onChange(value);
										}}
										error={!!formState.errors.nationalNo?.message}
										helperText={formState.errors.nationalNo?.message}
									/>
								);
							}}
						/>
						<ButtonAdapter
							variant="outlined"
							onClick={() => handleInquery()}
							muiButtonProps={{ sx: { borderRadius: '16px' } }}
							disabled={isLoading}
						>
							{t('inquiry')}
						</ButtonAdapter>
					</Grid>
					<Controller
						control={control}
						name="name"
						render={({ field }) => {
							return (
								<InputAdapter
									sx={{ flex: 1 }}
									type="text"
									label={personal ? t('first&lastName') : t('companyName')}
									isRequired
									defaultValue={field.value}
									onChange={(value) => field.onChange(value)}
									error={!!formState.errors.name?.message}
									helperText={formState.errors.name?.message}
								/>
							);
						}}
					/>
					<Controller
						control={control}
						name="shahabNo"
						render={({ field }) => {
							return (
								<InputAdapter
									type="number"
									sx={{ flex: 1 }}
									label={t('optionalShahab')}
									defaultValue={field.value}
									onChange={(value) => field.onChange(value)}
									error={!!formState.errors.shahabNo?.message}
									helperText={formState.errors.shahabNo?.message}
								/>
							);
						}}
					/>

					<CheckboxAdapter
						label={t('freignerLable')}
						onChange={(checked) => setCheckedForeigner(checked)}
						checked={checkedForeigner}
					/>

					<ButtonAdapter
						variant="contained"
						onClick={handleSubmit(handleAdd)}
					>
						{t('add')}
					</ButtonAdapter>
				</Grid>
			</Grid>
		</Grid>
	);
}

const detectCustomerType = (personal: boolean, checkedForeigner: boolean): 1 | 2 | 3 | 4 => {
	if (personal) {
		return checkedForeigner ? 3 : 1;
	} else {
		return checkedForeigner ? 4 : 2;
	}
};
