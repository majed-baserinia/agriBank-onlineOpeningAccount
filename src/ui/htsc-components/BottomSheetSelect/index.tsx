import { Divider, FormControl, Grid, InputLabel, MenuItem, Select, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import Sheet from 'react-modal-sheet';
import { Props } from './type';

export default function BottomSheetSelect(props: Props) {
	const { list, label, breackpoint = 'sm', defaultValue = '', onChange, isRequired } = props;

	const theme = useTheme();
	const isMatched = useMediaQuery(theme.breakpoints.down(breackpoint));
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState('');

	useEffect(() => {
		setValue(defaultValue);
	}, []);

	const handlClickItem = (item: { value: string; name: string }) => {
		setValue(item.value);
		onChange(item);
		setOpen(false);
	};

	return (
		<>
			<FormControl
				fullWidth
				sx={{ marginTop: '10px' }}
			>
				<InputLabel id="label">
					{
						<>
							{isRequired ? (
								<>
									{label}
									<span style={{ color: theme.palette.error.main }}> *</span>
								</>
							) : (
								label
							)}
						</>
					}
				</InputLabel>
				<Select
					labelId="label"
					value={value}
					label={label}
					MenuProps={{
						sx: { display: isMatched ? 'none' : 'unset' }
					}}
					onChange={(e, el) => {}}
					open={open}
					onOpen={() => setOpen(true)}
					onClose={() => setOpen(false)}
				>
					{list.map((item) => {
						return (
							<MenuItem
								value={item.value}
								onClick={() => handlClickItem(item)}
							>
								{item.name}
							</MenuItem>
						);
					})}
				</Select>
			</FormControl>
			{isMatched ? (
				<Sheet
					isOpen={open}
					onClose={() => setOpen(false)}
					snapPoints={[450, 0]}
				>
					<Sheet.Container>
						<Sheet.Header />
						<Sheet.Content>
							{
								<Grid sx={{ overflow: 'auto' }}>
									{list.map((item) => {
										return (
											<>
												<MenuItem
													value={item.value}
													onClick={() => handlClickItem(item)}
												>
													{item.name}
												</MenuItem>
												<Divider />
											</>
										);
									})}
								</Grid>
							}
						</Sheet.Content>
					</Sheet.Container>
					<Sheet.Backdrop />
				</Sheet>
			) : null}
		</>
	);
}
