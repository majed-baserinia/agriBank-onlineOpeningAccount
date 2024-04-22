import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Menu from 'ui/components/Menu';
import Title from 'ui/components/Title';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import Stepper from 'ui/htsc-components/Stepper';

import { createContext, useState } from 'react';
import CheckRecivers from 'ui/components/CheckRecivers';
import { menuList } from '../../HomePage/menuList';

export const ReciversContext = createContext({});

export default function AddRecievers() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const [recivers, setRecivers] = useState([]);

	return (
		<ReciversContext.Provider value={{ recivers, setRecivers }}>
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
											t('issueSigniture'),
											t('end')
										]}
										active={2}
									/>
								) : null}
								<Typography variant="body1">{t('infoCheckText')}</Typography>
								<CheckRecivers />
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
		</ReciversContext.Provider>
	);
}
