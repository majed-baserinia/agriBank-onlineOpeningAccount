import {
	Divider,
	FormControl,
	FormHelperText,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	Typography,
	useMediaQuery,
	useTheme
} from '@mui/material';
import { useEffect, useState } from 'react';
import Sheet from 'react-modal-sheet';
import { Props } from './type';

export default function BottomSheetSelect(props: Props) {
	const { list, label, breackpoint = 'sm', defaultValue = '', onChange, isRequired, error, helperText } = props;

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
					error={error}
				>
					{list.map((item) => {
						return (
							<MenuItem
								key={item.value}
								value={item.value}
								onClick={() => handlClickItem(item)}
							>
								<Typography
									variant="bodyMd"
									fontWeight={'medium'}
								>
									{item.name}
								</Typography>
							</MenuItem>
						);
					})}
				</Select>
				{helperText ? <FormHelperText error={error}>{helperText}</FormHelperText> : null}
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
													key={item.value}
													value={item.value}
													onClick={() => handlClickItem(item)}
												>
													<Typography
														variant="bodyMd"
														fontWeight={'medium'}
													>
														{item.name}
													</Typography>
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
