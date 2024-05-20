import { Divider, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import BottomSheetActionButton, { checkActionsMenuList } from 'ui/components/CheckListComps/BottomSheetActionButton';
import Menu from 'ui/components/Menu';
import OverviewItem from 'ui/components/OverviewItem';
import Title from 'ui/components/Title';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import ChipStatusAdapter from 'ui/htsc-components/ChipStatusAdapter';
import Loader from 'ui/htsc-components/loader/Loader';

export default function Details() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));

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

							<Grid
								container
								item
								justifyContent={'space-between'}
								alignItems={'center'}
								sx={{
									border: `1px solid ${theme.palette.grey[50]}`,
									borderRadius: '16px',
									padding: '16px'
								}}
								gap={'16px'}
							>
								<Typography
									variant="bodySm"
									fontWeight={'medium'}
								>
									{t('checkStatus')}
								</Typography>
								<Grid>
									<ChipStatusAdapter
										size="small"
										label="test"
										type="info"
									/>
								</Grid>
								<OverviewItem
									title={t('checkGuaranteeStatus')}
									value={'overviewData?.sayadNo'}
								/>
								<OverviewItem
									title={t('checkBlocking')}
									value={'overviewData?.sayadNo'}
								/>
							</Grid>
							<Grid
								container
								direction={'column'}
								gap={'16px'}
								sx={{ padding: '16px' }}
							>
								<Typography
									align={matches ? 'center' : 'inherit'}
									variant="bodyMd"
									fontWeight={'bold'}
									color={theme.palette.grey[700]}
								>
									{t('sayadCheckInquery')}
								</Typography>
								<OverviewItem
									title={t('sayadNo')}
									value={'overviewData?.sayadNo'}
								/>
								<OverviewItem
									title={t('series')}
									value={'overviewData?.sayadNo'}
								/>
								<OverviewItem
									title={t('serial')}
									value={'overviewData?.sayadNo'}
								/>
								<Divider />
								<OverviewItem
									title={t('shebaOrigin')}
									value={'overviewData?.amount'}
								/>
								<OverviewItem
									title={t('amount')}
									value={'overviewData?.amount'}
								/>
								<OverviewItem
									title={t('dueDate')}
									value={'overviewData?.dueDate'}
								/>
								<OverviewItem
									title={t('checkIssueDate')}
									value={'overviewData?.dueDate'}
								/>
								<OverviewItem
									title={t('reason')}
									value={'overviewData?.reason'}
								/>
								<Divider />
								<OverviewItem
									title={t('checkIssueDate')}
									value={'overviewData?.dueDate'}
								/>
								<OverviewItem
									title={t('reason')}
									value={'overviewData?.reason'}
								/>
								<Divider />
								<Typography
									variant="bodySm"
									fontWeight={'medium'}
								>
									{t('description')}
								</Typography>
								<Typography variant="bodySm">{'overviewData?.description'}</Typography>
							</Grid>

							<Grid
								sx={{
									border: `1px solid ${theme.palette.divider}`,
									borderRadius: '16px',
									padding: '16px',
									margin: '16px 0'
								}}
							>
								<Typography
									variant="bodyMd"
									fontWeight={'medium'}
								>
									{t('recivers')}
								</Typography>
								{/* {overviewData?.recievers?.map((receiver, index) => {
                                return (
                                    <Fragment key={receiver.name}>
                                        <OverviewParts
                                            type="receiver"
                                            receiverData={{ ...receiver }}
                                        />
                                        {overviewData.recievers.length - 1 != index ? <Divider /> : null}
                                    </Fragment>
                                );
                            })} */}

								<Typography
									variant="bodyMd"
									fontWeight={'medium'}
									sx={{ marginTop: '16px' }}
								>
									{t('signers')}
								</Typography>

								{/* {overviewData?.signers[0].withdrawalGroups?.map((signer, index) => {
                                return (
                                    <Fragment key={index}>
                                        <OverviewParts
                                            type="signer"
                                            signerData={{ ...signer }}
                                        />
                                        {overviewData.recievers.length - 1 != index ? <Divider /> : null}
                                    </Fragment>
                                );
                            })} */}
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
