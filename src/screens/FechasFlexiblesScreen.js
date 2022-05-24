import React, { useState, useContext } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { sendFlexates } from '../services/sendFlexates';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AuthContext } from '../context/AuthContext';
import { formatDate } from '../services/formatDate';
import { sumarDias } from '../services/sumarDias';
import { restarDias } from '../services/restarDias';
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
import { CardFlexCases } from './partials/CasesFechasFlexibles';
import { RoundedIcon } from '../components/RoundedIcon';

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
		// screen: 'datepicker',
		screen: 'datepicker',
		status: null,
		message: 'aca va el texto de confirmacion que tu me',
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
		const responseDataApi = await sendFlexates(reservaId, dateStringFrom, dateStringTo);
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
				screen: 'reject',
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
			<Paragraph style={styles.flexdateParagraph}>
				Recuerda que tienes un año para hacerlo, las veces que quieras sin
				penalidades ni cambio de tarifa. Solo te queda disfrutar!
			</Paragraph>

			{/* <View
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
			</View> */}
			{dataIsFlex &&
				<View>



					{confirmTransaction.screen === 'datepicker' && (
						<Card elevation={2} style={styles.card}>
							<Card.Title
								title='Seleccionar'
								subtitle='Fecha de viaje'
								left={(props) => (
									<RoundedIcon
										{...props}
										icon='calendar'
										iconSource='Ionicons'
										color='red'
									/>
								)}
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
						{console.log('FECHA MAXIMA: ', formatDate(dataLimit, 'string', 'date'))}
						{console.log(
							'FECHA MAXIMA: ',
							restarDias(
								formatDate(
									formatDate(dataLimit, 'string', 'date'),
									'string',
									'date'
								),
								dataDays - 1
							)
						)}
						{show && (
							<>
								<DateTimePicker
									minimumDate={new Date()}
									maximumDate={restarDias(
										formatDate(
											formatDate(dataLimit, 'string', 'date'),
											'string',
											'date'
										),
										dataDays - 1
									)}
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
						<CardFlexCases
							screen='success'
							title='Felicitaciones Viajer@'
							subtitle='Cambio realizado!'
							headerIcon='folder'
							message={confirmTransaction.message}
							dateFrom='0000-00-00'
							dateTo='0000-00-00'
						/>
					)}

					{confirmTransaction.screen === 'reject' && (
						<CardFlexCases
							screen='reject'
							title='Lo sentimos!'
							subtitle='Cambio rechazado'
							message={confirmTransaction.message}
							button={true}
						/>
					)}

					{confirmTransaction.screen === 'error' && (
						<CardFlexCases
							screen='error'
							title='Lo sentimos!'
							subtitle='Ocurrio un error'
							message='Lo sentimos. Ocurrio un error. Por favor, vuelva a intentarlo más tarde o comuníquese con nosotros para asistirlo.'
							button={true}
						/>
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
				onPress={() => sendFlexDates('1013632', '2022-07-01', '2022-07-05')}
			>
				PRUEBA
			</Button> */}

					{/* <Button
				raised
				onPress={() => formatDate(new Date('2022-05-10'), 'date', 'date')}
			>
				PRUEBA
			</Button> */}
				</View>
			}

			{!dataIsFlex &&
				<View>
					<CardFlexCases
						screen='noflex'
						title='No disponible'
						subtitle='Lo sentimos'
						headerIcon='error-outline'
						iconSource='MaterialIcons'
						message={`La reserva ${voucherStorageData.reservaId} no dispone de cambio de fechas.`}
					/>
				</View>
			}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#f9f9f9',
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
	flexdateParagraph: {
		marginBottom: 25,
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
