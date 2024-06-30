import { Grid, MenuItem, Typography, useTheme } from '@mui/material';
import keshavarzi from 'assets/icon/Banks/Color/Keshavarzi.svg';
import useAccounts from 'business/hooks/cheque/Digital Cheque/useAccounts';
import useAccountsQuery from 'business/hooks/cheque/cashCheque/useAccountsQuery';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import DatePickerAdapter from 'ui/htsc-components/DatePickerAdapter';
import InputAdapter from 'ui/htsc-components/InputAdapter';
import SelectAdapter from 'ui/htsc-components/SelectAdapter';

export default function CashingCheckForm() {
	const { t } = useTranslation();
	const theme = useTheme();
    const { data: AccountData, isLoading} = useAccountsQuery();
	// const { control, formState, getValues, handleSubmit } = useForm<ReceiverInquiryChequeCommand>({
	// 	resolver: (values, context, options) => {
	// 		return fluentValidationResolver(values, context, options);
	// 	},
	// 	context: ReceiverInquiryChequeCommand
	// });


    
	return (
		<Grid
			container
			spacing={'24px'}
			direction={'row'}
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
				<SelectAdapter
					onChange={(selectedValue) => {
						//setSelectedAccountNumber(selectedValue);
					}}
					label={t('accountsList')}
					renderValue
				>
					{AccountData?.map((item, index) => {
						return (
							<MenuItem
								key={index}
								style={{ margin: '10px 0' }}
								value={item.accountNumber}
							>
								<Grid
									container
									justifyContent={'center'}
									alignItems="Center"
									gap={'5px'}
									wrap="nowrap"
								>
									<Grid sx={{ height: '30px', width: '30px' }}>
										<img
											style={{ width: '100%', height: '100%' }}
											src={keshavarzi}
											alt={'icon'}
										/>
									</Grid>
									<Grid
										container
										direction={'column'}
										alignItems="flex-start"
										gap={'5px'}
									>
										<Typography
											variant="bodyXs"
											color={theme.palette.grey[200]}
										>
											{!item.isShared
												? `${item.owners[0]?.firstName} ${item.owners[0]?.lastName} ${t(
														'curentAccountP'
													)}`
												: t('sharedAccountP')}
										</Typography>

										<Typography variant="bodyMd">{item.accountNumber}</Typography>
									</Grid>
								</Grid>
							</MenuItem>
						);
					})}
				</SelectAdapter>
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
				{/* <Controller
					name="date"
					control={control}
					render={({ field }) => (
						<DatePickerAdapter
							placeHolder={t('date')}
							onChange={(date) => {
								field.onChange(date?.toString());
							}}
							error={!!formState?.errors?.date}
							//helperText={formState?.errors?.date?.message}
						/>
					)}
				/> */}
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
				{/* <Controller
					name="date"
					control={control}
					render={({ field }) => (
						<InputAdapter
							label="askhi"
							onChange={() => {}}
						/>
					)}
				/> */}
			</Grid>
		</Grid>
	);
}
