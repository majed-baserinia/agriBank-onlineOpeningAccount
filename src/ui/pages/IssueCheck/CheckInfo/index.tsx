import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Menu from 'ui/components/Menu';
import Title from 'ui/components/Title';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import InputAdapter from 'ui/htsc-components/InputAdapter';
import Stepper from 'ui/htsc-components/Stepper';
import TextareaAdapter from 'ui/htsc-components/TextareaAdapter';

import BottomSheetSelect from 'ui/htsc-components/BottomSheetSelect';
import DatePickerAdapter from 'ui/htsc-components/DatePickerAdapter';
import { menuList } from '../../HomePage/menuList';

export default function CheckInfo() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));

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
										t('selectCheck'),
										t('checkInfo'),
										t('recivers'),
										t('issueSignature'),
										t('end')
									]}
									active={1}
								/>
							) : null}
							<Typography variant="body1">{t('infoCheckText')}</Typography>
							<Grid
								container
								spacing={'16px'}
							>
								<Grid
									item
									xs={12}
									sm={6}
								>
									<InputAdapter
										isRequired
										label={t('checkAmount')}
										onChange={() => {}}
										type="money"
									/>
								</Grid>
								<Grid
									item
									xs={12}
									sm={6}
								>
									<DatePickerAdapter
										placeHolder={t('date')}
										onChange={(date) => console.log(date)}
									/>
								</Grid>
								<Grid
									item
									xs={12}
									sm={6}
								>
									<BottomSheetSelect
										isRequired
										label={t('reason')}
										list={[
											{ value: '1', name: '0' },
											{ value: '2', name: '1' }
										]}
										onChange={(item) => {
											console.log(item);
										}}
									/>
								</Grid>
								<Grid
									item
									xs={12}
								>
									<TextareaAdapter
										onChange={() => {}}
										isRequired
										label={t('description')}
									/>
								</Grid>
							</Grid>
						</Grid>
						<Grid container>
							<ButtonAdapter
								variant="contained"
								size="medium"
								muiButtonProps={{ sx: { width: '100%' } }}
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
						<Menu list={menuList} />
					</BoxAdapter>
				</Grid>
			)}
		</Grid>
	);
}
