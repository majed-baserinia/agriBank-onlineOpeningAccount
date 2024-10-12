import useJobDetail from 'business/hooks/useJobDetail';
import useJobs from 'business/hooks/useJobs';
import { usePreventNavigate } from 'business/hooks/usePreventNavigate';
import { pushAlert } from 'business/stores/AppAlertsStore';
import { useEffect } from 'react';
import { paths } from 'ui/route-config/paths';

export default function useHandlejobs() {
	const { navigate } = usePreventNavigate();

	const { data: jobs, mutate: getJobs, isLoading: isLoadingJobs } = useJobs();
	const { data: jobDetails, mutate: getJobDetails, isLoading: isLoadingJobsDetail } = useJobDetail();

	useEffect(() => {
		getJobs(
			{ code: '' },
			{
				onError: (error) => {
					pushAlert({
						type: 'error',
						messageText: error.detail,
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

	const handleJobChange = (selectedJob: { value: string; name: string }) => {
		getJobDetails(
			{ code: '', jobId: selectedJob.value },
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

	return { handleJobChange, jobDetails, jobs, isLoading: isLoadingJobs || isLoadingJobsDetail };
}
