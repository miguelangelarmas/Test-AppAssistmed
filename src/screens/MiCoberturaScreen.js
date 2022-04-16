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
		<ScrollView style={styles.container}>
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
						Contacto de emergencia:{'\n'}
						{voucherStorageData.contactoEmergencia.nombre}
					</Paragraph>
					<Paragraph>
						Teléfono de emergencia:{'\n'}
						{voucherStorageData.contactoEmergencia.telefono}
					</Paragraph>
				</Card.Content>
			</Card>

			{/* <CardWithTitle title={'Detalle de Cobertura'} /> */}

			{/* <ItemsList
				data={voucherStorageData.coberturas}
				title={'Detalle de Cobertura'}
			/> */}

			<Button onPress={() => signOut()}>Desloguearse</Button>
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
	separador: {
		marginBottom: 10,
	},
});
