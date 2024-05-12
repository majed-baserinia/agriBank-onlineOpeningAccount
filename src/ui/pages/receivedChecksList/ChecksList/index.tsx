import { Grid, useMediaQuery, useTheme } from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import BreadcrumbsAdapter from 'ui/htsc-components/BreadcrumbsAdapter';
import { breadcrumbs } from '../SelectCheckList';

export default function ChecksList() {
	const cif = new URLSearchParams(window.location.search).get('cif');
	const { t } = useTranslation();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));

	useEffect(() => {
		//call the api by the cif that is received from url query if there is any
		//if there is not  call it with no param
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
