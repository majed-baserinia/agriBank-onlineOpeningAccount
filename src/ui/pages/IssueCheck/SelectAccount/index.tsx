import { Divider, Grid, MenuItem, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Menu from 'ui/components/Menu';
import Title from 'ui/components/Title';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import ChipWrapperForSelect from 'ui/htsc-components/ChipWrapperForSelect';
import SelectAdapter from 'ui/htsc-components/SelectAdapter';
import Stepper from 'ui/htsc-components/Stepper';
import ChipAdapter from 'ui/htsc-components/chipAdapter';
import { menuList } from '../../HomePage/menuList';
import CheqeCard from 'ui/components/CheqeCard';

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
										t('issueSigniture'),
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
							<SelectAdapter
								onChange={(a) => {}}
								label={t('accountsList')}
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
								</ChipWrapperForSelect>

								<MenuItem>
									{/* <Grid
                  container
                  justifyContent={"center"}
                  alignItems="Center"
                  gap={"5px"}
                  wrap="nowrap"
                  >
                  <Grid sx={{ height: "30px", width: "30px" }}>
                  <img
                  style={{ width: "100%", height: "100%" }}
                  src={option.iconImg}
                  alt={option.nameIcon}
                  />
                  </Grid>
                  <Grid
                  container
                  direction={"column"}
                  alignItems="flex-start"
                  gap={"5px"}
                  >
                  <span
                  style={{
                    fontSize: "10px",
                    color: theme.palette.grey[200]
                  }}
                  >
                  {option.label + " (" + option.nameIcon + ")"}
                  </span>
                  <span style={{ fontSize: "14px" }}>{formatToCart(option.value)}</span>
                  </Grid>
                </Grid> */}
									<Divider />
								</MenuItem>
							</SelectAdapter>
						</Grid>
						<Divider />

							<CheqeCard/>
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
