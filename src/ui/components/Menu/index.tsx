import { Divider, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import MenuItem from './MenuItem';
import { Props } from './type';

export default function Menu(props: Props) {
	const { list } = props;
	const theme = useTheme();
	const { t } = useTranslation();
	const navigate = useNavigate();
	const matches = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<>
			<Grid
				dir={theme.direction}
				container
				direction={'column'}
				gap={'56px'}
			>
				<Grid>
					<Typography variant="h6">{t('menuTitleServices')}</Typography>
					{list?.services?.map((item, index) => {
						return (
							<>
								<MenuItem
									item={item}
									index={index}
								/>
								{!matches ? (
									list?.services.length - 1 == index ? null : (
										<Divider sx={{ width: 'calc(100% - 32px)', margin: 'auto' }} />
									)
								) : null}
							</>
						);
					})}
				</Grid>
				<Grid>
					<Typography variant="h6">{t('menuTitleManagement')}</Typography>
					{list?.management?.map((item, index) => {
						return (
							<>
								<MenuItem
									item={item}
									index={index}
								/>
								{!matches ? (
									list?.management.length - 1 == index ? null : (
										<Divider sx={{ width: 'calc(100% - 32px)', margin: 'auto' }} />
									)
								) : null}
							</>
						);
					})}
				</Grid>
			</Grid>
		</>
	);
}

// <div key={index}>
//   <Grid
//     container
//     justifyContent={"space-between"}
//     sx={{ padding: matches ? "16px 0" : "24px 0", cursor: "pointer" }}
//     onClick={(e) => {
//       item.onClick?.(e);
//       item.routeTo && navigate(item.routeTo);
//     }}
//   >
//     <Grid>
//       <Grid
//         container
//         gap={"8px"}
//       >
//         <span> {item.icon}</span>
//         <span> {t(item.title)}</span>
//       </Grid>
//     </Grid>
//     <Grid>
//       {theme.direction == "rtl" ? (
//         <ArrowBackIosNewIcon />
//       ) : (
//         <ArrowForwardIosIcon />
//       )}
//     </Grid>
//   </Grid>
//   {!matches ? (
//     list.length - 1 == index ? null : (
//       <Divider sx={{ width: "calc(100% - 32px)", margin: "auto" }} />
//     )
//   ) : null}
// </div>
