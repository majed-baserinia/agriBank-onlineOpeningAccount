import { Grid } from '@mui/material';
import { useEffect } from 'react';
import CheckItemCard from './CheckItemCard';

export default function MobileView() {
	
	useEffect(() => {
		//get the list of checks from props and render the items based on them
	}, []);

	return (
		<Grid
			container
			justifyContent={'center'}
			gap={'16px'}
		>
			<CheckItemCard />
			<CheckItemCard />
			<CheckItemCard />
			<CheckItemCard />
			<CheckItemCard />
		</Grid>
	);
}
