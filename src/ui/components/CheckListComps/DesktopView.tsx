import { CartableInquiryResponse } from 'common/entities/cheque/chekList/CartableInquiry/CartableInquiryResponse';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import TableAdapter from 'ui/htsc-components/TableAdapter/TableAdapter';
import { paths } from 'ui/route-config/paths';
import ChipsStatusGenerator, { AllowedNumbers } from './ChipsStatusGenerator';

type rowType =
	| {
			sayadNumber: number;
			status: JSX.Element;
			serieAndSerial: string;
			amount: number;
			reason: string;
			date: string;
			action: JSX.Element;
	  }[]
	| undefined;

export default function DesktopView({ cartableList }: { cartableList?: CartableInquiryResponse }) {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const [checkRows, setCheckRows] = useState<rowType>();

	useEffect(() => {
		const rows = cartableList?.cheques.map((check) => {
			return {
				sayadNumber: check.sayadNo,
				status: <ChipsStatusGenerator status={check.chequeStatus as AllowedNumbers} />,
				serieAndSerial: check.serialNo + '/' + check.seriesNo,
				amount: check.amount,
				reason: check.reasonDescription,
				date: check.dueDate,
				action: (
					<ButtonAdapter
						size="small"
						variant="text"
						onClick={() => {
							navigate(`${paths.ReceivedChecksList.Detail}?sayadNo=123`);
						}}
						forwardIcon
					>
						{t('details')}
					</ButtonAdapter>
				)
			};
		});
		setCheckRows(rows);
	}, [cartableList]);

	return (
		<TableAdapter
			columns={[
				{ id: 'sayadNumber', label: 'sayadNumber', minWidth: 70 },
				{ id: 'status', label: 'status', minWidth: 70 },
				{ id: 'serieAndSerial', label: 'serieAndSerial', minWidth: 70 },
				{ id: 'amount', label: 'amount', minWidth: 70 },
				{ id: 'reason', label: 'reason', minWidth: 70 },
				{ id: 'date', label: 'date', minWidth: 70 },
				{ id: 'action', label: '', minWidth: 70, align: 'right' }
			]}
			rowsData={checkRows}
		/>
	);
}
