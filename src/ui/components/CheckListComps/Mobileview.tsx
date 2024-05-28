import { Grid } from '@mui/material';
import { CartableInquiryResponse } from 'common/entities/cheque/chekList/CartableInquiry/CartableInquiryResponse';
import CheckItemCard from './CheckItemCard';

export default function MobileView({ cartableList }: { cartableList?: CartableInquiryResponse }) {
	return (
		<Grid
			container
			justifyContent={'center'}
			gap={'16px'}
		>
			{cartableList?.cheques.map((check) => (
				<CheckItemCard
					key={check.sayadNo}
					check={check}
				/>
			))}
		</Grid>
	);
}
