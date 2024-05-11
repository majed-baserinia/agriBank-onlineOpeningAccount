import { ReactNode } from 'react';

export type Props = {
	list: {
		services: Item[];
		management: Item[];
	};
};

export type Item = {
	title: string;
	icon: ReactNode;
	onClick?: (e: React.SyntheticEvent) => void;
	routeTo?: string;
};
