import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Menu from 'ui/components/Menu';
import Title from 'ui/components/Title';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import SelectAdapter from 'ui/htsc-components/SelectAdapter';
import Stepper from 'ui/htsc-components/Stepper';

import ChipWrapperForSelect from 'ui/htsc-components/ChipWrapperForSelect';
import MenuItemAdapter from 'ui/htsc-components/MenuItemAdapter';
import ChipAdapter from 'ui/htsc-components/chipAdapter';
import { menuList } from '../../HomePage/menuList';

export default function SelectAccount() {
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
						<Grid>
							<Title>{t('activationElCheck')}</Title>
							{!matches ? (
								<Stepper
									list={[
										t('selectCheck'),
										t('checkInfo'),
										t('recivers'),
										t('issueSignature'),
										t('end')
									]}
									active={0}
								/>
							) : null}
							<Typography
								variant="body1"
								sx={{ marginBottom: '16px' }}
							>
								{t('selectAaccountText')}
							</Typography>
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
										onChange={(a) => {}}
										label={t('accountsList')}
									>
										<MenuItemAdapter type="default">
											{/* <span
												style={{
													fontSize: '10px',
													color: theme.palette.grey[200]
												}}
											>
												{option.label + ' (' + option.nameIcon + ')'}
											</span>
											<span style={{ fontSize: '14px' }}>{formatToCart(option.value)}</span> */}
										</MenuItemAdapter>
										<MenuItemAdapter type="default">
											{/* <span
												style={{
													fontSize: '10px',
													color: theme.palette.grey[200]
												}}
											>
												{option.label + ' (' + option.nameIcon + ')'}
											</span>
											<span style={{ fontSize: '14px' }}>{formatToCart(option.value)}</span> */}
										</MenuItemAdapter>
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
										onChange={(a) => {}}
										label={t('checkSheet')}
									>
										<ChipWrapperForSelect>
											<ChipAdapter
												label={t('personalAccount')}
												onClick={(e) => {}}
											/>
											<ChipAdapter
												label={t('corporateAccount')}
												onClick={(e) => {}}
												checked
											/>
											<ChipAdapter
												label={t('corporateAccount')}
												onClick={(e) => {}}
												checked
											/>
										</ChipWrapperForSelect>
										<MenuItemAdapter
											value={'1'}
											title="1"
											subtitle="11"
											type="bordred"
										/>
										<MenuItemAdapter
											value={'2'}
											title="12"
											subtitle="12"
											type="bordred"
										/>
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
										onChange={(a) => {}}
										label={t('checkbook')}
									>
										<MenuItemAdapter
											value={'1'}
											title="1"
											subtitle="11"
											type="bordred"
										/>
										<MenuItemAdapter
											value={'2'}
											title="12"
											subtitle="12"
											type="bordred"
										/>
									</SelectAdapter>
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
