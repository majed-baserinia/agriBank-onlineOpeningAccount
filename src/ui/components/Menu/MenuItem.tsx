import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface Props {
	icon?: ReactNode;
	title: string;
	subtitle?: string;
	routeTo: string;
}

export default function MenuItem(props: Props) {
	const { icon, title, subtitle, routeTo } = props;
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('sm'));
	const { t } = useTranslation();
	const navigate = useNavigate();

	return (
		<div>
			<Grid
				container
				justifyContent={'space-between'}
				alignItems={'center'}
				sx={{ padding: matches ? '16px 0' : '24px 0', cursor: 'pointer' }}
				onClick={(e) => {
					navigate(routeTo);
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
							>
								{t(title, 'unknown')}
							</Typography>
							{subtitle ? (
								<Typography
									variant="bodyXs"
									fontWeight={'medium'}
									sx={{ color: theme.palette.text.secondary, marginTop: "8px" }}
								>
									{t(subtitle, 'unknown')}
								</Typography>
							) : null}
						</Grid>
					</Grid>
				</Grid>
				<Grid>{theme.direction == 'rtl' ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />}</Grid>
			</Grid>
		</div>
	);
}
