import { Typography, useTheme } from '@mui/material';
import { CardPattern, CardType } from 'common/entities/CardsList/CardsListResponse';
import Carousel from 'ui/htsc-components/Carousel';

type Props = {
	className?: string;
	cards: CardType;
	onCardSelected?: (card: CardPattern) => void;
};

export default function SelectableCards({ className, cards, onCardSelected }: Props) {
	const theme = useTheme();
	const handleCardChanged = (glide: Glide) => {
		onCardSelected?.(cards.cardPatternItems[glide.index]);
	};

	return (
		<Carousel.Root
			className={className}
			focusActiveSlide={{
				enabled: true,
				scalingFactor: 1.8
			}}
			type="carousel"
			focusAt={'center'}
			perView={3}
			onAfterMount={(glide) => {
				handleCardChanged(glide);
			}}
			onAfterRun={(glide) => {
				handleCardChanged(glide);
			}}
			breakpoints={{
				[theme.breakpoints.values.sm]: {
					peek: -100
				}
			}}
			gridProps={{
				md: 9,
				xl: 8,
				margin: 'auto'
			}}
		>
			{cards.cardPatternItems.map((data) => {
				return (
					<Carousel.Slide key={data.cardPatternId}>
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
