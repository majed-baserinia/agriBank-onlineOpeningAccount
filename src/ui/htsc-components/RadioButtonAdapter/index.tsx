import { FormControlLabel, Grid, Radio, RadioGroup, Theme, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Props } from './types';

export default function RadioButtonAdapter(props: Props) {
	const { listOfOptions, defaultValue, layoutColumns, variant = 'backgroundSelected', onChange } = props;
	const { t } = useTranslation();
	const theme = useTheme();
	const [value, setValue] = useState(defaultValue);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue((event.target as HTMLInputElement).value);
		onChange((event.target as HTMLInputElement).value);
	};

	return (
		<RadioGroup
			defaultValue={defaultValue}
			name="radio-adapter"
			value={value}
			onChange={handleChange}
			sx={{ gap: '16px', display: 'grid', gridTemplateColumns: `${'1fr '.repeat(layoutColumns)}` }}
		>
			{listOfOptions.map((radio) => {
				return (
					<Grid
						key={radio.value}
						item
						sx={{ ...radio.sx }}
					>
						<FormControlLabel
							sx={variantStyleGenerator(variant, radio.value === value, theme)}
							value={radio.value}
							checked={radio.value === value}
							disabled={radio.disabled}
							control={<Radio />}
							label={
								<Grid
									container
									direction={'column'}
								>
									<Typography
										variant="bodyMd"
										fontWeight={'medium'}
									>
										{t(radio.label, radio.label)}
									</Typography>
									<Typography
										variant="bodySm"
										fontWeight={'regular'}
									>
										{radio.subLabel ? t(radio.subLabel, radio.subLabel) : null}
									</Typography>
								</Grid>
							}
							labelPlacement="end"
						/>
					</Grid>
				);
			})}
		</RadioGroup>
	);
}

const variantStyleGenerator = (
	variant: 'borderedSelected' | 'backgroundSelected',
	checked: boolean,
	{ palette }: Theme
) => {
	let border: string = '';
	let backgroundColor: string | undefined;

	if (variant === 'borderedSelected') {
		border = checked ? `1px solid ${palette.primary.main}` : `1px solid ${palette.grey[200]}`;
	} else if (variant === 'backgroundSelected') {
		border = checked ? '1px solid transparent' : `1px solid ${palette.grey[200]}`;
		backgroundColor = checked ? palette.primary[50] : undefined;
	}

	return {
		border: border,
		backgroundColor: backgroundColor,
		padding: '16px',
		borderRadius: '16px',
		marginRight: 'unset',
		marginLeft: 'unset',
		width: '100%'
	};
};
