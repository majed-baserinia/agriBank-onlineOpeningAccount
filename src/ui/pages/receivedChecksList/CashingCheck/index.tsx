import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useChecklistData } from 'business/stores/checklistData/checklistData';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import CashingCheckOverview from 'ui/components/CashingCheckOverview';
import Menu from 'ui/components/Menu';
import MenuItem from 'ui/components/Menu/MenuItem';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import DatePickerAdapter from 'ui/htsc-components/DatePickerAdapter';
import SelectAdapter from 'ui/htsc-components/SelectAdapter';

import { menuList } from 'ui/pages/HomePage/menuList';

export default function CashingCheck() {
	const navigate = useNavigate();
	const { t } = useTranslation();
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
	{/* 			<CashingCheckOverview check={selectedCheck!} />
				
				<Grid
					item
					xs={12}
					sm={6}
				>
					<Controller
						name="date"
						control={control}
						render={({ field }) => (
							<DatePickerAdapter
								placeHolder={t('date')}
								onChange={(date) => {
									field.onChange(date?.toString());
								}}
								error={!!formState?.errors?.date}
								//helperText={formState?.errors?.date?.message}
							/>
						)}
					/>
				</Grid> */}
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
