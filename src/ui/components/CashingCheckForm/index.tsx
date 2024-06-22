import fluentValidationResolver from '@Fluentvalidator/extentions/fluentValidationResolver';
import { Grid, Typography, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import SelectAdapter from 'ui/htsc-components/SelectAdapter';
import MenuItem from '../Menu/MenuItem';

export default function CashingCheckForm() {
	const { t } = useTranslation();
	const theme = useTheme();

	const { control, formState, getValues, handleSubmit } = useForm({
		resolver: (values, context, options) => {
			return fluentValidationResolver(values, context, options);
		}
	});

	return (
		<div>
			{/* <Grid
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
						onChange={(selectedValue) => {}}
						label={t('accountsList')}
						renderValue
					>
						{[]?.map((item, index) => {
							return (
								<MenuItem
									key={index}
									style={{ margin: '10px 0' }}
									value={'item.accountNumber'}
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
					<SelectAdapter
						disabled={!selectedCheckbook}
						onChange={() => {}}
						label={t('checkSheet')}
						renderValue
					>
						<ChipWrapperForSelect>
											<ChipAdapter
												label={t('all')}
												onClick={(e) => {}}
											/>
											<ChipAdapter
												label={t('whiteCheck')}
												onClick={(e) => {}}
												checked
											/>
											<ChipAdapter
												label={t('issuedCheck')}
												onClick={(e) => {}}
											/>
										</ChipWrapperForSelect> 
						{checksheets?.map((sheet, index) => {
							return (
								<MenuItem
									key={index}
									value={sheet.sayadNo}
									onClick={(e) => {
										setSelectedChecksheet(sheet);
									}}
									sx={{
										border: `1px solid ${theme.palette.grey[50]}`,
										borderRadius: '16px',
										margin: '16px',
										'&:hover': {
											backgroundColor: 'unset',
											border: `2px solid ${theme.palette.primary.main}`
										}
									}}
								>
									<Grid
										container
										direction={'column'}
										justifyContent={'center'}
										spacing={'8px'}
										sx={{ padding: '16px' }}
										gap={'8px'}
									>
										<Typography
											variant="bodyMd"
											fontWeight={'bold'}
										>
											{t('sayadNumber')}:{sheet.sayadNo}
										</Typography>
										<Typography
											variant="bodyXs"
											fontWeight={'medium'}
										>
											{t('series')}:{sheet.chequeFrom} | {t('serial')}:{sheet.chequeTo}
										</Typography>
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
					sx={{ order: { xs: 2, sm: 2, md: 2, lg: 2, xl: 2 } }}
				>
					<SelectAdapter
						disabled={!selectedAccountNumber}
						onChange={() => {}}
						label={t('checkbook')}
						renderValue
					>
						{checkbooks?.map((checkbook, index) => {
							return (
								<MenuItem
									key={index}
									value={checkbook.chequeTo}
									onClick={(e) => {
										const selectedCheckbook = {
											accountNumber: selectedAccountNumber,
											startChequeNo: checkbook.chequeFrom,
											endChequeNo: checkbook.chequeTo
										};
										setSelectedCheckbook(selectedCheckbook);
										getChecksheets(selectedCheckbook);
									}}
									sx={{
										border: `1px solid ${theme.palette.grey[50]}`,
										borderRadius: '16px',
										margin: '16px',
										'&:hover': {
											backgroundColor: 'unset',
											border: `2px solid ${theme.palette.primary.main}`
										}
									}}
								>
									<Grid
										container
										direction={'column'}
										justifyContent={'center'}
										spacing={'8px'}
										sx={{ padding: '16px' }}
										gap={'8px'}
									>
										<Typography
											variant="bodyMd"
											fontWeight={'bold'}
										>
											{t('checkbookNumber')}:{checkbook.chequeTo}
										</Typography>
										<Typography
											variant="bodyXs"
											fontWeight={'medium'}
										>
											{t('issueDate')}:{checkbook.issueDate} | {t('expireDate')}:
											{checkbook.expiryDate}
										</Typography>
									</Grid>
								</MenuItem>
							);
						})}
					</SelectAdapter>
				</Grid>
			</Grid> */}
		</div>
	);
}
