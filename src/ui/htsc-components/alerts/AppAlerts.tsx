import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	Typography,
	useTheme
} from '@mui/material';
import { clearAlert, useAlert } from 'business/stores/AppAlertsStore';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import ButtonAdapter from '../ButtonAdapter';
import AlertIcon from './alertIcon';
import { AppAlert } from './type';

export default function AppAlerts() {
	const { alerts } = useAlert();
	const { t } = useTranslation();
	const theme = useTheme();
	const [open, setOpen] = useState(true);
	const [localAlerts, setLocalAlerts] = useState<AppAlert[]>([]);
	const capturedAlert = localAlerts[0];

	useEffect(() => {
		setLocalAlerts([...alerts]);
		if (alerts.length) {
			setOpen(true);
		}
	}, [alerts]);

	const mappedType =
		capturedAlert?.type === 'errorWithConfirmation'
			? 'error'
			: capturedAlert?.type === 'warningWithConfirmation'
				? 'warning'
				: capturedAlert?.type;

	// const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
	//   if (reason === "clickaway") {
	//     return;
	//   }

	//   setOpen(false);
	//   clearApiError();
	// };

	capturedAlert?.type === 'errorWithConfirmation' || capturedAlert?.type === 'warningWithConfirmation'
		? capturedAlert.actions?.onConfirm?.()
		: null;
	return localAlerts.length > 0 ? (
		<Dialog
			onClose={(e) => {
				setOpen(false);
				clearAlert();
				setLocalAlerts([]);
				capturedAlert?.actions?.onCloseModal?.();
			}}
			open={open}
			PaperProps={{
				sx: { padding: '32px', borderRadius: '24px' }
			}}
			maxWidth={'xs'}
			fullWidth
		>
			<Grid
				container
				justifyContent={'center'}
				alignItems={'center'}
			>
				<AlertIcon type={mappedType} />
			</Grid>
			<DialogTitle sx={{ margin: 'auto' }}>
				<Typography
					variant="bodyLg"
					fontWeight={'bold'}
				>
					{t(mappedType)}
				</Typography>
			</DialogTitle>

			<DialogContent sx={{ margin: 'auto', direction: theme.direction }}>
				<DialogContentText>
					<Typography variant="bodySm">{capturedAlert?.messageText}</Typography>
				</DialogContentText>
			</DialogContent>

			<DialogActions sx={{ justifyContent: 'center' }}>
				{capturedAlert?.hasConfirmAction ? (
					<ButtonAdapter
						onClick={() => {
							setOpen(false);
							clearAlert();
							setLocalAlerts([]);
							capturedAlert?.actions?.onConfirm?.();
						}}
						variant={'contained'}
					>
						{t('IUnderstand')}
					</ButtonAdapter>
				) : null}
				{capturedAlert?.hasContinueAction ? (
					<ButtonAdapter
						onClick={() => {
							setOpen(false);
							clearAlert();
							setLocalAlerts([]);
							capturedAlert.actions?.onContinue?.();
						}}
						variant={'contained'}
					>
						{t('continue')}
					</ButtonAdapter>
				) : null}
			</DialogActions>
		</Dialog>
	) : undefined;
}
