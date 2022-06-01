import React, { useState, useContext } from 'react';
import { View, StyleSheet, FlatList, ScrollView } from 'react-native';
import {
	DefaultTheme,
	Avatar,
	Text,
	Button,
	Card,
	Title,
	Paragraph,
	Divider,
} from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';
import { formatDate } from '../services/formatDate';
import { TextLine, TextKeyValue } from '../components/TextComponents';

export default function MiCoberturaVouchersScreen() {
	const { voucherStorageData, flexdatesStorageData } = useContext(AuthContext);

	const VouchersIcon = (props) => (
		<Avatar.Icon {...props} icon='file-document' />
	);
	const CoberturaIcon = (props) => (
		<Avatar.Icon {...props} icon='medical-bag' />
	);
	const Separador = () => <View style={styles.separador}></View>;

	return (
		<ScrollView style={styles.container}>
			<Card elevation={3} style={styles.card}>
				{voucherStorageData.vouchers.map((voucher, key) => {
					return (
						<View key={key}>
							<Card.Title title='Vouchers' subtitle='' left={VouchersIcon} />
							<Card.Content>
								<Divider />
								<Title style={{ color: '#33569A' }}>{`Nº de Voucher: ${voucher.voucherId}`}</Title>

								<TextLine text={`${voucher.nombre} ${voucher.apellido}`} />
								<TextKeyValue textKey="Documento: " textValue={voucher.dni} />
							</Card.Content>
						</View>
					);
				})}
			</Card>
			<Card elevation={3}>
				<Card.Title title='Cobertura' subtitle='' left={CoberturaIcon} />
				<Card.Content>
					<Divider />
					<Title style={{ color: '#33569A' }}>{voucherStorageData.producto.nombre}</Title>

					<TextLine text={voucherStorageData.destino} />

					<Separador />

					<TextKeyValue textKey="Fecha de salida: " textValue={formatDate(flexdatesStorageData.dateFrom, 'string', 'text')} />
					<TextKeyValue textKey="Fecha de regreso: " textValue={formatDate(flexdatesStorageData.dateTo, 'string', 'text')} />
					<TextKeyValue textKey="Fecha de reserva: " textValue={formatDate(voucherStorageData.fechaEmision, 'string', 'text')} />

					<Separador />

					<TextKeyValue textKey="Contacto de emergencia: " textValue={voucherStorageData.contactoEmergencia.nombre} />
					<TextKeyValue textKey="Teléfono de emergencia: " textValue={voucherStorageData.contactoEmergencia.telefono} />

				</Card.Content>
			</Card>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#f9f9f9',
		flex: 1,
		padding: 15,
		paddingBottom: 50,
	},
	card: {
		marginBottom: 25,
		paddingBottom: 15,
	},
	separador: {
		marginBottom: 10,
	},
});
