import { Grid, Typography } from '@mui/material';
import { usePreventNavigate } from 'business/hooks/usePreventNavigate';
import useRequestCard from 'business/hooks/useRequestCard';
import { pushAlert } from 'business/stores/AppAlertsStore';
import { useDataSteps } from 'business/stores/onlineOpenAccount/dataSteps';
import { throttle } from 'common/utils';
import { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Loader from 'ui/htsc-components/loader/Loader';
import ModalOrBottomSheet from 'ui/htsc-components/ModalOrBottomSheet';
import { paths } from 'ui/route-config/paths';
import Menu from '../Menu';

type Props = {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function RequestCardBottomSheet(props: Props) {
	const { open, setOpen } = props;
	const { t } = useTranslation();
	const { navigate } = usePreventNavigate();

	const { token } = useDataSteps();
	const { mutate: requestCard, isLoading } = useRequestCard();


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
				onSuccess: () => navigate(paths.nationalCardImage),
				onError: (err) => {
					pushAlert({
						type: 'error',
						// TODO: needs to refactor but when? first backend needs to change it and give us the new version of the api
						// @ts-ignore: Unreachable code error
						messageText: err.error ? (err.error.message as string) : err.detail,
						hasConfirmAction: true,
						actions: {
							onConfirm() {
								// @ts-ignore: Unreachable code error
								if ((err.error.code as number) === 401) {
									navigate(paths.Home);
								}
							}
						}
					});
				}
			}
		);
	};

	const handleSubmitWithCard = () => {
		navigate(paths.selectCardType);
	};

	const menuList = [
		{
			id: '1',
			title: 'requestCardMenuTitle',
			subtitle: 'requestCardMenuSubTitle',
			onClick: throttle(handleSubmitWithCard, 3000)
		},
		{
			id: '2',
			title: 'refuseCardMenuTitle',
			subtitle: 'refuseCardMenuSubTitle',
			onClick: throttle(handleSubmitWithNoCard, 3000)
		}
	];

	if (isLoading) return <Loader showLoader />;
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
