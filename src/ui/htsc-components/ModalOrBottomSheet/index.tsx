import CloseIcon from '@mui/icons-material/Close';
import {
	Dialog,
	DialogContent,
	DialogTitle,
	Grid,
	IconButton,
	PaperProps,
	Typography,
	useMediaQuery,
	useTheme
} from '@mui/material';
import { pushAlert } from 'business/stores/AppAlertsStore';
import { ReactNode } from 'react';
import Sheet from 'react-modal-sheet';
import { usePreventNavigate } from 'business/hooks/usePreventNavigate';
import { paths } from 'ui/route-config/paths';
import { useTranslation } from 'react-i18next';

type Props = {
	breackpoint: 'md' | 'sm' | 'lg' | 'xs';
	children: ReactNode;
	snapPoints?: number[];
	ModalpaperProps?: PaperProps;
	open: boolean;
	setOpen: (value: boolean) => void;
	title: string;
};

export default function ModalOrBottomSheet(props: Props) {
	const { breackpoint, children, snapPoints = [450, 0], ModalpaperProps, open, setOpen, title } = props;
	const theme = useTheme();
	const isMatched = useMediaQuery(theme.breakpoints.down(breackpoint));
	const { navigate } = usePreventNavigate();
	const { t } = useTranslation();

	return isMatched ? (
		<Sheet
			isOpen={open}
			onClose={() => {
				// setOpen(false)
				pushAlert({
					type: 'warning',
					messageText: t("backButtonText"),
					hasRefuseAction: true,
					hasConfirmAction: true,
					actions: {
						onConfirm: () => {
							navigate(paths.Home);
						},
					}
				});
			}}
			snapPoints={snapPoints}
		>
			<Sheet.Container style={{ backgroundColor: theme.palette.background.paper, padding: '16px' }}>
				<Sheet.Header style={{ marginBottom: '16px' }}>
					<Typography
						variant="bodyLg"
						fontWeight={'bold'}
					>
						{title}
					</Typography>
				</Sheet.Header>
				<Sheet.Content>{children}</Sheet.Content>
			</Sheet.Container>
			<Sheet.Backdrop onTap={(e) => e.preventDefault()} />
		</Sheet>
	) : (
		<Dialog
			open={open}
			onClose={() => {
				// setOpen(false)
				pushAlert({
					type: 'warning',
					messageText: t("backButtonText"),
					hasRefuseAction: true,
					hasConfirmAction: true,
					actions: {
						onConfirm: () => {
							navigate(paths.Home);
						},
					}
				});
			}}
			PaperProps={ModalpaperProps}
			fullWidth
		>
			<DialogTitle>
				<Grid
					container
					justifyContent={'space-between'}
					alignItems={'center'}
				>
					<Typography
						variant="bodyLg"
						fontWeight={'bold'}
					>
						{title}
					</Typography>
					<IconButton onClick={() => {
						// setOpen(false)
						pushAlert({
							type: 'warning',
							messageText: t("backButtonText"),
							hasRefuseAction: true,
							hasConfirmAction: true,
							actions: {
								onConfirm: () => {
									navigate(paths.Home);
								},
							}
						});
					}}>
						<CloseIcon />
					</IconButton>
				</Grid>
			</DialogTitle>
			<DialogContent>{children}</DialogContent>
		</Dialog>
	);
}
