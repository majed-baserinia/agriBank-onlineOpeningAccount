import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Menu from 'ui/components/Menu';
import Title from 'ui/components/Title';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import Stepper from 'ui/htsc-components/Stepper';
import SvgToIcon from 'ui/htsc-components/SvgToIcon';

import infoIcon from 'assets/icon/info-circle.svg';
import sendAaginIcon from 'assets/icon/refresh-alert.svg';
import useIssueChequeInitiateSignature from 'business/hooks/cheque/Digital Cheque/useIssueChequeInitiateSignature';
import useIssueChequeVerifyInitiate from 'business/hooks/cheque/Digital Cheque/useIssueChequeVerifyInitiate';
import { pushAlert } from 'business/stores/AppAlertsStore';
import { useDataSteps } from 'business/stores/issueCheck/dataSteps';
import SelectSignature from 'ui/components/SelectSignature';
import ModalOrBottomSheet from 'ui/htsc-components/ModalOrBottomSheet';
import Loader from 'ui/htsc-components/loader/Loader';
import { paths } from 'ui/route-config/paths';
import { menuList } from '../../HomePage/menuList';

export default function SignatureRegistration() {
	const theme = useTheme();
	const navigate = useNavigate();
	const { t } = useTranslation();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const { steps, setStepData } = useDataSteps((store) => store);

	const [openModal, setOpenModal] = useState(false);
	const [selectedSigniture, setSelectedSigniture] = useState<'group' | 'myslef'>();
	const { mutate: issueChequeInitiateSignature } = useIssueChequeInitiateSignature();
	const { mutate: issueChequeVerifyInitiate, isLoading } = useIssueChequeVerifyInitiate();

	useEffect(() => {
		handleIssueChequeInitiateSignature();
	}, []);

	const handleIssueChequeInitiateSignature = () => {
		issueChequeInitiateSignature(
			{ issueChequeKey: steps.signitureRequirementData?.issueChequeKey! },
			{
				onError: (err) => {
					pushAlert({ type: 'error', messageText: err.detail, hasConfirmAction: true });
				},
				onSuccess: (res) => {
					pushAlert({ type: 'info', messageText: res.message, hasConfirmAction: true });
				}
			}
		);
	};

	useEffect(() => {
		if (selectedSigniture) {
			const requestData = {
				issueChequeKey: steps.signitureRequirementData?.issueChequeKey!,
				otpCode: '',
				signSingleSignatureLegal: selectedSigniture === 'myslef'
			};

			issueChequeVerifyInitiate(requestData, {
				onError: (err) => {
					pushAlert({ type: 'error', messageText: err.detail, hasConfirmAction: true });
				},
				onSuccess: (res) => {
					if (res.needInquiryWithDrawalGroup) {
						if (selectedSigniture === 'myslef') {
							setStepData({ overviewData: res.issueChequeOverView });
						}
						navigate(paths.IssueCheck.OverViewPath);
					} else {
						navigate(paths.IssueCheck.SignatureGroupPath);
					}
				}
			});
		}
	}, [selectedSigniture]);


	return (
		<Grid
			container
			sx={{ padding: matches ? '0' : '64px 0' }}
			justifyContent={'center'}
			gap={'24px'}
			dir={theme.direction}
		>
			<Grid
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
						<Grid>
							<Title>{t('activationElCheck')}</Title>
							{!matches ? (
								<Stepper
									list={[
										t('selectCheck'),
										t('checkInfo'),
										t('recivers'),
										t('issueSignature'),
										t('end')
									]}
									active={3}
								/>
							) : null}

							<Grid
								container
								flexWrap={'nowrap'}
								gap={'8px'}
							>
								<SvgToIcon
									icon={infoIcon}
									alt="info"
								/>
								<Typography
									variant="body1"
									sx={{ marginBottom: '8px' }}
								>
									{t('activationSecondStepText')}
								</Typography>
							</Grid>
							<Grid
								container
								alignItems={'baseline'}
							>
								<Typography sx={{ margin: '0 24px' }}>{t('dontRecieveMessage')}</Typography>
								<ButtonAdapter onClick={handleIssueChequeInitiateSignature}>
									{t('sendAgain')}
									<span>
										<SvgToIcon
											icon={sendAaginIcon}
											alt="send again"
										/>
									</span>
								</ButtonAdapter>
							</Grid>
						</Grid>
						<Grid container>
							<ButtonAdapter
								variant="contained"
								size="medium"
								muiButtonProps={{ sx: { width: '100%' } }}
								onClick={() => setOpenModal(true)}
							>
								{t('FinalSignatureRegistration')}
							</ButtonAdapter>
						</Grid>
					</Grid>
				</BoxAdapter>
			</Grid>
			{matches ? null : (
				<Grid
					md={3}
					dir={theme.direction}
				>
					<BoxAdapter>
						<Menu list={menuList} />
					</BoxAdapter>
				</Grid>
			)}
			<ModalOrBottomSheet
				breackpoint="sm"
				snapPoints={[400, 0]}
				open={openModal}
				setOpen={setOpenModal}
			>
				<SelectSignature setSelectedSigniture={setSelectedSigniture} />
			</ModalOrBottomSheet>
			<Loader showLoader={isLoading} />
		</Grid>
	);
}
