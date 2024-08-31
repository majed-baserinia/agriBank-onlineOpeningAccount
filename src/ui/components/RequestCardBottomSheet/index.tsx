import { Grid, Typography } from '@mui/material';
import useRequestCard from 'business/hooks/useRequestCard';
import { pushAlert } from 'business/stores/AppAlertsStore';
import { useDataSteps } from 'business/stores/onlineOpenAccount/dataSteps';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ModalOrBottomSheet from 'ui/htsc-components/ModalOrBottomSheet';
import { paths } from 'ui/route-config/paths';
import Menu from '../Menu';
import { usePreventNavigate } from 'business/hooks/usePreventNavigate';

type Props = {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	dontWantCard:()=>void
	wantCard:()=>void
};

export default function RequestCardBottomSheet(props: Props) {
	const { open, setOpen,dontWantCard,wantCard } = props;
	const { t } = useTranslation();
	//const {navigate} = usePreventNavigate();
	const { mutate: requestCard, isLoading: isLoadingRequestCard } = useRequestCard();
	const { token } = useDataSteps();

	const handleSubmitWithNoCard = () => {
		requestCard(
			{
				requestCard: false,
				token: token!,
				cardAddress: '',
				cityId: 0,
				cardPostalCode: '',
				cardPatternId: 0,
				identifierValue: '',
				sameHomeAddressForCard: false
			},
			{
				onSuccess: dontWantCard,
				onError: (err) => {
					pushAlert({
						type: 'error',
						// TODO: needs to refactor but when? first backend needs to change it and give us the new version of the api
						// @ts-ignore: Unreachable code error
						messageText: err.error ? (err.error.message as string) : err.detail,
						hasConfirmAction: true
					});
				}
			}
		);
	};

	const menuList = [
		{
			id: '1',
			title: 'requestCardMenuTitle',
			subtitle: 'requestCardMenuSubTitle',
			onClick:()=> wantCard()
		},
		{
			id: '2',
			title: 'refuseCardMenuTitle',
			subtitle: 'refuseCardMenuSubTitle',
			onClick: handleSubmitWithNoCard
		}
	];

	return (
		<ModalOrBottomSheet
			breackpoint="sm"
			title=""
			open={open}
			setOpen={setOpen}
			snapPoints={[300]}
		>
			<Grid
				sx={{ padding: '16px' }}
				container
				direction={'column'}
				gap={16}
			>
				<Grid
					container
					direction={'column'}
					gap={8}
				>
					<Typography
						variant="bodyLg"
						fontWeight={'bold'}
					>
						{t('requestCard')}
					</Typography>
					<Typography
						variant="bodySm"
						fontWeight={'regular'}
					>
						{t('requestCardText')}
					</Typography>
				</Grid>
				<Menu list={menuList} />
			</Grid>
		</ModalOrBottomSheet>
	);
}
