import { FormHelperText } from '@mui/material';
import { useRef, useState } from 'react';
import DatePicker from 'react-multi-date-picker';
import 'react-multi-date-picker/styles/backgrounds/bg-brown.css';
import 'react-multi-date-picker/styles/backgrounds/bg-dark.css';
import 'react-multi-date-picker/styles/backgrounds/bg-gray.css';
import 'react-multi-date-picker/styles/layouts/mobile.css';
import 'react-multi-date-picker/styles/layouts/prime.css';
import './styles.css';

type Props = {
	placeHolder?: string;
	className?: string;
	error?: string;
	helperText: string;
};

export default function DatePickerAdapter(props: Props) {
	const { placeHolder, helperText } = props;
	const [value, setValue] = useState();
	const datepicker = useRef();

	return (
		<div className="page-wrapper">
		
			<DatePicker
				ref={datepicker}
				value={value}
				monthYearSeparator=" "
				className="primary"
				style={{width: "100%"}}
				// className="primary rmdp-mobile"
				inputClass='datepickerInput'
				hideOnScroll
				calendarPosition={'top-right'}
				placeholder={'تاریخ'}
			/>
			<FormHelperText sx={{ marginTop: '-10px' }}>{helperText}</FormHelperText>
		</div>
	);
}
