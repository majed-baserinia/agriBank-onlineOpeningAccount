import { Divider, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import MenuItem from './MenuItem';

type Item = {
	title: string;
	subtitle?: string;
	icon?: ReactNode;
	routeTo: string;
};
interface Props {
	list: Item[];
	menuTitle?: string;
}
export default function Menu(props: Props) {
	const { list, menuTitle } = props;
	const theme = useTheme();
	const { t } = useTranslation();
	const matches = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<Grid>
			<Typography variant="h6">{menuTitle ? t(menuTitle, 'unknown') : null}</Typography>
			{list?.map((item, index) => {
				return (
					<>
						<MenuItem
							{...item}
							key={index}
						/>
						{!matches ? (
							list?.length - 1 == index ? null : (
								<Divider sx={{ width: 'calc(100% - 32px)', margin: 'auto' }} />
							)
						) : null}
					</>
				);
			})}
		</Grid>
	);
}

{
	/* <Grid>
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
				</Grid> */
}
