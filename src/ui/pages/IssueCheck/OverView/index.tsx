import { Divider, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Menu from 'ui/components/Menu';
import Title from 'ui/components/Title';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import Stepper from 'ui/htsc-components/Stepper';

import OverviewItem from 'ui/components/OverviewItem';
import OverviewParts from 'ui/components/OverviewParts';
import { menuList } from '../../HomePage/menuList';
import BottomSheetSelect from 'ui/htsc-components/BottomSheetSelect';

export default function OverView() {
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
								<Stepper
									list={[
										t('selectCheck'),
										t('checkInfo'),
										t('recivers'),
										t('issueSignature'),
										t('selectSignatureGroup'),
										t('end')
									]}
									active={5}
								/>
							) : null}
							<Grid
								container
								direction={'column'}
								gap={'16px'}
							>
								<OverviewItem
									title="test"
									value={'ssdfasd'}
								/>
								<OverviewItem
									title="test"
									value={'ssdfasd'}
								/>
								<Divider />
								<OverviewItem
									title="test"
									value={'ssdfasd'}
								/>
								<OverviewItem
									title="test"
									value={'ssdfasd'}
								/>
								<OverviewItem
									title="test"
									value={'ssdfasd'}
								/>
								<OverviewItem
									title="test"
									value={'ssdfasd'}
								/>
								<Divider />
							</Grid>
							<Grid>
								<Typography>sharh</Typography>
								<Typography>text</Typography>
							</Grid>
							<Grid
								sx={{
									border: `1px solid ${theme.palette.divider}`,
									borderRadius: '16px',
									padding: '16px',
                                    margin:"16px 0"
								}}
							>
								<Typography>دریافت کنندکان</Typography>
								<OverviewParts
									name="afasdf"
									IDCode={'2012311321'}
									shahabCode={21214}
								/>
                                <Divider />
								<OverviewParts
									name="afasdf"
									comprehensiveCode={'2012311321'}
								/>
								
								<Typography sx={{marginTop: "16px"}}>امضا کنندکان</Typography>
								<OverviewParts
									name="afasdf"
									IDCode={'2012311321'}
								/>
                                <Divider />
								<OverviewParts
									name="afasdf"
									IDCode={'2012311321'}
								/>
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
