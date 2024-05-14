import { ReactNode } from 'react';

type Item = {
	title: string;
	subtitle?: string;
	icon?: ReactNode;
	routeTo: string;
};
export interface Props {
	list: Item[];
	menuTitle?: string;
	divider?: boolean;
}
