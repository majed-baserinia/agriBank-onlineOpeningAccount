import { Grid, MenuItem, Typography, useMediaQuery, useTheme } from '@mui/material';
import useCartableInquiryCommand from 'business/hooks/cheque/checklist/useCartableInquiryCommand';
import { pushAlert } from 'business/stores/AppAlertsStore';
import { useChecklistData } from 'business/stores/checklistData/checklistData';
import { CartableInquiryResponse } from 'common/entities/cheque/chekList/CartableInquiry/CartableInquiryResponse';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import BreadcrumbsAdapter from 'ui/htsc-components/BreadcrumbsAdapter';
import SelectAdapter from 'ui/htsc-components/SelectAdapter';
import DesktopView from '../../../components/CheckListComps/DesktopView';
import MobileView from '../../../components/CheckListComps/Mobileview';
import { breadcrumbs } from '../SelectCheckList';

export default function ChecksList() {
	const cif = new URLSearchParams(window.location.search).get('cif');
	const { t } = useTranslation();
	const navigate = useNavigate();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('tablet'));
	const relatedCustomers = useChecklistData((store) => store.relatedCustomers);
	const { mutate: getCartableInquiry, isLoading } = useCartableInquiryCommand();

	const [cartableListData, setCartableListData] = useState<CartableInquiryResponse>();
	const [listOfBeneficiaries, setListOfBeneficiaries] = useState([]);
	const [selectedBeneficiary, setSelectedBeneficiary] = useState(cif);

	const getBeneficiariesCheckLists = () => {
		getCartableInquiry(
			{ customerNumber: Number(selectedBeneficiary) },

			{
				onSuccess(data) {
					setCartableListData(data);
				},
				onError: (err) =>
					pushAlert({
						type: 'error',
						messageText: err.detail,
						hasConfirmAction: true,
						actions: { onConfirm: () => navigate(-1) }
					})
			}
		);
	};

	useEffect(() => {
		getBeneficiariesCheckLists();
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
								{relatedCustomers?.map((item) => (
									<MenuItem
										value={item.customerNumber}
										key={item.customerNumber}
									>
										{item.fullName}
									</MenuItem>
								))}
							</SelectAdapter>
						</Grid>
					</Grid>
					{matches ? (
						<MobileView />
					) : (
						<DesktopView cartableList={!isLoading ? cartableListData : undefined} />
					)}
				</Grid>
			</BoxAdapter>
		</Grid>
	);
}
