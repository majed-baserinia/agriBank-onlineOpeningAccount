import { CartableInquiryResponse } from 'common/entities/cheque/chekList/CartableInquiry/CartableInquiryResponse';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import ChipStatusAdapter from 'ui/htsc-components/ChipStatusAdapter';
import TableAdapter from 'ui/htsc-components/TableAdapter/TableAdapter';
import { paths } from 'ui/route-config/paths';

export default function DesktopView({ cartableList }: { cartableList?: CartableInquiryResponse }) {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const [checkRows, setCheckRows] = useState()

	useEffect(() => {
		//get the data of the table from the props

		const rows = cartableList?.cheques.map((check) => {
			return {
				sayadNumber: check.sayadNo,
				status: (
					<>
						<ChipStatusAdapter
							type="success"
							label="test"
						/>
					</>
				),
				serieAndSerial: check.serialNo + '/' + check.seriesNo,
				amount: check.amount,
				reason: check.reason,
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
	}, []);

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
