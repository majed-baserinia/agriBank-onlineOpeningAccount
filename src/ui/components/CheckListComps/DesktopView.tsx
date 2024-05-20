import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import ChipStatusAdapter from 'ui/htsc-components/ChipStatusAdapter';
import TableAdapter from 'ui/htsc-components/TableAdapter/TableAdapter';
import { paths } from 'ui/route-config/paths';

export default function DesktopView() {
	const navigate = useNavigate();
	const { t } = useTranslation();

	useEffect(() => {
		//get the data of the table from the props
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
			rowsData={[
				{
					sayadNumber: 'asdfas',
					status: (
						<>
							<ChipStatusAdapter
								type="success"
								label="test"
							/>
						</>
					),
					serieAndSerial: 'dssdf',
					amount: '234324',
					reason: '234234',
					date: '234234',
					action: (
						<ButtonAdapter
							size="small"
							variant="text"
							onClick={() => {
								console.log('sdfs');
							}}
							forwardIcon
						>
							Detail
						</ButtonAdapter>
					)
				},
				{
					sayadNumber: 'asdfas',
					status: 'SD;LVMS',
					serieAndSerial: 'dssdf',
					amount: '234324',
					reason: '234234',
					date: '234234'
				},
				{
					sayadNumber: 'asdfas',
					status: 'SD;LVMS',
					serieAndSerial: 'dssdf',
					amount: '234324',
					reason: '234234',
					date: '234234',
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
				}
			]}
		/>
	);
}
