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
	const matches = useMediaQuery(theme.breakpoints.down('sm'));

	const { addNewData, token, personalInfo } = useDataSteps();
	const { data: CardsList, mutate: getCardsList, isLoading } = useCardsList();
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
			addNewData({ cards: CardsList[0] });
			navigate(paths.selectCard, {
				replace: true
			});
		} else {
			const menuList = CardsList?.map((cardType, index) => {
				return {
					id: index,
					title: cardType.cardTypeTitle,
					onclick: () => {
						addNewData({ cards: cardType });
						navigate(paths.selectCard);
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
			<Grid>
				<BoxAdapter fullWidth={matches}>
					<Grid
						sx={{
							minHeight: matches ? '100vh' : 'calc(100% - 128px)',
							padding: matches ? '0' : '16px'
						}}
						container
						direction={'column'}
						gap={'24px'}
					>
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
