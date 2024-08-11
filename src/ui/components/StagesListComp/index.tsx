import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import SvgToIcon from 'ui/htsc-components/SvgToIcon';

type Props = {
	list: StageItem[];
};

type StageItem = {
	id: number;
	title: string;
	icon: string;
	iconAlt: string;
};

export default function StagesListComp(props: Props) {
	const { list } = props;
	const { t } = useTranslation();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));

	return (
		<>
			{list.map((item) => {
				return (
					<Grid overflow={'hidden'}>
						<Grid
							container
							justifyContent={'space-between'}
							alignItems={'center'}
							minWidth={'290px'}
							sx={{ padding: matches ? '16px 0' : '24px 0', overflow: 'hidden' }}
						>
							<Grid>
								<Grid
									container
									gap={'8px'}
									alignItems={'start'}
									justifyContent={'start'}
								>
									<Grid item>
										<SvgToIcon
											icon={item.icon}
											alt={item.iconAlt}
										/>
									</Grid>
									<Grid>
										<Typography
											variant="bodyMd"
											fontWeight={'medium'}
											noWrap
										>
											{t(item.title, item.title)}
										</Typography>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				);
			})}
		</>
	);
}
