import { Grid, RadioGroup, Typography, useMediaQuery, useTheme } from '@mui/material';
import { InquiryTransferStatusRespone } from 'common/entities/cheque/transferCheck/InquiryTransferStatus/InquiryTransferStatusResponse';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PersonsList from 'ui/components/CheckOverview/PersonsList';
import CheckOverViewBox from 'ui/components/CheckOverviewBox';
import Title from 'ui/components/Title';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import RadioButtonAdapter from 'ui/htsc-components/RadioButtonAdapter';
import Stepper from 'ui/htsc-components/Stepper';

export default function SecondOrMoreView({ checkData }: { checkData: InquiryTransferStatusRespone }) {
	const { t } = useTranslation();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const [value, setValue] = useState('1');

	const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue((event.target as HTMLInputElement).value);
	};

	return (
		<BoxAdapter fullWidth={matches}>
			<Grid
				minHeight={matches ? 'calc(100vh - 64px)' : 'calc(100vh - 192px)'}
				container
				direction={'column'}
				wrap="nowrap"
				justifyContent={'space-between'}
			>
				<Grid
					container
					direction={'column'}
					gap={'16px'}
				>
					<Title>{t('transferCheckEl')}</Title>
					{!matches ? (
						// TODO: check if selected compony or homself acocunt and add one more step if it is compony
						<Stepper
							list={[t('checkInfo'), t('verificationCode'), t('end')]}
							active={0}
						/>
					) : null}

					<CheckOverViewBox
						amount={Number(checkData?.amount)}
						sayadNo={Number(checkData?.sayadId)}
					/>
					<PersonsList
						recievers={checkData.receivers}
						holders={checkData.holders}
					/>
					<Typography>{t('confirmOrRejectTransferText')}</Typography>
					<RadioGroup
						dir={theme.direction}
						name="confirmOrReject"
						value={value}
						onChange={handleRadioChange}
					>
						<Grid
							sx={{
								display: 'flex',
								flexDirection: matches ? 'column' : 'row',
								gap: '16px',
								width: '100%'
							}}
						>
							<RadioButtonAdapter
								value="1"
								label={t('confirmTransfer')}
								onChange={handleRadioChange}
								checked={value == '1'}
							/>
							<RadioButtonAdapter
								value="2"
								label={t('rejectTransfer')}
								onChange={handleRadioChange}
								checked={value == '2'}
							/>
						</Grid>
					</RadioGroup>
				</Grid>
				<Grid container>
					<ButtonAdapter
						variant="contained"
						size="medium"
						muiButtonProps={{ sx: { width: '100%', marginTop: '16px' } }}
						forwardIcon
						onClick={() => console.log()}
					>
						{t('continue')}
					</ButtonAdapter>
				</Grid>
			</Grid>
		</BoxAdapter>
	);
}
