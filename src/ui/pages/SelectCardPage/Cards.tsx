import { Typography } from '@mui/material';
import { CardPattern } from 'common/entities/CardsList/CardsListResponse';
import Carousel from 'ui/htsc-components/Carousel';
import { useCards } from 'ui/pages/SelectCardPage/useCards';

type Props = {
	className?: string;
	onCardSelected?: (selectedCard: CardPattern) => void;
};

export default function SelectableCards({ className, onCardSelected }: Props) {
	const cards = useCards();

	return (
		<Carousel.Root
			className={className}
			focusActiveSlide={{
				enabled: true,
				scalingFactor: 1.8
			}}
			gap={20}
			type="carousel"
			focusAt={'center'}
			perView={3}
			onAfterRun={(...args) => {
				console.log(args);
				// onCardSelected?.(
				// 	cards.cardPatternItems.find((v) => {
				// 		return v.cardPatternId.toString() === slide.slide.dataset.key;
				// 	})!
				// );
			}}
		>
			{mcokCards.cardPatternItems.map((data) => {
				return (
					<Carousel.Slide
						key={data.cardPatternId}
						className="max-w-xs"
						data-key={data.cardPatternId}
					>
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
