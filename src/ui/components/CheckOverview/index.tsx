import { Divider, Grid, Typography, useTheme } from '@mui/material';
import { IssueChequeOverView } from 'common/entities/cheque/Digital Cheque/Issue Groups/IssueWithGroupResponse';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import OverviewItem from '../OverviewItem';
import OverviewParts from '../OverviewParts';

type Props = {
	overviewData?: IssueChequeOverView;
};

export default function CheckOverview(props: Props) {
	const { overviewData } = props;
	const { t } = useTranslation();
	const theme = useTheme();

	return (
		<Grid>
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
			<Grid sx={{marginTop:'16px', marginBottom:'16px'}}>
				<Typography variant='bodySm' fontWeight={"medium"} >{t('description')}</Typography>
				<Typography variant='bodySm'>{overviewData?.description}</Typography>
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
	);
}
