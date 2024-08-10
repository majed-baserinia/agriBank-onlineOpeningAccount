import { Typography, useTheme } from '@mui/material';
import { CardPattern, CardType } from 'common/entities/CardsList/CardsListResponse';
import Carousel from 'ui/htsc-components/Carousel';
import { useCards } from 'ui/pages/SelectCardPage/useCards';

type Props = {
	className?: string;
	cards: CardType;
	onActiveChange?: (card: CardPattern) => void;
};

export default function SelectableCards({ className, cards, onActiveChange }: Props) {
	const theme = useTheme();
	const mcokCards = useCards();

	return (
		<Carousel.Root
			className={className}
			focusActiveSlide={{
				enabled: true,
				scalingFactor: 1.8
			}}
			options={{
				type: 'loop',
				focus: 'center',
				perPage: 3,
				gap: '2em'
			}}
		>
			{mcokCards.cardPatternItems.map((data) => {
				return (
					<Carousel.Slide key={data.titleKey}>
						<img
							className="overflow-hidden rounded-lg"
							alt="card-image"
							src={data.picsAddress}
						></img>
						<Typography
							textAlign={'center'}
							sx={{ marginTop: '32px' }}
						>
							{data.title}
						</Typography>
					</Carousel.Slide>
				);
			})}
		</Carousel.Root>
	);
}
