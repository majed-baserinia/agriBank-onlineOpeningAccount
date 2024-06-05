import { Dialog, useMediaQuery, useTheme } from '@mui/material';
import { RecieverRequest } from 'common/entities/cheque/Digital Cheque/IssueChequeInitiate/IssueChequeInitiateRequest';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Sheet from 'react-modal-sheet';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import AddForm from './AddForm';
import List from './List';
import { CheckReceiversProps } from './type';

export default function CheckReceivers(props: CheckReceiversProps) {
	const { getRceivers } = props;
	const { t } = useTranslation();
	const theme = useTheme();
	const isDownSm = useMediaQuery(theme.breakpoints.down('sm'));
	const [open, setOpen] = useState(false);
	const [receivers, setReceivers] = useState<RecieverRequest[]>([]);

	useEffect(() => {
		getRceivers(receivers);
	}, [receivers]);

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

			<List
				receivers={receivers}
				setReceivers={setReceivers}
			/>

			{isDownSm ? (
				<Sheet
					isOpen={open}
					onClose={() => setOpen(false)}
					snapPoints={[450, 0]}
				>
					<Sheet.Container>
						<Sheet.Header />
						<Sheet.Content>
							<AddForm
								setOpen={setOpen}
								setReceivers={setReceivers}
							/>
						</Sheet.Content>
					</Sheet.Container>
					<Sheet.Backdrop />
				</Sheet>
			) : (
				<Dialog
					open={open}
					onClose={() => setOpen(false)}
				>
					<AddForm
						setOpen={setOpen}
						setReceivers={setReceivers}
					/>
				</Dialog>
			)}
		</>
	);
}
