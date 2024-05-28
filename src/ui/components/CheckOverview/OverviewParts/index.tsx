import { Grid, Typography } from '@mui/material';
import { t } from 'i18next';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Props, ReceiverData, SignerData } from './type';

export default function OverviewParts(props: Props) {
	const { type } = props;
	const data = useRef<ReceiverData | SignerData>();

	if (type === 'signer') {
		data.current = props.signerData;
	}

	if (type === 'receiver') {
		data.current = props.receiverData;
	}

	return (
		<Grid
			container
			direction={'column'}
			justifyContent={'space-between'}
			alignItems={'start'}
			sx={{ padding: '16px' }}
		>
			<Typography variant="bodyMd">{data?.current?.name}</Typography>
			<Grid
				container
				gap={'4px'}
				justifyContent={'start'}
			>
				{type === 'receiver' ? (
					<ReceiverComp {...(data.current as ReceiverData)} />
				) : (
					<SignerComp {...(data.current as SignerData)} />
				)}
			</Grid>
		</Grid>
	);
}

const SignerComp = (props: SignerData) => {
	const { customerNumber } = props;
	return (
		<>
			<Typography variant="bodyXs">{t('iDCodeCol')}</Typography>
			<Typography variant="bodyXs">{customerNumber}</Typography>
		</>
	);
};

const ReceiverComp = (props: ReceiverData) => {
	const { customerType, nationalNo, shahabNo } = props;
	const { t } = useTranslation();

	const customerTypeMap: { [key: number]: string } = {
		1: t('nationalIdCol'),
		2: t('nationalIdCol'),
		3: t('universalIDCol'),
		4: t('nationalIdCol')
	};

	return (
		<>
			<Typography variant="bodyXs">{customerTypeMap?.[customerType]}</Typography>
			<Typography variant="bodyXs">{nationalNo}</Typography>
			{shahabNo && (
				<>
					<Typography variant="bodyXs">{t('ShahabCodeTCol')}</Typography>
					<Typography variant="bodyXs">{shahabNo}</Typography>{' '}
				</>
			)}
		</>
	);
};
