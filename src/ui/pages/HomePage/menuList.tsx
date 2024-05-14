import activation from 'assets/icon/menu/active-check.svg';
import issueCheck from 'assets/icon/menu/check-issue.svg';
import deactivation from 'assets/icon/menu/deactive-check.svg';
import list from 'assets/icon/menu/list.svg';
import SvgToIcon from 'ui/htsc-components/SvgToIcon';
import { paths } from 'ui/route-config/paths';

export const menuList = {
	services: [
		{
			id: '1',
			title: 'issueCheck',
			icon: (
				<SvgToIcon
					icon={issueCheck}
					alt="issue Check"
				/>
			),
			routeTo: paths.IssueCheck.SelectAccountPath
		},
		{
			id: '2',
			title: 'receivedCheckList',
			icon: (
				<SvgToIcon
					icon={list}
					alt="list check"
				/>
			),
			routeTo: paths.ReceivedChecksList.SelectCheckList
		}
	],
	management: [
		{
			id: '1',
			title: 'activation',
			icon: (
				<SvgToIcon
					icon={activation}
					alt="activation"
				/>
			),
			routeTo: paths.Activation.firstStepPath
		},
		{
			id: '2',
			title: 'deactivation',
			icon: (
				<SvgToIcon
					icon={deactivation}
					alt="deactivation"
				/>
			),
			routeTo: paths.Activation.firstStepPath
		}
	]
};
