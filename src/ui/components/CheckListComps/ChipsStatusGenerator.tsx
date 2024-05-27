import ChipStatusAdapter from 'ui/htsc-components/ChipStatusAdapter';

export type AllowedNumbers = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
type LabelListType = Record<AllowedNumbers, string>;
type TypeListType = Record<keyof LabelListType, 'info' | 'error' | 'warning' | 'success' | 'disabled'>;

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
	4: 'warning',
	5: 'warning',
	6: 'warning',
	7: 'warning',
	8: 'warning',
	9: 'error',
	10: 'info'
};

export default function ChipsStatusGenerator({ status }: { status: AllowedNumbers }) {
	return (
		<ChipStatusAdapter
			type={typesList[status]}
			label={labelList[status]}
		/>
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
