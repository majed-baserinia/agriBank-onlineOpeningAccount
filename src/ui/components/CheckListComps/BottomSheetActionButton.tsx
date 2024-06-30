import { Grid, Typography } from '@mui/material';
import infoIcon from 'assets/icon/info-circle.svg';
import TablerMoneybag from 'assets/icon/menu/TablerMoneybag.svg';
import acceptOrNotIcon from 'assets/icon/menu/recieve-check-confirm.svg';
import giveBackCheckIcon from 'assets/icon/menu/giveBackCheckIcon.svg';
import rejectGiveBack from 'assets/icon/menu/rejectGiveBack.svg';
import rejectTransfer from 'assets/icon/menu/rejectTransfer.svg';
import transferCheck from 'assets/icon/menu/transfer-check.svg';
import { useChecklistData } from 'business/stores/checklistData/checklistData';
import { Check } from 'common/entities/cheque/chekList/CartableInquiry/CartableInquiryResponse';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import BottomSheetAdapter from 'ui/htsc-components/BottomSheetAdapter/BottomSheetAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import SvgToIcon from 'ui/htsc-components/SvgToIcon';
import { paths } from 'ui/route-config/paths';
import Menu from '../Menu';

export default function BottomSheetActionButton({ check }: { check: Check }) {
	const { t } = useTranslation();
	const [open, setOpen] = useState(false);
	const { addNewData } = useChecklistData((store) => store);

	return (
		<>
			<ButtonAdapter
				variant="contained"
				onClick={() => {
					setOpen(!open);
					addNewData({ selectedCheck: check });
				}}
				muiButtonProps={{
					sx: {
						width: '100%'
					}
				}}
			>
				{t('selectAction')}
			</ButtonAdapter>
			<BottomSheetAdapter
				open={open}
				setOpen={setOpen}
				snapPoints={[700, 0]}
			>
				<Grid
					sx={{ padding: '16px' }}
					container
					justifyContent={'center'}
					direction={'column'}
					gap={'18px'}
				>
					<Grid
						container
						alignItems={'center'}
						gap={'8px'}
					>
						<SvgToIcon
							icon={infoIcon}
							alt="info"
						/>
						<Typography
							variant="bodyLg"
							fontWeight={'bold'}
						>
							{t('selectAction')}
						</Typography>
					</Grid>
					<Typography variant="bodySm">{t('selectActionText')}</Typography>
					<Menu list={checkActionsMenuList} />
				</Grid>
			</BottomSheetAdapter>
		</>
	);
}

export const checkActionsMenuList = [
	{
		id: '1',
		title: 'transferCheck',
		icon: (
			<SvgToIcon
				icon={transferCheck}
				alt="transferCheck"
			/>
		),
		routeTo: paths.ReceivedChecksList.TransferCheck
	},
	{
		id: '2',
		title: 'CashingCheck',
		icon: (
			<SvgToIcon
				icon={TablerMoneybag}
				alt="CashingCheck"
			/>
		),
		routeTo: paths.ReceivedChecksList.CashingCheck
	},
	// {
	// 	id: '3',
	// 	title: 'Conf/rej',
	// 	icon: (
	// 		<SvgToIcon
	// 			icon={acceptOrNotIcon}
	// 			alt="list check"
	// 		/>
	// 	),
	// 	routeTo: paths.ReceivedChecksList.TransferCheck
	// },
	{
		id: '3',
		title: 'giveBackCheck',
		icon: (
			<SvgToIcon
				icon={giveBackCheckIcon}
				alt="list check"
			/>
		),
		routeTo: paths.ReceivedChecksList.GiveBackCheckInitiate
	},
	{
		id: '3',
		title: 'rejectTransferCheck',
		icon: (
			<SvgToIcon
				icon={rejectTransfer}
				alt="list check"
			/>
		),
		routeTo: paths.ReceivedChecksList.TransferCheck
	},
	{
		id: '3',
		title: 'rejectGiveBack',
		icon: (
			<SvgToIcon
				icon={rejectGiveBack}
				alt="list check"
			/>
		),
		routeTo: paths.ReceivedChecksList.RejectGiveBackCheckInitiate
	}
];
