import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import phoneIcon from 'assets/icon/horizantal-phone.svg';
import useSaveNationalCodeImage from 'business/hooks/useSaveNationalCodeImage';
import { pushAlert } from 'business/stores/AppAlertsStore';
import { useDataSteps } from 'business/stores/onlineOpenAccount/dataSteps';
import { SaveNationalCodeImageRequest } from 'common/entities/SaveNationalCodeImage/SaveNationalCodeImageRequest';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Title from 'ui/components/Title';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import Loader from 'ui/htsc-components/loader/Loader';
import PhotoCamera from 'ui/htsc-components/PhotoCamera';
import SvgToIcon from 'ui/htsc-components/SvgToIcon';
import { paths } from 'ui/route-config/paths';

export default function NationalCardImagePage() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));

	const { token } = useDataSteps();
	const [image, setImage] = useState<string | null>(null);
	const { isLoading, mutate: postImage } = useSaveNationalCodeImage();

	const handlesubmit = () => {
		if (image) {
			const data: SaveNationalCodeImageRequest = {
				binaries: image,
				fileName: 'nationalCard',
				mimeType: 'image/jpeg',
				token: token!
			};
			postImage(data, {
				onError: (err) => {
					pushAlert({ type: 'error', messageText: err.detail, hasConfirmAction: true });
				},
				onSuccess: (res) => {
					navigate(paths.thirdPartyAuth);
				}
			});
		}
	};

	return (
		<Grid
			container
			sx={{ padding: matches ? '0' : '64px 0' }}
			justifyContent={'center'}
			gap={'24px'}
			dir={theme.direction}
		>
			<Grid
				item
				xs={12}
				md={8}
			>
				<BoxAdapter fullWidth={matches}>
					<Grid
						minHeight={matches ? 'calc(100vh - 64px)' : 'calc(100vh - 192px)'}
						container
						direction={'column'}
						justifyContent={'space-between'}
						wrap="nowrap"
					>
						<Grid>
							<Title>{t('openAccount')}</Title>

							<Grid
								marginBottom={'16px'}
								container
								flexWrap={'nowrap'}
								gap={'8px'}
							>
								<Typography
									variant="bodyMd"
									sx={{ marginBottom: '8px' }}
								>
									{t('nationalImagePageTitleText')}
								</Typography>
							</Grid>

							<Grid sx={{ marginBottom: '16px' }}>
								<PhotoCamera
									onTakePhoto={(photo) => {
										setImage(photo);
									}}
								/>
							</Grid>
							<Grid
								container
								gap={4}
							>
								<SvgToIcon
									icon={phoneIcon}
									alt="phone-icon"
								/>
								<Typography>{t('takePictureHintText')}</Typography>
							</Grid>
						</Grid>
						<Grid container>
							<ButtonAdapter
								disabled={!image}
								variant="contained"
								size="medium"
								muiButtonProps={{ sx: { width: '100%' } }}
								onClick={handlesubmit}
							>
								{t('continue')}
							</ButtonAdapter>
						</Grid>
					</Grid>
				</BoxAdapter>
			</Grid>
			{/* {matches ? null : (
				<Grid
				item
					md={3}
					dir={theme.direction}
				>
					<BoxAdapter>
						<Menu
							divider={false}
							list={menuList.management}
						/>
						<Menu
							divider={false}
							list={menuList.services}
						/>{' '}
					</BoxAdapter>
				</Grid>
			)} */}
			<Loader showLoader={isLoading} />
		</Grid>
	);
}
