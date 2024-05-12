import { Grid, useMediaQuery, useTheme } from '@mui/material';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import BreadcrumbsAdapter from 'ui/htsc-components/BreadcrumbsAdapter';

export default function ChecksList() {
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
			},
			{
				title: t('receivedCheckList'),
				key: '3',
				href: '/'
			}
		];
	}, []);

	return (
		<div style={{ minHeight: 'calc(100% - 128px)', padding: matches ? '16px' : '64px' }}>
			<BoxAdapter>
				<Grid
					container
					direction={'column'}
					gap={'24px'}
				>
					<BreadcrumbsAdapter breadcrumbs={breadcrumbs} />
				</Grid>
			</BoxAdapter>
		</div>
	);
}
