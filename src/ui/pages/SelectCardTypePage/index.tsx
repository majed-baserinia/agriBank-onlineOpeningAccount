import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import infoIcon from 'assets/icon/info-circle.svg';
import useCardsList from 'business/hooks/useCardLists';
import { useDataSteps } from 'business/stores/onlineOpenAccount/dataSteps';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Menu from 'ui/components/Menu';
import StagesListComp from 'ui/components/StagesListComp';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import Stepper from 'ui/htsc-components/Stepper';
import SvgToIcon from 'ui/htsc-components/SvgToIcon';
import Loader from 'ui/htsc-components/loader/Loader';
import { paths } from 'ui/route-config/paths';
import { stagesList } from '../HomePage';

type MenuItems = {
	id: number;
	title: string;
	subtitle?: string;
	routeTo?: string;
	onClick?: () => void;
}[];

export default function SelectCardTypePage() {
	const { t } = useTranslation();
	const theme = useTheme();
	const navigate = useNavigate();
	const matches = useMediaQuery(theme.breakpoints.down('md'));

	const { addNewData, token, personalInfo } = useDataSteps();

	const { data: CardsList, mutate: getCardsList, isLoading } = useCardsList(personalInfo?.accountCode!);
	const [menuItems, setMenuItems] = useState<MenuItems>([]);

	useEffect(() => {
		getCardsList(
			{ accountCode: personalInfo?.accountCode! },
			{
				onSuccess: (res) => {},
				onError: (error) => {}
			}
		);
	}, []);

	useEffect(() => {
		if (CardsList?.length === 1) {
			// ir there is only one item, we presume that it is selected
			addNewData({ cards: CardsList[0] });
			navigate(paths.selectCard, {
				replace: true
			});
		} else {
			const menuList = CardsList?.map((cardType, index) => {
				return {
					id: index,
					title: cardType.cardTypeTitle,
					onClick: () => {
						if (cardType.cardPatternItems.length === 1) {
							// if only there is one pattern we presume that it is selected
							addNewData({ selectedCardData: cardType.cardPatternItems[0] });
							navigate(paths.selectAddress);
						} else {
							addNewData({ cards: cardType });
							navigate(paths.selectCard);
						}
					}
				};
			});

			if (menuList) {
				setMenuItems(menuList);
			}
		}
	}, [CardsList]);

	//display the loader this way to user becouse user shouldn't see the page if there is no Checks that user represent or sign.
	if (isLoading) return <Loader showLoader />;

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
						gap={'16px'}
					>
						<Grid>
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
									active={4}
								/>
							) : null}
							<Grid
								container
								gap={'8px'}
							>
								<SvgToIcon
									icon={infoIcon}
									alt="info"
								/>
								<Typography
									variant="bodyMd"
									sx={{ color: theme.palette.text.secondary }}
								>
									{t('CardTypesSelectText')}
								</Typography>
							</Grid>
							<Grid
								dir={theme.direction}
								container
								direction={'column'}
								gap={'56px'}
							>
								<Menu list={menuItems} />
							</Grid>
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
