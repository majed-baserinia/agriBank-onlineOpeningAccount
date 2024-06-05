import { Divider, Grid, Typography, useTheme } from '@mui/material';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import OverviewParts from '../OverviewParts';
import { Props } from './types';

export default function PersonsList({ recievers, signers, holders }: Props) {
	const { t } = useTranslation();
	const theme = useTheme();

	return (
		<Grid
			sx={{
				border: `1px solid ${theme.palette.divider}`,
				borderRadius: '16px',
				padding: '16px',
				margin: '16px 0'
			}}
		>
			{recievers ? (
				<>
					<Typography
						variant="bodyMd"
						fontWeight={'medium'}
					>
						{t('recivers')}
					</Typography>
					{recievers?.map((receiver, index) => {
						return (
							<Fragment key={receiver.name}>
								<OverviewParts
									type="receiver"
									receiverData={{ ...receiver }}
								/>
								{recievers?.length - 1 != index ? <Divider /> : null}
							</Fragment>
						);
					})}
				</>
			) : null}

			{signers ? (
				<>
					<Typography
						variant="bodyMd"
						fontWeight={'medium'}
						sx={{ marginTop: '16px' }}
					>
						{t('signers')}
					</Typography>

					{signers?.[0].withdrawalGroups?.map((signer, index) => {
						return (
							<Fragment key={index}>
								<OverviewParts
									type="signer"
									signerData={{ ...signer }}
								/>
								{signers?.[0].withdrawalGroups.length - 1 != index ? <Divider /> : null}
							</Fragment>
						);
					})}
				</>
			) : null}

			{holders ? (
				<>
					<Typography
						variant="bodyMd"
						fontWeight={'medium'}
						sx={{ marginTop: '16px' }}
					>
						{t('beneficiary')}
					</Typography>

					{holders?.map((holder, index) => {
						return (
							<Fragment key={index}>
								<OverviewParts
									type="holder"
									holderData={{ ...holder }}
								/>
								{holders?.length - 1 != index ? <Divider /> : null}
							</Fragment>
						);
					})}
				</>
			) : null}
		</Grid>
	);
}
