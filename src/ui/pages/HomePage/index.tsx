import BreadcrumbsAdapter from 'ui/htsc-components/BreadcrumbsAdapter';
import { Grid, useMediaQuery, useTheme } from '@mui/material';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import { useTranslation } from 'react-i18next';
import Title from 'ui/components/Title';
import Menu from 'ui/components/Menu';
import { useMemo } from 'react';

import { menuList } from './menuList';

export default function HomePage() {
	const { t } = useTranslation();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));

	const breadcrumbs = useMemo(() => {
		return [
			{
				title: t('accountServices'),
				key: '1',
				href: '/'
			},
			{
				title: t('electronicCheck'),
				key: '2',
				href: '/'
			}
		];
	}, []);

	return (
		<div style={{ minHeight: 'calc(100% - 128px)', padding: matches ? '16px' : '64px' }}>
			<BoxAdapter>
				<BreadcrumbsAdapter breadcrumbs={breadcrumbs} />
				<Title>{t('chequeMenu')}</Title>
				<Grid dir={theme.direction}>
					<Menu list={menuList} />
				</Grid>
			</BoxAdapter>
		</div>
	);
}
