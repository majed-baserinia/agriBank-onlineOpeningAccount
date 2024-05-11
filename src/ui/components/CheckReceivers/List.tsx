import { Divider, Grid, useTheme } from '@mui/material';
import trashIcon from 'assets/icon/trash.svg';
import { useDataSteps } from 'business/stores/issueCheck/dataSteps';
import { Fragment } from 'react';
import SvgToIcon from 'ui/htsc-components/SvgToIcon';

export default function List() {
	const theme = useTheme();
	const { steps,removeReceiver } = useDataSteps((store) => store);

	const handleDeleteReciever = (id: string) => {
		removeReceiver(id)
		//fined the person
		//delete it
		//or implement the delete function in the store itself
	};

	return steps?.receivers?.map((reciever, index) => {
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
						<span style={{ fontSize: '14px' }}>{reciever.name}</span>
						<span
							style={{
								fontSize: '10px',
								color: theme.palette.grey[200]
							}}
						>
							{reciever.nationalNo}
						</span>
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

				{steps?.receivers.length - 1 != index ?  <Divider /> : null}
			</Fragment>
		);
	});
}
