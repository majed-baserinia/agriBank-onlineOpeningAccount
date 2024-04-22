import { Grid, MenuItem, useTheme } from '@mui/material';
import { ReactNode } from 'react';

type Props = {
	type: 'bordred' | 'default';
	value?: string | number;
	title?: ReactNode;
	subtitle?: ReactNode;
	children?: ReactNode;
	iconImg?: string;
	iconName?: string;
};

export default function MenuItemAdapter(props: Props) {
	const { children, value, title, subtitle, type, iconImg, iconName } = props;
	const theme = useTheme();

	const bordered = (
		<MenuItem
			value={value}
			sx={{
				border: `1px solid ${theme.palette.grey[50]}`,
				borderRadius: '16px',
				margin: '16px',
				'&:hover': {
					backgroundColor: 'unset',
					border: `2px solid ${theme.palette.primary.main}`
				}
			}}
		>
			<Grid
				container
				direction={'column'}
				justifyContent={'center'}
				spacing={'8px'}
				sx={{ padding: '16px' }}
			>
				<Grid>{title}</Grid>
				<Grid>{subtitle}</Grid>
			</Grid>
		</MenuItem>
	);

	const defaultItem = (
		<MenuItem>
			<Grid
				container
				justifyContent={'center'}
				alignItems="Center"
				gap={'5px'}
				wrap="nowrap"
			>
				<Grid sx={{ height: '30px', width: '30px' }}>
					<img
						style={{ width: '100%', height: '100%' }}
						src={iconImg}
						alt={iconName}
					/>
				</Grid>
				<Grid
					container
					direction={'column'}
					alignItems="flex-start"
					gap={'5px'}
				>
					{children}
				</Grid>
			</Grid>
		</MenuItem>
	);

	return type === 'bordred' ? bordered : defaultItem;
}

