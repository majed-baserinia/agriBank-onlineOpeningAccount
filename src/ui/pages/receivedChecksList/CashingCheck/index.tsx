import { Grid, useMediaQuery, useTheme } from '@mui/material';
import useAccountsQuery from 'business/hooks/cheque/cashCheque/useAccountsQuery';
import useReceiverInquiryCheque from 'business/hooks/cheque/cashCheque/useReceiverInquiryCheque';
import { useChecklistData } from 'business/stores/checklistData/checklistData';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import CashingCheckForm from 'ui/components/CashingCheck/CashingCheckForm';
import Menu from 'ui/components/Menu';
import Title from 'ui/components/Title';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import Loader from 'ui/htsc-components/loader/Loader';

import { menuList } from 'ui/pages/HomePage/menuList';

export default function CashingCheck() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const { selectedCheck } = useChecklistData();
	const { data: checkData, mutate: inquiryCheckData, isLoading, isError } = useReceiverInquiryCheque();
	const { data: AccountData, isLoading: accountsDataLoading } = useAccountsQuery();
	// useEffect(() => {
	// 	if (!selectedCheck) {
	// 		//TODO: maybe show a error modal
	// 		navigate(paths.Home);
	// 	} else {
	// 		inquiryCheckData(
	// 			{ sayadNo: selectedCheck.sayadNo },
	// 			{
	// 				onSuccess: (res) => {},
	// 				onError: (err) => {
	// 					pushAlert({
	// 						type: 'error',
	// 						messageText: err.detail,
	// 						hasConfirmAction: true,
	// 						actions: {
	// 							onConfirm: () => {
	// 								navigate(paths.Home);
	// 							},
	// 							onCloseModal: () => {
	// 								navigate(paths.Home);
	// 							}
	// 						}
	// 					});
	// 				}
	// 			}
	// 		);
	// 	}
	// }, []);

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
				<BoxAdapter fullWidth={matches}>
					<Grid
						minHeight={matches ? 'calc(100vh - 64px)' : 'calc(100vh - 192px)'}
						container
						direction={'column'}
						justifyContent={'space-between'}
						wrap="nowrap"
					>
						<Grid
							container
							direction={'column'}
							gap={'8px'}
						>
							<Title>{t('cashingCheck')}</Title>
							{/* {checkData ? (
					<CashingCheckOverview check={checkData} />
				) : isError ? (
					<Grid
						container
						direction={'column'}
						gap={'8px'}
						sx={{
							backgroundColor: theme.palette.primary[50],
							padding: '16px',
							borderRadius: '16px'
						}}
					>
						<Typography
							variant="bodyMd"
							fontWeight={'medium'}
							align="center"
						>
							{t('noCheckInfo')}
						</Typography>{' '}
					</Grid>
				) : null} */}

							<CashingCheckForm AccountData={AccountData} />
						</Grid>
					</Grid>
				</BoxAdapter>
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
			<Loader showLoader={isLoading || accountsDataLoading} />
		</Grid>
	);
}
