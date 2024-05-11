import { Divider, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import MenuItem from './MenuItem';
import { Props } from './type';

export default function Menu(props: Props) {
	const { list } = props;
	const theme = useTheme();
	const { t } = useTranslation();
	const matches = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<>
			<Grid
				dir={theme.direction}
				container
				direction={'column'}
				gap={'56px'}
			>
				<Grid>
					<Typography variant="h6">{t('menuTitleServices')}</Typography>
					{list?.services?.map((item, index) => {
						return (
							<>
								<MenuItem
									item={item}
									index={index}
								/>
								{!matches ? (
									list?.services.length - 1 == index ? null : (
										<Divider sx={{ width: 'calc(100% - 32px)', margin: 'auto' }} />
									)
								) : null}
							</>
						);
					})}
				</Grid>
				<Grid>
					<Typography variant="h6">{t('menuTitleManagement')}</Typography>
					{list?.management?.map((item, index) => {
						return (
							<>
								<MenuItem
									item={item}
									index={index}
								/>
								{!matches ? (
									list?.management.length - 1 == index ? null : (
										<Divider sx={{ width: 'calc(100% - 32px)', margin: 'auto' }} />
									)
								) : null}
							</>
						);
					})}
				</Grid>
			</Grid>
		</>
	);
}
