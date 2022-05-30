import React, { useState, useContext } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
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
	const { voucherStorageData, updateVoucherStorage, flexdatesStorageData } = useContext(AuthContext);
	const [loaderState, setLoaderState] = useState(false);

	const dataDateFrom = flexdatesStorageData.fechaSalida;
	const dataDateTo = flexdatesStorageData.fechaRegreso;
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

	const [dateFrom, setDateFrom] = useState(
		formatDate(voucherStorageData.fechaSalida, 'string', 'date')
	);
	const [dateTo, setDateTo] = useState(
		formatDate(voucherStorageData.fechaRegreso, 'string', 'date')
	);
	const [show, setShow] = useState(false);


	const onChange = (event, date) => {
		if (date != undefined) {

			const selectedDate = date;
			let choosendDate = selectedDate;
			let choosendDatePlusDays = sumarDias(selectedDate, dataDays);

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
			updateVoucherStorage(responseDataApi.detalleReserva.fechaSalida, responseDataApi.detalleReserva.fechaRegreso);

			if (responseDataApi.detalleReserva.fechaSalida) {
				setDateStringFrom(responseDataApi.detalleReserva.fechaSalida);
				setDateStringTo(responseDataApi.detalleReserva.fechaRegreso);
			} else {
				setDateStringFrom(responseDataApi.fechaSalida);
				setDateStringTo(responseDataApi.fechaRegreso);
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
		}
		setLoaderState(false);

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

			{/* <View
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

					<View>
						<Text style={{ color: 'red' }}>
							{/* Fecha seleccionada: {formatDate(dateFrom, 'date', 'string')} */}
						</Text>
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
							headerIcon='check'
							iconSource='Entypo'
							message={confirmTransaction.message}
							dateFrom={formatDate(dateStringFrom, 'string', 'text')}
							dateTo={formatDate(dateStringTo, 'string', 'text')}
							button={true}
							callbackBtnRetry={() => getcallbackBtnRetry()}
						/>
					)}

					{confirmTransaction.screen === 'reject' && (
						<CardFlexCases
							screen='reject'
							title='Lo sentimos!'
							subtitle='Cambio rechazado'
							headerIcon='close'
							iconSource='AntDesign'
							message={confirmTransaction.message}
							button={true}
							callbackBtnRetry={() => getcallbackBtnRetry()}
						/>
					)}

					{confirmTransaction.screen === 'error' && (
						<CardFlexCases
							screen='error'
							title='Lo sentimos!'
							subtitle='Ocurrio un error'
							headerIcon='warning'
							iconSource='Ionicons'
							message='Lo sentimos. Ocurrio un error. Por favor, vuelva a intentarlo más tarde o comuníquese con nosotros para asistirlo.'
							button={true}
							callbackBtnRetry={() => getcallbackBtnRetry()}
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
						onPress={() => sendFlexDates('339130', '2020-07-02', '2020-07-08')}
					>
						PRUEBA FECHA HARCODEADA
					</Button> */}
					{/* <Button
						raised
						onPress={() => formatDate(new Date('2022-05-31'), 'date', 'text')}
					>
						PRUEBA FORMAT DATE
					</Button> */}

				</View>
			}

			{!dataIsFlex &&
				<View>
					<CardFlexCases
						screen='noflex'
						title='No disponible'
						subtitle='Lo sentimos'
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
