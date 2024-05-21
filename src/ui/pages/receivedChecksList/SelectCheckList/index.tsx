import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import infoIcon from 'assets/icon/info-circle.svg';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Menu from 'ui/components/Menu';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import BreadcrumbsAdapter from 'ui/htsc-components/BreadcrumbsAdapter';
import SvgToIcon from 'ui/htsc-components/SvgToIcon';
import Loader from 'ui/htsc-components/loader/Loader';
import { paths } from 'ui/route-config/paths';

export const breadcrumbs = [
	{
		title: 'accountServices',
		key: '1',
		href: '/'
	},
	{
		title: 'electronicCheck',
		key: '2',
		href: '/'
	},
	{
		title: 'receivedCheckList',
		key: '3',
		href: '/'
	}
];

export default function SelectCheckList() {
	const { t } = useTranslation();
	const theme = useTheme();
	const navigate = useNavigate();
	const matches = useMediaQuery(theme.breakpoints.down('sm'));
	const [loading, setLoading] = useState(false);
	const [menuItems, setMenuItems] = useState([
		{
			id: '1',
			title: 'myChecks',
			subtitle: 'myChecksSubtitle',
			//we don't send the user cif to backend (if it is null it means it is the user ifself)
			routeTo: paths.ReceivedChecksList.ChecksList
		},
		{
			id: '1',
			title: 'should be generate',
			subtitle: 'othersChecksSubtitle',
			routeTo: `${paths.ReceivedChecksList.ChecksList}?cif=companyorotherCif`
		}
	]);

	useEffect(() => {
		//call the api
		//add the response to the menu items if there is
		//and set it to store
		//if there is not  navigate the user by default to the other page
		//use replace state for navigation
	}, []);

	//display the loader this way to user becouse user shouldn't see the page if there is no Checks that user represent or sign.
	if (loading) return <Loader showLoader />;

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
					gap={'24px'}
				>
					<BreadcrumbsAdapter breadcrumbs={breadcrumbs} />
					<Grid
						container
						gap={'8px'}
					>
						<SvgToIcon
							icon={infoIcon}
							alt="info"
						/>
						<Typography
							variant="bodyMd"
							sx={{ color: theme.palette.text.secondary }}
						>
							{t('checkListsMenuText')}
						</Typography>
					</Grid>
					<Grid
						dir={theme.direction}
						container
						direction={'column'}
						gap={'56px'}
					>
						<Menu list={menuItems} />
					</Grid>
				</Grid>
			</BoxAdapter>
		</Grid>
	);
}
