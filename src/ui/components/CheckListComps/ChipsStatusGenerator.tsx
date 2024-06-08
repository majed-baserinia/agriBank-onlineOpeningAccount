import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';

import ChipStatusAdapter from 'ui/htsc-components/ChipStatusAdapter';
import { AllowedNumbers, LabelListType, TypeListType } from './types';

const labelList: LabelListType = {
	1: "Registered with the recipient's confirmation",
	2: 'cashed',
	3: 'voided',
	4: 'returned',
	5: 'partOfReturned',
	6: "Awaiting the guarantor's signature",
	7: "Waiting for the receiver's approval in withdrawing the check",
	8: "Waiting for the recipient's confirmation on the transfer of the check",
	9: 'The check is blocked in the system in raw form (not registered).',
	10: 'Check has been issued'
};

const typesList: TypeListType = {
	1: 'info',
	2: 'success',
	3: 'error',
	4: 'info',
	5: 'info',
	6: 'info',
	7: 'info',
	8: 'info',
	9: 'info',
	10: 'info'
};

export default function ChipsStatusGenerator({ status }: { status: AllowedNumbers }) {
	const { t } = useTranslation();
	return (
		<Grid sx={{ width: '100px' }}>
			<ChipStatusAdapter
				size="small"
				type={typesList[status]}
				label={t(labelList[status], labelList[status])}
			/>
		</Grid>
	);
}

// Case 1 : Return "ثبت شده با تائید گیرنده"
// Case 2 : Return "نقد شده"
// Case 3 : Return "باطل شده"
// Case 4 : Return "برگشت خورده"
// Case 5 : Return "بخشی برگشت خورده"
// Case 6 : Return "در انتظار امضاء ضامن"
// Case 7 : Return "در انتظار تایید گیرنده در کشیدن چک"
// Case 8 : Return "در انتظار تایید گیرنده در انتقال چک"
// Case 9 : Return "چک به صورت خام(ثبت نشده) در سامانه مسدود شده است."
// Case 10 : Return "چک صادر شده است"
