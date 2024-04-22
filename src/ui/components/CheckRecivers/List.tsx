import { Divider, Grid, useTheme } from '@mui/material';
import trashIcon from 'assets/icon/trash.svg';
import SvgToIcon from 'ui/htsc-components/SvgToIcon';

export default function List() {
	const theme = useTheme();

	return (
		<>
			<Grid
				container
				justifyContent={'center'}
				alignItems="Center"
				gap={'5px'}
				wrap="nowrap"
				sx={{ margin: '10px 0' }}
			>
				<Grid
					container
					direction={'column'}
					alignItems="flex-start"
					gap={'5px'}
				>
					<span style={{ fontSize: '14px' }}>name</span>
					<span
						style={{
							fontSize: '10px',
							color: theme.palette.grey[200]
						}}
					>
						account
					</span>
				</Grid>
				<Grid sx={{cursor: "pointer"}} onClick={()=>{}}>
					<SvgToIcon
						icon={trashIcon}
						alt="remove"
					/>
				</Grid>
			</Grid>

			<Divider />
		</>
	);
}
