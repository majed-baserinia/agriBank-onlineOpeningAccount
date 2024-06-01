import { Grid, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Menu from 'ui/components/Menu';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';

import useInquiryTransferStatus from 'business/hooks/cheque/transferCheck/useInquiryTransferStatus';
import { useChecklistData } from 'business/stores/checklistData/checklistData';
import { useEffect, useState } from 'react';
import FirstPersonView from 'ui/components/transferCheck/FirstPersonView';
import SecondOrMoreView from 'ui/components/transferCheck/SecondOrMoreView';
import UnknownView from 'ui/components/transferCheck/UnknownView';
import Loader from 'ui/htsc-components/loader/Loader';
import { menuList } from 'ui/pages/HomePage/menuList';

export default function CheckNewInfo() {
	const navigate = useNavigate();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const { selectedCheck } = useChecklistData((store) => store);
	const { data: inqueryStatusResponse, error, mutate: inqueryStatus, isLoading } = useInquiryTransferStatus();
	const [view, setView] = useState<'1' | '2' | '3'>('1');

	useEffect(() => {
		if (selectedCheck) {
			inqueryStatus(
				{ sayadNo: selectedCheck.sayadNo },
				{
					onError(error, variables, context) {},
					onSuccess(data, variables, context) {
						//check if ther is receivers on the response object and if it is,
						//it means that the fist person already started the transfer and the view should be 2
						if (data.receivers.length > 0) {
							setView('2');
						} else {
							setView('1');
						}
					}
				}
			);
		}
		//call an api for checking if it is persional or company and if it is first person or not
		//set a time out for the api call and if has no response set the view to 3
	}, []);

	return (
		<Grid
			container
			sx={{ padding: matches ? '0' : '64px 0' }}
			justifyContent={'center'}
			gap={'24px'}
			dir={theme.direction}
		>
			<Grid
				item
				xs={12}
				md={8}
			>
				{view === '1' ? <FirstPersonView /> : null}
				{view === '2' ? <SecondOrMoreView /> : null}
				{view === '3' ? <UnknownView /> : null}
			</Grid>

			{matches ? null : (
				<Grid
					item
					md={3}
					dir={theme.direction}
				>
					<BoxAdapter>
						<Menu
							divider={false}
							list={menuList.management}
						/>
						<Menu
							divider={false}
							list={menuList.services}
						/>
					</BoxAdapter>
				</Grid>
			)}
			<Loader showLoader={isLoading} />
		</Grid>
	);
}
