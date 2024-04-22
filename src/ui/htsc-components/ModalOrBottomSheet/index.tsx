import { Dialog, useMediaQuery, useTheme } from '@mui/material';
import { ReactNode, useState } from 'react';
import Sheet from 'react-modal-sheet';

type Props = {
	breackpoint: 'md' | 'sm' | 'lg' | 'xs';
	children: ReactNode;
    snapPoints?: number[]
};

export default function ModalOrBottomSheet(props: Props) {
	const { breackpoint, children, snapPoints =  [450, 0]} = props;
	const theme = useTheme();
	const isMatched = useMediaQuery(theme.breakpoints.down(breackpoint));

	const [open, setOpen] = useState(true);

	return isMatched ? (
		<Sheet
			isOpen={open}
			onClose={() => setOpen(false)}
			snapPoints={snapPoints}
		>
			<Sheet.Container>
				<Sheet.Header />
				<Sheet.Content>{children}</Sheet.Content>
			</Sheet.Container>
			<Sheet.Backdrop />
		</Sheet>
	) : (
		<Dialog
			open={open}
			onClose={() => setOpen(false)}
		>
			{children}
		</Dialog>
	);
}
