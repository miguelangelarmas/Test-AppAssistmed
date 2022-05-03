import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { flexDates } from '../services/flexDates';
import {
	DefaultTheme,
	Appbar,
	Text,
	Card,
	Title,
	Subheading,
	Divider,
	Caption,
	TouchableRipple,
	Headline,
	Button,
	List,
	IconButton,
	Paragraph,
} from 'react-native-paper';

export default function FechasFlexiblesScreen() {
	const [date, setDate] = useState(new Date(1598051730000));
	const [mode, setMode] = useState('date');
	const [show, setShow] = useState(false);

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate;
		setShow(false);
		setDate(currentDate);
	};

	const showMode = (currentMode) => {
		setShow(true);
		setMode(currentMode);
	};

	const showDatepicker = () => {
		showMode('date');
	};

	const showTimepicker = () => {
		showMode('time');
	};

	return (
		<View style={style.container}>
			<Text>FechasFlexiblesTab Screen</Text>
			<View>
				<View>
					<Button onPress={showDatepicker} title='Show date picker!'>
						aaa
					</Button>
				</View>
				<View>
					<Button onPress={showTimepicker} title='Show time picker!'>
						bbb
					</Button>
				</View>
				<Text>selected: {date.toLocaleString()}</Text>
				{show && (
					<DateTimePicker
						testID='dateTimePicker'
						value={date}
						mode={mode}
						is24Hour={true}
						onChange={onChange}
					/>
				)}
			</View>
			<Button onPress={() => flexDates('1013363', '2022-08-16', '2022-08-19')}>
				Enviar
			</Button>
		</View>
	);
}

const style = StyleSheet.create({
	container: {
		backgroundColor: '#ffffff',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
