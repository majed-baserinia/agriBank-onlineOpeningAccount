import { Dialog, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Sheet from 'react-modal-sheet';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import AddForm from './AddForm';
import List from './List';

export default function CheckRecivers() {
	const { t } = useTranslation();
	const theme = useTheme();
	const isDownSm = useMediaQuery(theme.breakpoints.down('sm'));
	const [open, setOpen] = useState(false);

	return (
		<>
			<ButtonAdapter
				variant="outlined"
				size="medium"
				muiButtonProps={{ sx: { width: '100%' } }}
				onClick={() => setOpen(true)}
			>
				{t('add')}
			</ButtonAdapter>

			<List />

			{isDownSm ? (
				<Sheet
					isOpen={open}
					onClose={() => setOpen(false)}
					snapPoints={[450, 0]}
				>
					<Sheet.Container>
						<Sheet.Header />
						<Sheet.Content>
							<AddForm></AddForm>
						</Sheet.Content>
					</Sheet.Container>
					<Sheet.Backdrop />
				</Sheet>
			) : (
				<Dialog
					open={open}
					onClose={() => setOpen(false)}
				>
					<AddForm></AddForm>
				</Dialog>
			)}
		</>
	);
}
