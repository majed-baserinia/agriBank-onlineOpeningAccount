import { Grid, Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
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

const menuList = [
	{
		id: '1',
		title: 'requestCardMenuTitle',
		subtitle: 'requestCardMenuSubTitle',
		routeTo: paths.selectCardType
	},
	{
		id: '2',
		title: 'refuseCardMenuTitle',
		subtitle: 'refuseCardMenuSubTitle',
		routeTo: paths.nationalCardImage
	}
];
