import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import infoIcon from 'assets/icon/info-circle.svg';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Menu from 'ui/components/Menu';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import BreadcrumbsAdapter from 'ui/htsc-components/BreadcrumbsAdapter';
import SvgToIcon from 'ui/htsc-components/SvgToIcon';
import Loader from 'ui/htsc-components/loader/Loader';
import { paths } from 'ui/route-config/paths';

export default function SelectCheckList() {
	const { t } = useTranslation();
	const theme = useTheme();
	const navigate = useNavigate();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
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
		//if there is not  navigate the user by default to the other page
	}, []);

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

	//display the loader this way to user becouse user shouldn't see the page if there is no Checks that user represent or sign.
	if (loading) return <Loader showLoader />;

	return (
		<div style={{ minHeight: 'calc(100% - 128px)', padding: matches ? '16px' : '64px' }}>
			<BoxAdapter>
				<Grid
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
						<Typography sx={{ color: theme.palette.text.secondary }}>{t('checkListsMenuText')}</Typography>
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
		</div>
	);
}
