import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useChecklistData } from 'business/stores/checklistData/checklistData';
import { Check } from 'common/entities/cheque/chekList/CartableInquiry/CartableInquiryResponse';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import BottomSheetActionButton, { checkActionsMenuList } from 'ui/components/CheckListComps/BottomSheetActionButton';
import { AllowedNumbers } from 'ui/components/CheckListComps/types';
import BasicCheckDetials from 'ui/components/CheckOverview/BasicCheckDetials';
import CheckStatus from 'ui/components/CheckOverview/CheckStatus';
import Menu from 'ui/components/Menu';
import Title from 'ui/components/Title';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import Loader from 'ui/htsc-components/loader/Loader';

export default function Details() {
	const sayadNumber = new URLSearchParams(window.location.search).get('sayadNo');
	const navigate = useNavigate();
	const { t } = useTranslation();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const { cartableListData } = useChecklistData((store) => store);
	const [overViewDate, setOverViewDate] = useState<Check>();

	useEffect(() => {
		const selectedCheckDetail = cartableListData?.cheques.find((item) => item.sayadNo.toString() === sayadNumber);
		setOverViewDate(selectedCheckDetail);
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
				<BoxAdapter fullWidth={matches}>
					<Grid
						minHeight={matches ? 'calc(100vh - 64px)' : 'calc(100vh - 192px)'}
						container
						direction={'column'}
						justifyContent={'space-between'}
						wrap="nowrap"
					>
						<Grid
							container
							direction={'column'}
							gap={'8px'}
						>
							<Title>{t('checkDetailPageTitle')}</Title>

							<CheckStatus
								checkBlockingStatus={overViewDate?.blockStatusDescription}
								checkGuaranteeStatus={overViewDate?.guaranteeStatusDescription}
								checkStatus={overViewDate?.chequeStatus as AllowedNumbers}
							/>
							<Typography
								align={matches ? 'center' : 'inherit'}
								variant="bodyMd"
								fontWeight={'bold'}
								color={theme.palette.grey[700]}
							>
								{t('sayadCheckInquery')}
							</Typography>

							{/* //TODO: send the data to overview component */}
							<Grid>
								<BasicCheckDetials
									amount={overViewDate?.amount}
									description={overViewDate?.description}
									dueDate={overViewDate?.dueDate}
									sayadNo={overViewDate?.sayadNo}
									reason={overViewDate?.reasonDescription}
									serialSerie={overViewDate?.seriesNo + '/' + overViewDate?.serialNo}
								/>
								{/* <PersonsList
									recievers={overViewDate?.}
									signers={overviewData?.signers}
								/> */}
							</Grid>
						</Grid>

						<Grid container>{matches ? <BottomSheetActionButton /> : null}</Grid>
					</Grid>
				</BoxAdapter>
			</Grid>
			{matches ? null : (
				<Grid
					item
					md={3}
					dir={theme.direction}
				>
					<BoxAdapter>
						<Menu list={checkActionsMenuList} />
					</BoxAdapter>
				</Grid>
			)}
			<Loader showLoader={false} />
		</Grid>
	);
}
