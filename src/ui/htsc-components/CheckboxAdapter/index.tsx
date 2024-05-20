import { Checkbox, FormControlLabel, FormGroup, Typography, useTheme } from '@mui/material';
import { ChangeEvent } from 'react';

interface Props {
	disabled?: boolean;
	required?: boolean;
	defaultChecked?: boolean;
	checked: boolean;
	label?: string;
	onChange: (checked: boolean) => void;
}
export default function CheckboxAdapter(props: Props) {
	const { disabled, required, defaultChecked, label, checked, onChange } = props;
	const theme = useTheme();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.checked);
	};

	return (
		<FormGroup>
			<FormControlLabel
				disabled={disabled}
				required={required}
				control={
					<Checkbox
						sx={{ padding: '0' }}
						size="small"
						onChange={(e) => handleChange(e)}
						checked={checked}
						defaultChecked={defaultChecked}
					/>
				}
				label={
					<Typography
						variant="body2"
						color="textSecondary"
					>
						{label}
					</Typography>
				}
				sx={{
					color: theme.palette.primary.main,
					'&.Mui-checked': {
						color: theme.palette.primary.main
					},
					margin: 'initial'
				}}
			/>
		</FormGroup>
	);
}
