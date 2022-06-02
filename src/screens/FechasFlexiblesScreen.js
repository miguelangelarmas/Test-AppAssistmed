import React, { useState, useContext } from 'react';
import { View, StyleSheet, ScrollView, Platform, ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { sendFlexates } from '../services/sendFlexates';
import { AuthContext } from '../context/AuthContext';
import { formatDate } from '../services/formatDate';
import { sumarDias } from '../services/sumarDias';
import { restarDias } from '../services/restarDias';
import {
	Text,
	Card,
	Title,
	Divider,
	TouchableRipple,
	Button,
	Paragraph,
	Dialog,
	Portal,
	Provider,
} from 'react-native-paper';
import Separador from '../components/Separador';
import { CardFlexCases } from './partials/CasesFechasFlexibles';
import { RoundedIcon } from '../components/RoundedIcon';
import { TextKeyValue } from '../components/TextComponents';

export default function FechasFlexiblesScreen() {
	const { voucherStorageData, updateFlexdatesStorage, flexdatesStorageData } = useContext(AuthContext);
	const [loaderState, setLoaderState] = useState(false);

	const dataDateFrom = flexdatesStorageData.fechaSalida;
	const dataDateTo = flexdatesStorageData.fechaRegreso;
	const dataLimit = voucherStorageData.fechaLimite;
	const dataDays = voucherStorageData.days;
	const dataIsFlex = voucherStorageData.fechaFlexible;

	// IOS Modal control
	const showDialog = () => setVisible(true);
	const hideDialog = () => setVisible(false);

	// state variables :
	const [visible, setVisible] = React.useState(false);

	const [confirmTransaction, setConfirmTransaction] = React.useState({
		screen: 'datepicker',
		status: null,
		message: null,
	});

	const [dateStringFrom, setDateStringFrom] = useState(
		flexdatesStorageData.dateFrom
	);
	const [dateStringTo, setDateStringTo] = useState(
		flexdatesStorageData.dateTo
	);

	const [currentDate, setCurrentDate] = useState(
		formatDate(voucherStorageData.fechaSalida, 'string', 'date')
	);

	// const [dateFrom, setDateFrom] = useState(
	// 	formatDate(voucherStorageData.fechaSalida, 'string', 'date')
	// );
	// const [dateTo, setDateTo] = useState(
	// 	formatDate(voucherStorageData.fechaRegreso, 'string', 'date')
	// );
	const [showDatepicker, setShowDatepicker] = useState(false);

	// Android - Onchange selected Date
	const selectedDateAndroid = (event, date) => {
		if (date != undefined) {
			const selectedDate = date;
			let choosendDate = selectedDate;
			let choosendDatePlusDays = sumarDias(selectedDate, dataDays);

			setShowDatepicker(false);
			setCurrentDate(selectedDate);
			// setDateFrom(choosendDate);
			// setDateTo(choosendDatePlusDays);
			setDateStringFrom(formatDate(choosendDate, 'date', 'string'));
			setDateStringTo(formatDate(choosendDatePlusDays, 'date', 'string'));
		} else {
			setShowDatepicker(false);
		}
	};
	// IOS - Onchange selected Date
	const selectedDateIos = (event, date) => {
		// if (currentDate != undefined) {
		hideDialog();
		const selectedDate = currentDate;
		let choosendDate = selectedDate;
		let choosendDatePlusDays = sumarDias(selectedDate, dataDays);

		setShowDatepicker(false);
		setCurrentDate(selectedDate);
		// setDateFrom(choosendDate);
		// setDateTo(choosendDatePlusDays);
		setDateStringFrom(formatDate(choosendDate, 'date', 'string'));
		setDateStringTo(formatDate(choosendDatePlusDays, 'date', 'string'));
		// } else {
		// 	setShowDatepicker(false);
		// }
	};


	const sendFlexDates = async (reservaId, dateStringFrom, dateStringTo) => {
		setLoaderState(true);
		const responseDataApi = await sendFlexates(reservaId, dateStringFrom, dateStringTo);

		if (responseDataApi.status == 'ok') {
			setConfirmTransaction({
				...confirmTransaction,
				screen: 'success',
				status: 'ok',
				message: responseDataApi.respuesta,
			});

			if (responseDataApi.detalleReserva.fechaSalida) {
				setDateStringFrom(responseDataApi.detalleReserva.fechaSalida);
				setDateStringTo(responseDataApi.detalleReserva.fechaRegreso);
				updateFlexdatesStorage(responseDataApi.detalleReserva.fechaSalida, responseDataApi.detalleReserva.fechaRegreso);
			} else {
				setDateStringFrom(responseDataApi.fechaSalida);
				setDateStringTo(responseDataApi.fechaRegreso);
				updateFlexdatesStorage(responseDataApi.fechaSalida, responseDataApi.fechaRegreso);
			}

		} else if (responseDataApi.error != undefined) {
			setConfirmTransaction({
				...confirmTransaction,
				screen: 'reject',
				status: 'ko',
				message: responseDataApi.error,
			});
		} else if (responseDataApi.error === undefined && responseDataApi.message) {
			//caso reservas antiguas 
			setConfirmTransaction({
				...confirmTransaction,
				screen: 'reject',
				status: 'ko',
				message: responseDataApi.message,
			});
		} else if (responseDataApi.status == 'error') {
			setConfirmTransaction({
				...confirmTransaction,
				screen: 'error',
				status: 'error',
				message: responseDataApi.respuesta,
			});
		} else {
			setConfirmTransaction({
				...confirmTransaction,
				screen: 'error',
				status: 'error',
				message: 'Ocurrio un error. Por favor, vuelva a intentarlo más tarde.',
			});
		}
		setLoaderState(false);

	};

	const openDatepicker = () => {
		setShowDatepicker(true);
	};

	const updateIosChangeDate = (event, date) => {
		setCurrentDate(date);
	};


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

	const getcallbackBtnRetry = () => {
		setConfirmTransaction({
			...confirmTransaction,
			screen: 'datepicker'
		});
	}

	if (loaderState) {
		return (
			<ActivityIndicator style={styles.loader} size='large' color='#33569A' />
		);
	}

	return (
		<ScrollView style={styles.container}>
			<Title>Puedes cambiarlas cuando quieras</Title>
			<Paragraph style={styles.flexdateParagraph}>
				Recuerda que tienes un año para hacerlo, las veces que quieras sin
				penalidades ni cambio de tarifa. Solo te queda disfrutar!
			</Paragraph>

			{dataIsFlex &&
				<View>
					{confirmTransaction.screen === 'datepicker' && (
						<Card elevation={2} style={styles.card}>
							<Card.Title
								title='Seleccionar'
								subtitle='Nueva fecha'
								left={(props) => (
									<RoundedIcon
										{...props}
										icon='calendar'
										iconSource='Ionicons'
										color='#0D559E'
									/>
								)}
							/>
							<Card.Content>
								<TextKeyValue textKey="Fecha máxima: " textValue={formatDate(dataLimit, 'string', 'text')} />
								<TextKeyValue textKey="Cantidad de días: " textValue={dataDays} />

								<Separador />
								<Divider />
								<Separador />
								<TouchableRipple
									onPress={openDatepicker}
									style={styles.twoColumnData}
								>
									<TwoColumnButton leftName='Desde: ' rightValue={formatDate(dateStringFrom, 'string', 'text')} />
								</TouchableRipple>

								<TouchableRipple
									style={[styles.twoColumnData, styles.inputDisabled]}
								>
									<TwoColumnButton leftName='Hasta: ' rightValue={formatDate(dateStringTo, 'string', 'text')} />
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

					{confirmTransaction.screen === 'success' && (
						<CardFlexCases
							screen='success'
							title='Felicitaciones Viajer@'
							subtitle='Cambio realizado!'
							iconColor='#008000'
							headerIcon='check'
							iconSource='Entypo'
							message={confirmTransaction.message}
							dateFrom={formatDate(dateStringFrom, 'string', 'text')}
							dateTo={formatDate(dateStringTo, 'string', 'text')}
							button={true}
							buttonText='Realizar nuevo cambio'
							callbackBtnRetry={() => getcallbackBtnRetry()}
						/>
					)}

					{confirmTransaction.screen === 'reject' && (
						<CardFlexCases
							screen='reject'
							title='Lo sentimos!'
							subtitle='Cambio rechazado'
							iconColor='#ffa500'
							headerIcon='close'
							iconSource='AntDesign'
							message={confirmTransaction.message}
							button={true}
							buttonText='Reintentar'
							callbackBtnRetry={() => getcallbackBtnRetry()}
						/>
					)}

					{confirmTransaction.screen === 'error' && (
						<CardFlexCases
							screen='error'
							title='Lo sentimos!'
							subtitle='Ocurrio un error'
							iconColor='#b5b5b5'
							headerIcon='warning'
							iconSource='Ionicons'
							message={confirmTransaction.message}
							button={true}
							buttonText='Reintentar'
							callbackBtnRetry={() => getcallbackBtnRetry()}
						/>
					)}

					<View>
						{Platform.OS === 'android' &&
							<>
								{showDatepicker && (
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
										onChange={selectedDateAndroid}
									/>
								)}
							</>
						}
						{Platform.OS === 'ios' &&
							<Portal>
								<Dialog visible={showDatepicker} onDismiss={hideDialog}>
									<Dialog.Title>Nueva fecha de salida</Dialog.Title>
									<Dialog.Content>
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
											onChange={updateIosChangeDate}
										/>
									</Dialog.Content>
									<Dialog.Actions>
										<Button onPress={selectedDateIos}>Done</Button>
									</Dialog.Actions>
								</Dialog>
							</Portal>
						}
					</View>




					{/* <Button raised mode={'contained'} onPress={showDialog}>
				Show Dialog
			</Button> */}

					{/* <Button
						raised
						onPress={() => sendFlexDates('340996', '2020-11-11', '2020-11-14')}
					>
						PRUEBA FECHA HARCODEADA
					</Button> */}
				</View>
			}

			{!dataIsFlex &&
				<View>
					<CardFlexCases
						screen='noflex'
						title='No disponible'
						subtitle='Lo sentimos'
						iconColor='#ffa500'
						headerIcon='warning'
						iconSource='Ionicons'
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
	loader: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#33569a1c',
	},
	card: {
		marginBottom: 25,
	},
	twoColumnData: {
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
