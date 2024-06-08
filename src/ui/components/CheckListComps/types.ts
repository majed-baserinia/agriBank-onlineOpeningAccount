export type AllowedNumbers = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type LabelListType = Record<AllowedNumbers, string>;
export type TypeListType = Record<keyof LabelListType, 'info' | 'error' | 'success'>;

export type rowType =
	| {
			sayadNumber: number;
			status: JSX.Element;
			serieAndSerial: string;
			amount: number;
			reason: string;
			date: string;
			action: JSX.Element;
	  }[]
	| undefined;
