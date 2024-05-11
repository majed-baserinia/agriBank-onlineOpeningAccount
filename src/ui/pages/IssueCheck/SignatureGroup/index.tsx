import { Grid, RadioGroup, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Menu from 'ui/components/Menu';
import Title from 'ui/components/Title';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import Stepper from 'ui/htsc-components/Stepper';
import { menuList } from '../../HomePage/menuList';
import infoIcon from 'assets/icon/info-circle.svg';
import { useEffect, useState } from 'react';
import DraggableList from 'ui/components/DraggableList';
import RadioButtonOpenable from 'ui/components/RadioButtonOpenable';
import ModalOrPage from 'ui/htsc-components/ModalOrPage';
import SvgToIcon from 'ui/htsc-components/SvgToIcon';
import { useDataSteps } from 'business/stores/issueCheck/dataSteps';

export default function SignatureGroup() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
	const [value, setValue] = useState('q');
	const { steps, setStepData } = useDataSteps((store) => store);

	console.log(steps);
	
	useEffect(() => {

	})
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
							gap={'16px'}
						>
							<Title>{t('activationElCheck')}</Title>
							{!matches ? (
								<Stepper
									list={[
										t('selectCheck'),
										t('checkInfo'),
										t('recivers'),
										t('issueSignature'),
										t('selectSignatureGroup'),
										t('end')
									]}
									active={4}
								/>
							) : null}
							<Typography
								variant="body1"
								sx={{ marginBottom: '16px' }}
							>
								{t('signatureGroupText')}
							</Typography>
							<Grid
								container
								spacing={'24px'}
								direction={'row'}
							>
								<RadioGroup
									value={value}
									onChange={(e) => {
										setValue(e.target.value);
									}}
									sx={{ width: '100%', marginLeft: '20px' }}
								>
									<RadioButtonOpenable
										label="asdv"
										groupParts={['asdf', 'adsfa', 'asdfga']}
										value={'q'}
										checked={value === 'q'}
										onChange={(e) => {
											setValue(e.target.value);
										}}
									/>
									<RadioButtonOpenable
										label="asdv"
										groupParts={['asdf', 'adsfa', 'asdfga']}
										value={'w'}
										checked={value === 'w'}
										onChange={(e) => {
											setValue(e.target.value);
										}}
									/>
									<RadioButtonOpenable
										label="asdv"
										groupParts={['asdf', 'adsfa', 'asdfga']}
										value={'e'}
										checked={value === 'e'}
										onChange={(e) => {
											setValue(e.target.value);
										}}
									/>
								</RadioGroup>
							</Grid>
						</Grid>

						<Grid container>
							<ButtonAdapter
								variant="contained"
								size="medium"
								muiButtonProps={{ sx: { width: '100%' } }}
								forwardIcon
								onClick={() => console.log()}
							>
								{t('continue')}
							</ButtonAdapter>
						</Grid>
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
						<Menu list={menuList} />
					</BoxAdapter>
				</Grid>
			)}
			<ModalOrPage breackpoint="sm">
				<Grid
					container
					direction={'column'}
					gap={'32px'}
					justifyContent={'space-between'}
					sx={{ borderRadius: '24px', padding: matchesSM ? '16px ' : '40px', height: '100%' }}
				>
					<Grid>
						<Grid
							container
							flexWrap={'nowrap'}
							gap={'8px'}
						>
							<SvgToIcon
								icon={infoIcon}
								alt="info"
							/>
							<Typography textOverflow={'ellipsis'}>{t('draggableListText')}</Typography>
						</Grid>
						<DraggableList
							list={[
								{ id: '1', text: 'Item 1' },
								{ id: '2', text: 'Item 2' },
								{ id: '3', text: 'Item 3' },
								{ id: '4', text: 'Item 4' }
							]}
							getData={(a) => {
								console.log(a);
							}}
						/>
					</Grid>
					<ButtonAdapter
						variant="contained"
						size="medium"
						muiButtonProps={{ sx: { width: '100%',marginTop:"16px" } }}
						onClick={() => console.log()}
					>
						{t('register')}
					</ButtonAdapter>
				</Grid>
			</ModalOrPage>
		</Grid>
	);
}
