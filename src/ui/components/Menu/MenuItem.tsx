import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { usePreventNavigate } from 'business/hooks/usePreventNavigate';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
	icon?: ReactNode;
	title: string;
	subtitle?: string;
	routeTo?: string;
	onClick?: () => void;
}

export default function MenuItem(props: Props) {
	const { onClick, icon, title, subtitle, routeTo } = props;
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('sm'));
	const { t } = useTranslation();
	const { navigate } = usePreventNavigate({
		allowAll: true
	});

	return (
		<Grid
			container
			justifyContent={'space-between'}
			alignItems={'center'}
			minWidth={'290px'}
			sx={{ padding: matches ? '16px 0' : '24px 0', cursor: 'pointer', overflow: 'hidden' }}
			onClick={(e) => {
				routeTo ? navigate(routeTo) : null;
				onClick?.();
			}}
		>
			<Grid>
				<Grid
					container
					gap={'8px'}
					alignItems={'center'}
					justifyContent={'center'}
				>
					<Grid item> {icon ? icon : null}</Grid>
					<Grid>
						<Typography
							variant="bodyMd"
							fontWeight={'medium'}
							noWrap
						>
							{t(title, title)}
						</Typography>
						{subtitle ? (
							<Typography
								variant="bodyXs"
								fontWeight={'medium'}
								sx={{ color: theme.palette.text.secondary, marginTop: '8px' }}
							>
								{t(subtitle, subtitle)}
							</Typography>
						) : null}
					</Grid>
				</Grid>
			</Grid>
			<Grid>{theme.direction == 'rtl' ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />}</Grid>
		</Grid>
	);
}
