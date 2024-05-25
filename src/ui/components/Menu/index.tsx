import { Divider, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import MenuItem from './MenuItem';
import { Props } from './type';
import { Fragment } from 'react';

export default function Menu(props: Props) {
	const { list, menuTitle, divider = true } = props;
	const { t } = useTranslation();

	return (
		<Grid>
			<Typography
				variant="bodyLg"
				fontWeight={'bold'}
			>
				{menuTitle ? t(menuTitle, 'unknown') : null}
			</Typography>
			{list?.map((item, index) => {
				return (
					<Fragment key={item.title}>
						<MenuItem
							{...item}
							key={index}
						/>

						{divider ? list?.length - 1 == index ? null : <Divider /> : null}
					</Fragment>
				);
			})}
		</Grid>
	);
}
