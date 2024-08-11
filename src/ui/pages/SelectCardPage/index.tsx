import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useDataSteps } from 'business/stores/onlineOpenAccount/dataSteps';
import { CardPattern } from 'common/entities/CardsList/CardsListResponse';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import StagesListComp from 'ui/components/StagesListComp';
import Title from 'ui/components/Title';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import InputAdapter from 'ui/htsc-components/InputAdapter';
import ModalOrBottomSheet from 'ui/htsc-components/ModalOrBottomSheet';
import Stepper from 'ui/htsc-components/Stepper';
import SelectableCards from 'ui/pages/SelectCardPage/Cards';
import { getMockData } from 'ui/pages/SelectCardPage/mock-data';
import { paths } from 'ui/route-config/paths';
import { stagesList } from '../HomePage';

export default function SelectCardPage() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));

	const [open, setOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState<CardPattern>();
	const { cards = getMockData(), addNewData } = useDataSteps();
	const [identifier, setIdentifier] = useState<string>();

	const handleCardChange = (activeCard: CardPattern) => {
		setSelectedCard(activeCard);
	};

	const submitHandler = () => {
		if (selectedCard) {
			if (selectedCard?.hasIdentifier) {
				setOpen(true);
			} else {
				addNewData({
					selectedCardData: { ...selectedCard, cardInfoId: 0, identifierValue: '' }
				});
				navigate(paths.selectAddress);
			}
		}
	};

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
						<Grid>
							<Title>{t('openAccount')}</Title>
							{!matches ? (
								<Stepper
									list={[
										t('enterInformation'),
										t('activationCodeTitle'),
										t('commitmentLetter'),
										t('residenceBranch'),
										t('cardType'),
										t('cardDesign'),
										t('cardIssuance'),
										t('sendDocuments'),
										t('end')
									]}
									active={5}
								/>
							) : null}
							<Grid
								marginBottom={'64px'}
								container
								flexWrap={'nowrap'}
								gap={'8px'}
							>
								<Typography
									variant="bodyMd"
									sx={{ marginBottom: '8px' }}
								>
									{t('selectCardPageTitleText')}
								</Typography>
							</Grid>
							<Grid margin={'auto'}>
								<SelectableCards
									cards={cards}
									onCardSelected={handleCardChange}
								></SelectableCards>
							</Grid>
						</Grid>
						<Grid container>
							<ButtonAdapter
								variant="contained"
								size="medium"
								muiButtonProps={{ sx: { width: '100%', marginTop: '64px' } }}
								onClick={submitHandler}
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
						<StagesListComp list={stagesList} />
					</BoxAdapter>
				</Grid>
			)}

			<ModalOrBottomSheet
				breackpoint="sm"
				open={open}
				setOpen={setOpen}
				title=""
			>
				<Grid>
					<Typography>شناسه را وارد </Typography>
					<InputAdapter
						label=""
						onChange={(vlaue) => {
							setIdentifier(vlaue);
						}}
					/>
					<Grid container>
						<ButtonAdapter
							variant="contained"
							size="medium"
							muiButtonProps={{ sx: { width: '100%' } }}
							onClick={() => {
								setOpen(false);
								addNewData({
									selectedCardData: { ...selectedCard!, cardInfoId: 0, identifierValue: identifier! }
								});
								navigate(paths.selectAddress);
							}}
						>
							{t('confirm')}
						</ButtonAdapter>
					</Grid>
				</Grid>
			</ModalOrBottomSheet>
		</Grid>
	);
}
