import { Grid, Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import BottomSheetAdapter from 'ui/htsc-components/BottomSheetAdapter/BottomSheetAdapter';
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
		<BottomSheetAdapter
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
		</BottomSheetAdapter>
	);
}

const menuList = [
	{
		id: '1',
		title: 'requestCardMenuTitle',
		subtitle: 'requestCardMenuSubTitle',
		routeTo: paths.selectCard
	},
	{
		id: '2',
		title: 'refuseCardMenuTitle',
		subtitle: 'refuseCardMenuSubTitle',
		routeTo: paths.nationalCardImage
	}
];
