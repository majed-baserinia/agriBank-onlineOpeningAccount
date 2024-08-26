import { pushAlert } from 'business/stores/AppAlertsStore';
import i18n from 'i18n';
import { useEffect } from 'react';
import type { NavigateFunction } from 'react-router-dom';
import { Location, useBlocker, useNavigate } from 'react-router-dom';
import { paths } from 'ui/route-config/paths';

export type Options = {
	condition?: (currentLocation: Location, nextLocation: Location) => boolean;
};

const homePage = paths.Home;

export function usePreventNavigate({ condition }: Options = {}) {
	const navigate = useNavigate();
	const blocker = useBlocker(
		({ currentLocation, nextLocation }) =>
			condition?.(currentLocation, nextLocation) ?? nextLocation.pathname !== homePage
	);

	useEffect(() => {
		if (blocker.state === 'blocked') {
			startOverAlert(navigate);
		}
	}, [blocker]);

	return blocker;
}

export function startOverAlert(navigate: NavigateFunction) {
	pushAlert({
		type: 'warning',
		messageText: i18n.t('backButtonText'),
		hasConfirmAction: true,
		hasRefuseAction: true,
		actions: {
			onCloseModal: () => {},
			onConfirm: () => {
				navigate(homePage);
			},
			onRefuse: () => {}
		}
	});
}
