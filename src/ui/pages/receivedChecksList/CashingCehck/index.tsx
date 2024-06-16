import { Grid, useMediaQuery, useTheme } from '@mui/material';
import { useChecklistData } from 'business/stores/checklistData/checklistData';
import { useNavigate } from 'react-router-dom';
import CashingCheckOverview from 'ui/components/CashingCheckOverview';
import Menu from 'ui/components/Menu';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';

import { menuList } from 'ui/pages/HomePage/menuList';

export default function CashingCehck() {
	const navigate = useNavigate();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const { selectedCheck } = useChecklistData();

	return (
		<Grid
			container
			sx={{ padding: matches ? '0' : '64px 0' }}
			justifyContent={'center'}
			gap={'24px'}
			dir={theme.direction}
		>
			<Grid
				item
				xs={12}
				md={8}
			>
				<CashingCheckOverview check={selectedCheck!} />
			</Grid>

			{matches ? null : (
				<Grid
					item
					md={3}
					dir={theme.direction}
				>
					<BoxAdapter>
						<Menu
							divider={false}
							list={menuList.management}
						/>
						<Menu
							divider={false}
							list={menuList.services}
						/>
					</BoxAdapter>
				</Grid>
			)}
			{/* <Loader showLoader={isLoading} /> */}
		</Grid>
	);
}
