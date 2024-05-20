import { Grid, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Menu from 'ui/components/Menu';
import Title from 'ui/components/Title';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import Stepper from 'ui/htsc-components/Stepper';

import { useEffect } from 'react';
import CheckOverViewBox from 'ui/components/CheckOverviewBox';
import Loader from 'ui/htsc-components/loader/Loader';
import { menuList } from 'ui/pages/HomePage/menuList';
import { Controller, useForm } from 'react-hook-form';
import TextareaAdapter from 'ui/htsc-components/TextareaAdapter';
import BottomSheetSelect from 'ui/htsc-components/BottomSheetSelect';
import useGetReasonCodes from 'business/hooks/cheque/Digital Cheque/useGetReasonCodes';

export default function CheckNewInfo() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const { data: reasonCodes, isLoading: isPendingtoGetReasons } = useGetReasonCodes();

const {control, formState} = useForm()
	useEffect(() => {
		//first check if there is ze naf a
		//act based on it
		//get the check data
	}, []);

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
						<Grid
							container
							direction={'column'}
							gap={'16px'}
						>
							<Title>{t('activationElCheck')}</Title>
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
							<CheckOverViewBox />
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
												list={[]
													// isPendingtoGetReasons
													// 	? []
													// 	: reasonCodes!?.map((reason) => ({
													// 			value: reason.reasonCode,
													// 			name: reason.description
													// 		}))
												}
												onChange={(item) => {
													field.onChange(item);
												}}
												error={!!formState?.errors?.reason}
												helperText={'formState?.errors?.reason?.message'}
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
			</Grid>

			{matches ? null : (
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
						/>
					</BoxAdapter>
				</Grid>
			)}
			<Loader showLoader={false} />
		</Grid>
	);
}
