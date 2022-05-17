import React, { useState, useContext } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { flexDates } from '../services/flexDates';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AuthContext } from '../context/AuthContext';
import { formatDate } from '../services/formatDate';
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
import { CasoUno, CasoDos } from './partials/CasesFechasFlexibles';

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
	const dataDateEmision = voucherStorageData.fechaEmision;

	// const showDialog = () => setVisible(true);
	// const hideDialog = () => setVisible(false);

	// state variables :
	const [visible, setVisible] = React.useState(false);

	const [confirmTransaction, setConfirmTransaction] = React.useState({
		screen: 'datepicker',
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
		if (date != undefined) {
			console.log('-Entro onChange() / selectedDate: ', selectedDate);
			const selectedDate = date;
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
		} else {
			setShow(false);
		}
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
		// console.log(
		// 	'==== sendFlexDate() / reservaId, dateStringFrom, dateStringTo: ',
		// 	reservaId,
		// 	dateStringFrom,
		// 	dateStringTo
		// );
		const responseDataApi = await flexDates(
			reservaId,
			dateStringFrom,
			dateStringTo
		);
		console.log('sendFlexDates() / responseDataApi :', responseDataApi.status);

		if (responseDataApi.status == 'ok') {
			console.log('entro OK');
			setConfirmTransaction({
				...confirmTransaction,
				screen: 'success',
				status: 'ok',
				message: responseDataApi.respuesta,
			});
		} else if (responseDataApi.error != undefined) {
			console.log('entro ELSEIF');
			setConfirmTransaction({
				...confirmTransaction,
				screen: 'dismiss',
				status: 'ko',
				message: responseDataApi.error,
			});
		} else if (responseDataApi.status == 'error') {
			console.log('entro ELSEIF');
			setConfirmTransaction({
				...confirmTransaction,
				screen: 'error',
				status: 'error',
				message: responseDataApi.respuesta,
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

	function sumarDias(fecha, dias) {
		const offset = fecha.getTimezoneOffset();
		fecha = new Date(fecha.getTime() - offset * 60 * 1000);

		// console.log(
		// 	'%c ||| sumarDias() / fecha : ',
		// 	'color: #bc14f5; background: #faebff',
		// 	fecha
		// );
		fecha.setDate(fecha.getDate() + (dias - 1));
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
		<ScrollView style={styles.container}>
			<Title>Puedes cambiarlas cuando quieras</Title>
			<Paragraph>
				Recuerda que tienes un año para hacerlo, las veces que quieras sin
				penalidades ni cambio de tarifa. Solo te queda disfrutar!
			</Paragraph>

			<View
				style={{
					padding: 10,
					backgroundColor: '#ffebd6',
				}}
			>
				<Text>Fecha salida: {dataDateFrom}</Text>
				<Text>Fecha regreso: {dataDateTo}</Text>
				<Text>Cantidad de días: {dataDays} </Text>
				<Text>Fecha emision: {dataDateEmision}</Text>
				<Text>Fecha máxima: {dataLimit} </Text>
				<Text>Flexible: {dataIsFlex ? 'Si' : 'No'}</Text>
			</View>

			{confirmTransaction.screen === 'datepicker' && (
				<Card elevation={2} style={styles.card}>
					<Card.Title
						title='Seleccionar'
						subtitle='Fecha de viaje'
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

						<TouchableRipple
							style={[styles.twoColumnData, styles.inputDisabled]}
						>
							<TwoColumnButton leftName='Hasta: ' rightValue={dateStringTo} />
						</TouchableRipple>

						<Separador />

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
					</Card.Content>
				</Card>
			)}

			<View>
				<Text style={{ color: 'red' }}>
					{/* Fecha seleccionada: {formatDate(dateFrom, 'date', 'string')} */}
				</Text>

				{show && (
					<>
						<DateTimePicker
							minimumDate={formatDate('2022-05-10', 'string', 'yearmonthday')}
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

			{confirmTransaction.screen === 'success' && (
				<Card elevation={2} style={styles.card}>
					<Card.Title
						title='Felicitaciones Viajer@'
						subtitle='Cambio realizado!'
						left={FlexdateIcon}
					/>
					<Card.Content>
						<Divider />
						<Separador />
						<Headline style={{ color: 'green' }}>
							{confirmTransaction.message}
						</Headline>
						<TouchableRipple style={styles.twoColumnData}>
							<TwoColumnButton leftName='Desde: ' rightValue={dateStringFrom} />
						</TouchableRipple>

						<TouchableRipple style={styles.twoColumnData}>
							<TwoColumnButton leftName='Hasta: ' rightValue={dateStringTo} />
						</TouchableRipple>

						<Separador />

						<Button
							raised
							mode={'contained'}
							onPress={() =>
								setConfirmTransaction({
									...confirmTransaction,
									screen: 'datepicker',
								})
							}
						>
							Realizar nuevo cambio
						</Button>
					</Card.Content>
				</Card>
			)}

			{confirmTransaction.screen === 'dismiss' && (
				<Card elevation={2} style={styles.card}>
					<Card.Title
						title='Lo sentimos!'
						subtitle='asdasdasdad'
						left={FlexdateIcon}
					/>
					<Card.Content>
						<Divider />
						<Separador />
						<Title style={{ color: 'red' }}>{confirmTransaction.message}</Title>
						<Separador />
						<Button
							raised
							mode={'contained'}
							onPress={() =>
								setConfirmTransaction({
									...confirmTransaction,
									screen: 'datepicker',
								})
							}
						>
							Reintentar
						</Button>
					</Card.Content>
				</Card>
			)}

			{confirmTransaction.screen === 'error' && (
				<Card elevation={2} style={styles.card}>
					<Card.Title
						title='Lo sentimos!'
						subtitle='ERROR'
						left={FlexdateIcon}
					/>
					<Card.Content>
						<Divider />
						<Separador />
						<Title>{confirmTransaction.message}</Title>

						<Separador />

						<Button
							raised
							mode={'contained'}
							onPress={() =>
								setConfirmTransaction({
									...confirmTransaction,
									screen: 'datepicker',
								})
							}
						>
							Reintentar
						</Button>
					</Card.Content>
				</Card>
			)}

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

			{/* <Button
				raised
				onPress={() => sendFlexDates('1013632', '2020-07-5', '2020-07-15')}
			>
				PRUEBA
			</Button> */}

			{/* <Button
				raised
				onPress={() => formatDate(new Date('2022-05-10'), 'date', 'date')}
			>
				PRUEBA
			</Button> */}
		</ScrollView>
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
