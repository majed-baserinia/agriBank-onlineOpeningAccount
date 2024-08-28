import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useDataSteps } from 'business/stores/onlineOpenAccount/dataSteps';
import { CardPattern } from 'common/entities/CardsList/CardsListResponse';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import SelectableCards from 'ui/components/SelectableCards';
import StagesListComp from 'ui/components/StagesListComp';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import Stepper from 'ui/htsc-components/Stepper';
import { paths } from 'ui/route-config/paths';
import { stagesList } from '../HomePage';

export default function SelectCardPage() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const { cards, addNewData } = useDataSteps();

	const [selectedCard, setSelectedCard] = useState<CardPattern>();

	const handleCardChange = (activeCard: CardPattern) => {
		setSelectedCard(activeCard);
	};

	const submitHandler = () => {
		if (selectedCard) {
			addNewData({ selectedCardData: selectedCard });
			navigate(paths.selectAddress);
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
				<BoxAdapter
					fullWidth={matches}
					muiPaperProps={{ sx: { minWidth: '25%', padding: '0px' } }}
				>
					<Grid
						minHeight={matches ? 'calc(100vh - 64px)' : 'calc(100vh - 192px)'}
						container
						direction={'column'}
						wrap="nowrap"
					>
						<Grid
							sx={{
								padding: '32px 32px 0 32px'
							}}
						>
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
						</Grid>
						<Grid>
							<SelectableCards
								cards={cards!}
								onCardSelected={handleCardChange}
							/>
						</Grid>
						<Grid
							sx={{
								padding: '32px'
							}}
							marginTop={'auto'}
							container
						>
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
		</Grid>
	);
}
