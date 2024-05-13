import { Grid, useMediaQuery, useTheme } from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import BreadcrumbsAdapter from 'ui/htsc-components/BreadcrumbsAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import ChipStatusAdapter from 'ui/htsc-components/ChipStatusAdapter';
import TableAdapter from 'ui/htsc-components/TableAdapter/TableAdapter';
import { breadcrumbs } from '../SelectCheckList';

export default function ChecksList() {
	const cif = new URLSearchParams(window.location.search).get('cif');
	const { t } = useTranslation();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));

	useEffect(() => {
		//call the api by the cif that is received from url query if there is any
		//if there is not  call it with no param
	}, []);

	return (
		<div style={{ minHeight: 'calc(100% - 128px)', padding: matches ? '16px' : '64px' }}>
			<BoxAdapter>
				<Grid
					container
					direction={'column'}
					gap={'24px'}
				>
					<BreadcrumbsAdapter breadcrumbs={breadcrumbs} />
					<TableAdapter
						columns={[
							{ id: 'sayadNumber', label: 'sayadNumber', minWidth: 110 },
							{ id: 'status', label: 'status', minWidth: 70 },
							{ id: 'serieAndSerial', label: 'serieAndSerial', minWidth: 110 },
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
										variant="contained"
										onClick={() => {
											console.log('sdfs');
										}}
										forwardIcon
									>
										Detail
									</ButtonAdapter>
								)
							}
						]}
					/>
				</Grid>
			</BoxAdapter>
		</div>
	);
}
