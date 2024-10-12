import useCities from 'business/hooks/useCities';
import { usePreventNavigate } from 'business/hooks/usePreventNavigate';
import useProvinces from 'business/hooks/useProvinces';
import { pushAlert } from 'business/stores/AppAlertsStore';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { paths } from 'ui/route-config/paths';

export default function useProvinceAndCities() {
	const location = useLocation();
	const { navigate } = usePreventNavigate({ condition: () => !location.state.canGoBack });
	const { data: provinces, mutate: getProvinces, isLoading: isLoadingProvinces } = useProvinces();
	const { data: cities, mutate: getCities, isLoading: isLoadingCities } = useCities();

	useEffect(() => {
		getProvinces(
			{},
			{
				onError: () => {
					pushAlert({
						type: 'error',
						hasConfirmAction: true,
						actions: {
							onCloseModal: () => {
								navigate(paths.Home);
							},
							onConfirm: () => {
								navigate(paths.Home);
							}
						}
					});
				}
			}
		);
	}, []);

	const handlProvinceChahange = (provinceId: number) => {
		getCities(
			{ provinceId: provinceId },
			{
				onError: (err) => {
					pushAlert({
						type: 'error',
						messageText: err.detail,
						hasConfirmAction: true,
						actions: {
							onCloseModal: () => {
								navigate(paths.Home);
							},
							onConfirm: () => {
								navigate(paths.Home);
							}
						}
					});
				}
			}
		);
	};

	return { provinces, cities, handlProvinceChahange, isLoading: isLoadingProvinces || isLoadingCities };
}
