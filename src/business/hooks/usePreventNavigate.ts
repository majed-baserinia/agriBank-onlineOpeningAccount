import { pushAlert } from 'business/stores/AppAlertsStore';
import i18n from 'i18n';
import { useEffect } from 'react';
import type { NavigateOptions, To } from 'react-router-dom';
import { Location, useBlocker, useNavigate } from 'react-router-dom';
import { paths } from 'ui/route-config/paths';

export type Options = {
	condition?: (currentLocation: Location, nextLocation: Location) => boolean;
	allowAll?: boolean;
};

const homePage = paths.Home;
let currentUserNavigatedUrl: To | number | undefined = undefined;

export function usePreventNavigate({ condition, allowAll }: Options = {}) {
	const originalNavigate = useNavigate();
	const blocker = useBlocker(({ currentLocation, nextLocation }) => {
		if (allowAll) {
			return false;
		}

		if (currentLocation.pathname === homePage) {
			return false;
		}

		if (nextLocation.pathname === currentUserNavigatedUrl) {
			return false;
		}

		return condition?.(currentLocation, nextLocation) ?? true;
	});

	const customNavigate = (path: To | number, options?: NavigateOptions) => {
		currentUserNavigatedUrl = path;
		if (typeof path === 'number') {
			originalNavigate(path);
		} else {
			originalNavigate(path, options);
		}
	};

	useEffect(() => {
		console.log('are3');
		if (blocker.state === 'blocked') {
			console.log('are4');
			blocker.reset();
			startOverAlert(customNavigate);
		}
	}, [blocker]);

	return { navigate: customNavigate, blocker };
}

export function startOverAlert(navigate: (path: To) => void) {
	pushAlert({
		type: 'warning',
		messageText: i18n.t('backButtonText'),
		hasConfirmAction: true,
		hasRefuseAction: true,
		actions: {
			onConfirm: () => {
				navigate(homePage);
				currentUserNavigatedUrl = undefined;
			}
		}
	});
}
