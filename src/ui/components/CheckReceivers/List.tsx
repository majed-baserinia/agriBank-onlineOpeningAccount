import { Divider, Grid, Typography, useTheme } from '@mui/material';
import trashIcon from 'assets/icon/trash.svg';
import { Fragment } from 'react';
import SvgToIcon from 'ui/htsc-components/SvgToIcon';
import { ListProps } from './type';

export default function List({ receivers, setReceivers }: ListProps) {
	const theme = useTheme();

	const handleDeleteReciever = (nationalNo: string) => {
		setReceivers((prev) => {
			return prev.filter((reciever) => reciever.nationalNo !== nationalNo);
		});
	};

	return receivers?.map((reciever, index) => {
		return (
			<Fragment key={reciever.nationalNo}>
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
						<Typography variant="bodyMd">{reciever.name}</Typography>
						<Typography
							variant="bodySm"
							sx={{
								color: theme.palette.grey[200]
							}}
						>
							{reciever.nationalNo}
						</Typography>
					</Grid>
					<Grid
						sx={{ cursor: 'pointer' }}
						onClick={() => handleDeleteReciever(reciever.nationalNo)}
					>
						<SvgToIcon
							icon={trashIcon}
							alt="remove"
						/>
					</Grid>
				</Grid>

				{receivers.length - 1 != index ? <Divider /> : null}
			</Fragment>
		);
	});
}
