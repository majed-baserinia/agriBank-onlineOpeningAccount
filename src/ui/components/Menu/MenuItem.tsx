import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Grid, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Item } from './type';

export default function MenuItem(props: { index: number; item: Item }) {
	const { index, item } = props;
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('sm'));
	const { t } = useTranslation();
	const navigate = useNavigate();

	return (
		<div key={index}>
			<Grid
				container
				justifyContent={'space-between'}
				sx={{ padding: matches ? '16px 0' : '24px 0', cursor: 'pointer' }}
				onClick={(e) => {
					item.onClick?.(e);
					item.routeTo && navigate(item.routeTo);
				}}
			>
				<Grid>
					<Grid
						container
						gap={'8px'}
					>
						<span> {item.icon}</span>
						<span> {t(item.title)}</span>
					</Grid>
				</Grid>
				<Grid>{theme.direction == 'rtl' ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />}</Grid>
			</Grid>
		</div>
	);
}
