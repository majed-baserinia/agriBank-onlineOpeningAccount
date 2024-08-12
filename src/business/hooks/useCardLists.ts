import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import { ErrorType } from 'common/entities/ErrorType';

import CardsListCommand from 'business/application/onlineOpenAccount/CardsList/CardsListQuery';
import { CardsListRequest } from 'common/entities/CardsList/CardsListRequest';
import { CardsListResponse } from 'common/entities/CardsList/CardsListResponse';

const mediator = new Mediator();

export default function useCardsList(accountCode: string) {
	return useMutation<CardsListResponse, ErrorType<CardsListRequest>, CardsListCommand>({
		mutationFn: (data: CardsListCommand) => mediator.send<CardsListResponse>(new CardsListCommand(data)),
		onMutate: (variables) => {
			return () => variables;
		},
		onSuccess: (data) => {
			return () => data;
		},
		onError: (error, variables) => {
			return () => variables;
		}
	});
}
