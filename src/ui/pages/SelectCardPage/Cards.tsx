import { useTheme } from '@mui/material';
import Carousel from 'ui/htsc-components/Carousel';
import { useCards } from 'ui/pages/SelectCardPage/useCards';

type Props = {
	className?: string;
};

export default function SelectableCards({ className }: Props) {
	const theme = useTheme();
	const cards = useCards();

	return (
		<Carousel.Root
			setDefaultOptions={true}
			focusCenter={{
				enable: true,
				scalingFactor: 1.8
			}}
			className={className}
			options={{
				type: 'loop',
				focus: 'center',
				perPage: 3,
				speed: 500,
				flickPower: 300,
				flickMaxPages: 1
			}}
		>
			{cards.cardPatternItems.map((data) => {
				return (
					<Carousel.Slide key={data.titleKey}>
						<img
							className="overflow-hidden rounded-lg"
							alt="card-image"
							src={data.picsAddress}
						></img>
					</Carousel.Slide>
				);
			})}
		</Carousel.Root>
	);
}
