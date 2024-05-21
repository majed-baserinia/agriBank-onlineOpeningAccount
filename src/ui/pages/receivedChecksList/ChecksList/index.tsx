import { Grid, MenuItem, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import BreadcrumbsAdapter from 'ui/htsc-components/BreadcrumbsAdapter';
import SelectAdapter from 'ui/htsc-components/SelectAdapter';
import DesktopView from '../../../components/CheckListComps/DesktopView';
import MobileView from '../../../components/CheckListComps/Mobileview';
import { breadcrumbs } from '../SelectCheckList';

export default function ChecksList() {
	const cif = new URLSearchParams(window.location.search).get('cif');
	const { t } = useTranslation();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('tablet'));
	const [listOfBeneficiaries, setListOfBeneficiaries] = useState([]);
	const [selectedBeneficiary, setSelectedBeneficiary] = useState(cif);

	useEffect(() => {
		//call the api by the cif that is received from url query if there is any
	}, [selectedBeneficiary]);

	return (
		<Grid sx={{ padding: matches ? '0' : '64px' }}>
			<BoxAdapter fullWidth={matches}>
				<Grid
					sx={{
						minHeight: matches ? '100vh' : 'calc(100% - 128px)',
						padding: matches ? '0' : '16px'
					}}
					container
					direction={'column'}
					gap={'16px'}
				>
					<BreadcrumbsAdapter breadcrumbs={breadcrumbs} />
					<Grid
						container
						justifyContent={'space-between'}
						alignItems={'center'}
					>
						<Typography
							variant="bodyMd"
							fontWeight={'medium'}
						>
							{t('payTo')}
							{listOfBeneficiaries.length === 1 ? t('you') : selectedBeneficiary}
						</Typography>
						<Grid width={'30%'}>
							<SelectAdapter
								size="small"
								label=""
								onChange={(value) => setSelectedBeneficiary(value)}
							>
								<MenuItem value={1}>asfvfred</MenuItem>
								<MenuItem value={2}>as</MenuItem>
							</SelectAdapter>
						</Grid>
					</Grid>
					{matches ? <MobileView /> : <DesktopView />}
				</Grid>
			</BoxAdapter>
		</Grid>
	);
}
