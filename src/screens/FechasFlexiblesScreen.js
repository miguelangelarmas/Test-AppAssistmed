import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { flexDates } from '../services/flexDates';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AuthContext } from '../context/AuthContext';
import {
	Text,
	Card,
	Title,
	Subheading,
	Divider,
	Avatar,
	Caption,
	TouchableRipple,
	Headline,
	Button,
	Paragraph,
	Dialog,
	Portal,
	Provider,
} from 'react-native-paper';
import Separador from '../components/Separador';

export default function FechasFlexiblesScreen() {
	console.log('/RENDERIZADO GENERAL');
	const { voucherStorageData, updateVoucherStorage } = useContext(AuthContext);

	const dataDateFrom = voucherStorageData.fechaSalida;
	const dataDateTo = voucherStorageData.fechaRegreso;
	const dataNewDateFrom = dataDateFrom;
	const dataNewDateTo = dataDateTo;
	const dataLimit = voucherStorageData.fechaLimite;
	const dataDays = voucherStorageData.days;
	const dataIsFlex = voucherStorageData.fechaFlexible;

	// const showDialog = () => setVisible(true);
	// const hideDialog = () => setVisible(false);

	// state variables :
	const [visible, setVisible] = React.useState(false);

	const [confirmTransaction, setConfirmTransaction] = React.useState({
		status: null,
		message: '',
	});

	const [dateStringFrom, setDateStringFrom] = useState(
		voucherStorageData.fechaSalida
	);
	const [dateStringTo, setDateStringTo] = useState(
		voucherStorageData.fechaRegreso
	);

	const [currentDate, setCurrentDate] = useState(
		formatDate(voucherStorageData.fechaSalida, 'string', 'date')
	);

	const [dateFrom, setDateFrom] = useState(
		formatDate(voucherStorageData.fechaSalida, 'string', 'date')
	);
	const [dateTo, setDateTo] = useState(
		formatDate(voucherStorageData.fechaRegreso, 'string', 'date')
	);
	const [show, setShow] = useState(false);

	// console.log(
	// 	'****** Renderizado general / useState / currentDate: ',
	// 	currentDate
	// );
	// console.log('****** Renderizado general / useState / dateFrom: ', dateFrom);
	// console.log('****** Renderizado general / useState / dateTo: ', dateTo);

	const onChange = (event, date) => {
		const selectedDate = date;
		// console.log('-Entro onChange() / selectedDate: ', selectedDate);
		let choosendDate = selectedDate;
		let choosendDatePlusDays = sumarDias(selectedDate, dataDays);

		// console.log('---onChange() / choosendDate: ', choosendDate);
		// console.log('---onChange() / choosendDatePlusDays: ', choosendDatePlusDays);

		setShow(false);
		setCurrentDate(selectedDate);
		setDateFrom(choosendDate);
		setDateTo(choosendDatePlusDays);
		setDateStringFrom(formatDate(choosendDate, 'date', 'string'));
		setDateStringTo(formatDate(choosendDatePlusDays, 'date', 'string'));
	};

	// console.log(
	// 	'%c currentDate: ',
	// 	'color: #478B20; background: #E7FFD9',
	// 	currentDate
	// );
	// console.log('%c dateFrom: ', 'color: #478B20; background: #E7FFD9', dateFrom);
	// console.log('%c dateTo: ', 'color: #478B20; background: #E7FFD9', dateTo);

	// const iosSelectDate = () => {
	// 	setShow(false);
	// };

	const sendFlexDates = async (reservaId, dateStringFrom, dateStringTo) => {
		console.log(
			'==== sendFlexDate() / reservaId, dateStringFrom, dateStringTo: ',
			reservaId,
			dateStringFrom,
			dateStringTo
		);
		const responseDataApi = await flexDates(
			reservaId,
			dateStringFrom,
			dateStringTo
		);
		if (responseDataApi.status == 'ok') {
			setConfirmTransaction({
				...confirmTransaction,
				status: 'ok',
				message: responseDataApi.respuesta,
			});
		} else {
			setConfirmTransaction({
				...confirmTransaction,
				status: 'ko',
				message: 'Ocurrio un error',
			});
		}
		// updateVoucherStorage(responseDataApi);
	};

	const showDatepicker = () => {
		setShow(true);
	};

	const FlexdateIcon = (props) => (
		<Avatar.Icon
			{...props}
			icon={({ size, color }) => (
				<Ionicons name='calendar' size={20} color={'white'} />
			)}
		/>
	);

	function formatDate(yourDate, inputType, outputType) {
		// console.log(
		// 	'%c ////// formatDate() / yourDate, inputType, outputType : ',
		// 	'color: #bc14f5; background: #faebff',
		// 	yourDate,
		// 	inputType,
		// 	outputType
		// );
		if (inputType === 'date') {
			const offset = yourDate.getTimezoneOffset();
			yourDate = new Date(yourDate.getTime() - offset * 60 * 1000);
			// console.log(
			// 	'%c /// formatDate() / inputType === date : ',
			// 	'color: #bc14f5; background: #faebff',
			// 	yourDate
			// );
		} else if (inputType === 'string') {
			yourDate = new Date(yourDate);
			const offset = yourDate.getTimezoneOffset();
			yourDate = new Date(yourDate.getTime() - offset * 60 * 1000);
			// console.log(
			// 	'%c /// formatDate() / inputType === string : ',
			// 	'color: #bc14f5; background: #faebff',
			// 	yourDate
			// );
		} else {
			console.log('--- error formatDate()');
			return 'error';
		}

		if (outputType === 'date') {
			// console.log(
			// 	'%c /// formatDate() / outputType === date : ',
			// 	'color: #bc14f5; background: #faebff',
			// 	yourDate
			// );
			return yourDate;
		} else if (outputType === 'string') {
			// console.log(
			// 	'%c /// formatDate() / outputType ===  string : ',
			// 	'color: #bc14f5; background: #faebff',
			// 	yourDate.toISOString().split('T')[0]
			// );
			return yourDate.toISOString().split('T')[0];
		} else {
			console.log('--- error formatDate()');
			return 'error';
		}
	}

	function sumarDias(fecha, dias) {
		fecha = new Date(fecha);
		// console.log(
		// 	'%c ||| sumarDias() / fecha : ',
		// 	'color: #bc14f5; background: #faebff',
		// 	fecha
		// );
		fecha.setDate(fecha.getDate() + dias);
		// fecha = formatDate(fecha, 'date', 'date');
		// console.log(
		// 	'%c ||| sumarDias() / fecha : ',
		// 	'color: #bc14f5; background: #faebff',
		// 	fecha
		// );
		return fecha;
	}

	const TwoColumnButton = (props) => {
		return (
			<>
				<View style={styles.column}>
					<Text style={styles.text}>{props.leftName}</Text>
				</View>
				<View style={(styles.column, styles.textAlignRight)}>
					<Text style={styles.text}>{props.rightValue}</Text>
				</View>
			</>
		);
	};

	return (
		<View style={styles.container}>
			<Title>Puedes cambiarlas cuando quieras</Title>
			<Paragraph>
				Recuerda que tienes un año para hacerlo, las veces que quieras sin
				penalidades ni cambio de tarifa. Solo te queda disfrutar!
			</Paragraph>

			{/* <View
				style={{
					padding: 10,
					backgroundColor: '#ffebd6',
				}}
			>
				<Text>Cantidad de días: {dataDays} </Text>
				<Text>Fecha máxima: {dataLimit} </Text>
				<Text>Fecha salida: {dataDateFrom}</Text>
				<Text>Fecha regreso: {dataDateTo}</Text>
				<Text>Flexible: {dataIsFlex ? 'Si' : 'No'}</Text>
			</View> */}

			<Card elevation={2} style={styles.card}>
				<Card.Title
					title='Seleccionar'
					subtitle='Nuevas fechas'
					left={FlexdateIcon}
				/>
				<Card.Content>
					<Divider />
					<Separador />
					<TouchableRipple
						onPress={showDatepicker}
						style={styles.twoColumnData}
					>
						<TwoColumnButton leftName='Desde: ' rightValue={dateStringFrom} />
					</TouchableRipple>

					<TouchableRipple style={[styles.twoColumnData, styles.inputDisabled]}>
						<TwoColumnButton leftName='Hasta: ' rightValue={dateStringTo} />
					</TouchableRipple>
				</Card.Content>
			</Card>

			<View>
				<Text style={{ color: 'red' }}>
					{/* Fecha seleccionada: {formatDate(dateFrom, 'date', 'string')} */}
				</Text>

				{show && (
					<>
						<DateTimePicker
							testID='dateTimePicker'
							value={currentDate}
							mode='date'
							display='default'
							onChange={onChange}
						/>
						{/* <Button raised mode={'contained'} onPress={iosSelectDate}>
							SECCIONAR
						</Button> */}
					</>
				)}
			</View>

			{/* <Portal>
				<Dialog visible={visible} onDismiss={hideDialog}>
					<Dialog.Title>Nueva fecha de salida</Dialog.Title>
					<Dialog.Content>
						<>
							<DateTimePicker
								testID='dateTimePicker'
								value={date}
								mode={mode}
								display='default'
								onChange={onChange}
							/>
							<Button raised mode={'contained'} onPress={iosSelectDate}>
								SECCIONAR
							</Button>
						</>
					</Dialog.Content>
					<Dialog.Actions>
						<Button onPress={hideDialog}>Done</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal> */}

			{/* <Button raised mode={'contained'} onPress={showDialog}>
				Show Dialog
			</Button> */}

			<Button
				raised
				mode={'contained'}
				onPress={() =>
					sendFlexDates(
						voucherStorageData.reservaId,
						dateStringFrom,
						dateStringTo
					)
				}
			>
				ENVIAR
			</Button>

			{confirmTransaction.status === 'ok' && (
				<View>
					<Title style={{ color: 'green', padding: 15 }}>
						{confirmTransaction.message}
					</Title>
				</View>
			)}

			{/* <Button
				raised
				mode={'contained'}
				onPress={() => formatDate(dataDateFrom, 'string', 'date')}
			>
				PRUEBA
			</Button> */}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fcfcfc',
		flex: 1,
		padding: 15,
	},
	card: {
		marginBottom: 25,
	},
	twoColumnData: {
		// borderBottomColor: '#ff00ff',
		// borderBottomWidth: 1,
		flexDirection: 'row',
		height: 45,
		alignItems: 'center',
	},
	column: {
		flexGrow: 1,
	},
	text: {
		fontSize: 18,
	},
	inputDisabled: {
		opacity: 0.6,
	},
	textAlignLeft: {
		alignContent: 'flex-start',
	},
	textAlignRight: {
		alignContent: 'flex-end',
	},
	separador: {
		marginBottom: 10,
	},
});
