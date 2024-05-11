import { Divider, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Menu from 'ui/components/Menu';
import Title from 'ui/components/Title';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import Stepper from 'ui/htsc-components/Stepper';

import { issueChequeOverView } from 'common/entities/cheque/Digital Cheque/IssueChequeVerifyInitiate/IssueChequeVerifyInitiateResponse';
import { Fragment } from 'react';
import OverviewItem from 'ui/components/OverviewItem';
import OverviewParts from 'ui/components/OverviewParts';
import Loader from 'ui/htsc-components/loader/Loader';
import { menuList } from '../../HomePage/menuList';

export default function OverView() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	//const overviewData = useDataSteps((store) => store.steps.overviewData);

	const overviewData: issueChequeOverView = {
		amount: 212,
		description: 'advdsvds',
		dueDate: '222222',
		reason: 'dsv dsvds',
		recievers: [
			{
				customerType:4,
				name: 'name',
				nationalNo: '321123123',
				shahabNo: ''
			},
			{
				customerType: 3,
				name: 'name',
				nationalNo: '321123123',
				shahabNo: '4142'
			},
			{
				customerType: 2,
				name: 'name',
				nationalNo: '321123123',
				shahabNo: '4142'
			},
			{
				customerType: 1,
				name: 'name',
				nationalNo: '321123123',
				shahabNo: '4142'
			}
		],
		sayadNo: 3232413.2,
		seri: '21321',
		serial: '324324',
		signers: [
			{
				withdrawalGroups: [
					{
						customerNumber: 3241534135,
						name: 'name'
					},
					{
						customerNumber: 3241534135,
						name: 'name'
					},
					{
						customerNumber: 3241534135,
						name: 'name'
					},
					{
						customerNumber: 3241534135,
						name: 'name'
					}
				],
				groupNumber: 'grupnumber'
			}
		],
		toIBAN: '463543'
	};
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
							gap={'16px'}
						>
							<Title>{t('activationElCheck')}</Title>
							{!matches ? (
								<Stepper
									list={[
										t('selectCheck'),
										t('checkInfo'),
										t('recivers'),
										t('issueSignature'),
										t('selectSignatureGroup'),
										t('end')
									]}
									active={5}
								/>
							) : null}
							<Grid
								container
								direction={'column'}
								gap={'16px'}
							>
								<OverviewItem
									title={t('sayadNo')}
									value={overviewData?.sayadNo}
								/>
								<OverviewItem
									title={t('checkNo')}
									value={overviewData?.sayadNo}
								/>
								<Divider />
								<OverviewItem
									title={t('shebaOrigin')}
									value={overviewData?.sayadNo}
								/>
								<OverviewItem
									title={t('amount')}
									value={overviewData?.amount}
								/>
								<OverviewItem
									title={t('dueDate')}
									value={overviewData?.dueDate}
								/>
								<OverviewItem
									title={t('reason')}
									value={overviewData?.reason}
								/>
								<Divider />
							</Grid>
							<Grid>
								<Typography>{t('description')}</Typography>
								<Typography>{overviewData?.description}</Typography>
							</Grid>
							<Grid
								sx={{
									border: `1px solid ${theme.palette.divider}`,
									borderRadius: '16px',
									padding: '16px',
									margin: '16px 0'
								}}
							>
								<Typography>{t('recivers')}</Typography>
								{overviewData?.recievers?.map((receiver, index) => {
									return (
										<Fragment key={receiver.name}>
											<OverviewParts
												type="receiver"
												receiverData={{ ...receiver }}
											/>
											{overviewData.recievers.length - 1 != index ? <Divider /> : null}
										</Fragment>
									);
								})}

								<Typography sx={{ marginTop: '16px' }}>{t('signers')}</Typography>

								{overviewData?.signers[0].withdrawalGroups?.map((signer, index) => {
									return (
										<Fragment key={index}>
											<OverviewParts
												type="signer"
												signerData={{ ...signer }}
											/>
											{overviewData.recievers.length - 1 != index ? <Divider /> : null}
										</Fragment>
									);
								})}
							</Grid>
						</Grid>

						<Grid container>
							<ButtonAdapter
								variant="contained"
								size="medium"
								muiButtonProps={{ sx: { width: '100%' } }}
								forwardIcon
								onClick={() => console.log()}
							>
								{t('continue')}
							</ButtonAdapter>
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
						<Menu list={menuList} />
					</BoxAdapter>
				</Grid>
			)}
			<Loader showLoader={!overviewData} />
		</Grid>
	);
}
