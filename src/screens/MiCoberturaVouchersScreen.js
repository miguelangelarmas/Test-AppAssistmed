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

export default function MiCoberturaVouchersScreen() {
	const { voucherStorageData } = useContext(AuthContext);

	console.log(
		'%c MiCoberturaScreen / AuthContext: ',
		'color: #478B20; background: #E7FFD9',
		voucherStorageData
	);

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
								<Title>{`Nº de Voucher: ${voucher.voucherId}`}</Title>
								<Paragraph>
									{voucher.nombre} {voucher.apellido}
								</Paragraph>
								<Paragraph>Documento: {voucher.dni}</Paragraph>
							</Card.Content>
						</View>
					);
				})}
			</Card>
			<Card elevation={3}>
				<Card.Title title='Cobertura' subtitle='' left={CoberturaIcon} />
				<Card.Content>
					<Divider />
					<Title>{voucherStorageData.producto.nombre}</Title>
					<Paragraph>{voucherStorageData.destino}</Paragraph>

					<Separador />

					<Paragraph>
						Fecha de salida: {voucherStorageData.fechaSalida}
					</Paragraph>
					<Paragraph>
						Fecha de regreso: {voucherStorageData.fechaRegreso}
					</Paragraph>
					<Paragraph>
						Fecha de reserva: {voucherStorageData.fechaEmision}
					</Paragraph>

					<Separador />

					<Paragraph>
						Contacto de emergencia:
						{voucherStorageData.contactoEmergencia.nombre}
					</Paragraph>
					<Paragraph>
						Teléfono de emergencia:
						{voucherStorageData.contactoEmergencia.telefono}
					</Paragraph>
				</Card.Content>
			</Card>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fcfcfc',
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
