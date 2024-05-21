import { FormLabel, Grid, Typography } from '@mui/material';
import { LargeSwitch } from './LargeSwitch';
import { SmallSwitch } from './SmallSwitch';
import { Props } from './type';

export default function SwitchAdapter(props: Props) {
	const { type = 'large', checked, onChange, label } = props;
    
	return (
		<Grid>
			<Grid
				container
				alignItems={'center'}
				gap={'8px'}
			>
				<FormLabel>
					<Typography variant='bodySm'>{label}</Typography></FormLabel>
				{type === 'large' ? (
					<LargeSwitch
						checked={checked}
						onChange={onChange}
					/>
				) : (
					<SmallSwitch
						checked={checked}
						onChange={onChange}
					/>
				)}
			</Grid>
		</Grid>
	);
}
