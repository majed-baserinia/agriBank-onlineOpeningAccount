import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Breadcrumbs, Link, Typography, useMediaQuery, useTheme } from '@mui/material';

import { useTranslation } from 'react-i18next';
import { Props } from './type';

export default function BreadcrumbsAdapter(props: Props) {
	const { breadcrumbs } = props;
	const theme = useTheme();
	const { t } = useTranslation();
	const matches = useMediaQuery(theme.breakpoints.down('sm'));

	if (matches) return null;

	return (
		<Breadcrumbs
			dir={theme.direction}
			sx={{ marginBottom: '24px' }}
			separator={
				theme.direction == 'ltr' ? (
					<NavigateNextIcon fontSize="small" />
				) : (
					<NavigateBeforeIcon fontSize="small" />
				)
			}
			aria-label="breadcrumb"
		>
			{breadcrumbs?.map((item, index) => {
				if (breadcrumbs.length - 1 == index) {
					return (
						<Typography
							key={item.key}
							color="primary"
							fontWeight={'bold'}
						>
							{t(item.title, 'unknown')}
						</Typography>
					);
				}
				return (
					<Link
						underline="hover"
						key={item.key}
						color="inherit"
						href={item.href}
						onClick={(e) => item.onClick?.(e)}
					>
						{t(item.title, 'unknown')}
					</Link>
				);
			})}
		</Breadcrumbs>
	);
}
