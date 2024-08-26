import { pushAlert } from 'business/stores/AppAlertsStore';
import i18n from 'i18n';
import { useEffect, useState } from 'react';
import type { NavigateOptions, To } from 'react-router-dom';
import { Location, useBlocker, useNavigate } from 'react-router-dom';
import { paths } from 'ui/route-config/paths';

export type Options = {
	condition?: (currentLocation: Location, nextLocation: Location) => boolean;
	allowAll?: boolean;
};

const homePage = paths.Home;
let currentUserNavigatedUrl: To | undefined = undefined;

export function usePreventNavigate({ condition, allowAll }: Options = {}) {
	const originalNavigate = useNavigate();
	const [isShowingAlert, setIsShowingAlert] = useState(false);
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

	const customNavigate = (path: To, options?: NavigateOptions) => {
		currentUserNavigatedUrl = path;
		originalNavigate(path, options);
	};

	useEffect(() => {
		if (blocker.state === 'blocked') {
			startOverAlert(customNavigate, isShowingAlert, setIsShowingAlert);
		}
	}, [blocker]);

	return { navigate: customNavigate, blocker };
}

export function startOverAlert(
	navigate: (path: To) => void,
	isShowingAlert: boolean,
	setIsShowingAlert: (v: boolean) => void
) {
	if (isShowingAlert) {
		return;
	}

	setIsShowingAlert(true);
	pushAlert({
		type: 'warning',
		messageText: i18n.t('backButtonText'),
		hasConfirmAction: true,
		hasRefuseAction: true,
		actions: {
			onCloseModal: () => {
				setIsShowingAlert(false);
			},
			onConfirm: () => {
				navigate(homePage);
			},
			onRefuse: () => {
				setIsShowingAlert(false);
			}
		}
	});
}
