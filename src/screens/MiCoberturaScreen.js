import { View, StyleSheet, FlatList } from 'react-native';
import React, { useState, useContext } from 'react';
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
import CardWithTitle from '../components/CardTitle';
import ItemsList from '../components/ItemsList';

export default function MiCoberturaScreen() {
	const { voucherStorageData, signOut } = useContext(AuthContext);

	// console.log(
	// 	'%c MiCoberturaScreen / AuthContext: ',
	// 	'color: #478B20; background: #E7FFD9',
	// 	voucherStorageData
	// );

	const LeftContent = (props) => <Avatar.Icon {...props} icon='folder' />;
	const Separador = () => <View style={styles.separador}></View>;
	// const cardInsideContent = voucherStorageData.vouchers.map((voucher) => (
	// 	<Text>{paragraph.value}</Text>
	// ));

	return (
		<View style={styles.container}>
			<Card elevation={3} style={styles.card}>
				{voucherStorageData.vouchers.map((voucher, key) => {
					return (
						<View key={key}>
							<Card.Title title='Vouchers' subtitle='' left={LeftContent} />
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
				<Card.Title title='Cobertura' subtitle='' left={LeftContent} />
				<Card.Content>
					<Divider />
					<Title>{voucherStorageData.producto.nombre}</Title>
					<Paragraph>{voucherStorageData.destino}</Paragraph>

					<Separador />

					<Text>Fecha de salida: {voucherStorageData.fechaSalida}</Text>
					<Text>Fecha de regreso: {voucherStorageData.fechaRegreso}</Text>
					<Text>Fecha de reserva: {voucherStorageData.fechaEmision}</Text>

					<Separador />

					<Text>
						Contacto de emergencia:{'\n'}
						{voucherStorageData.contactoEmergencia.nombre}
					</Text>
					<Text>
						Teléfono de emergencia:{'\n'}
						{voucherStorageData.contactoEmergencia.telefono}
					</Text>
				</Card.Content>
			</Card>

			{/* <CardWithTitle title={'Detalle de Cobertura'} /> */}

			{/* <ItemsList
				data={voucherStorageData.coberturas}
				title={'Detalle de Cobertura'}
			/> */}

			<Button onPress={() => signOut()}>Desloguearse</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#ffffff',
		flex: 1,
		padding: 15,
	},
	card: {
		marginBottom: 25,
	},
	separador: {
		marginBottom: 10,
	},
});
