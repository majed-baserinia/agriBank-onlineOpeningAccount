import { Divider, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import MenuItem from './MenuItem';
import { Props } from './type';

export default function Menu(props: Props) {
	const { list, menuTitle, divider = true } = props;
	const { t } = useTranslation();

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

						{divider ? list?.length - 1 == index ? null : <Divider /> : null}
					</>
				);
			})}
		</Grid>
	);
}
