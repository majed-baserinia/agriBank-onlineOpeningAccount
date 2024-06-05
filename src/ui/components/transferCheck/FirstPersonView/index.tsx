import { Grid, useMediaQuery, useTheme } from '@mui/material';
import useGetReasonCodes from 'business/hooks/cheque/Digital Cheque/useGetReasonCodes';
import { useChecklistData } from 'business/stores/checklistData/checklistData';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import CheckOverViewBox from 'ui/components/CheckOverviewBox';
import Title from 'ui/components/Title';
import BottomSheetSelect from 'ui/htsc-components/BottomSheetSelect';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import Stepper from 'ui/htsc-components/Stepper';
import TextareaAdapter from 'ui/htsc-components/TextareaAdapter';

export default function FirstPersonView() {
	const { t } = useTranslation();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const { selectedCheck } = useChecklistData();
	const { data: reasonCodes, isLoading: isPendingtoGetReasons, isError } = useGetReasonCodes();

	const { control, formState } = useForm();

	return (
		<BoxAdapter fullWidth={matches}>
			<Grid
				minHeight={matches ? 'calc(100vh - 64px)' : 'calc(100vh - 192px)'}
				container
				direction={'column'}
				wrap="nowrap"
				justifyContent={'space-between'}
			>
				<Grid
					container
					direction={'column'}
					gap={'16px'}
				>
					<Title>{t('transferCheckEl')}</Title>
					{!matches ? (
						// TODO: check if selected compony or homself acocunt and add one more step if it is compony
						<Stepper
							list={[
								t('checkInfo'),
								t('recivers'),
								t('verificationCode'),
								t('selectSignatureGroup'),
								t('end')
							]}
							active={0}
						/>
					) : null}

					<CheckOverViewBox
						amount={selectedCheck?.amount.toString()}
						sayadNo={selectedCheck?.sayadNo}
					/>
					<Grid
						item
						xs={5}
					>
						<Controller
							name="reason"
							control={control}
							render={({ field }) => (
								<BottomSheetSelect
									isRequired
									label={t('reason')}
									list={
										isPendingtoGetReasons || isError
											? []
											: reasonCodes.map((reason) => ({
													value: reason.reasonCode,
													name: reason.description
												}))
									}
									onChange={(item) => {
										field.onChange(item);
									}}
									error={!!formState?.errors?.reason}
									helperText={formState?.errors?.reason?.message as string}
								/>
							)}
						/>
					</Grid>
					<Grid
						item
						xs={12}
					>
						<Controller
							name="description"
							control={control}
							render={({ field }) => (
								<TextareaAdapter
									onChange={(value) => field.onChange(value)}
									isRequired
									label={t('description')}
									error={!!formState?.errors?.description}
									helperText={'formState?.errors?.description?.message'}
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
						forwardIcon
						onClick={() => console.log()}
					>
						{t('continue')}
					</ButtonAdapter>
				</Grid>
			</Grid>
		</BoxAdapter>
	);
}
