import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useState, useContext } from 'react';
import { Button } from 'react-native-paper';

import { AuthContext } from '../context/AuthContext';
import CardWithTitle from '../components/CardTitle';
import ItemsList from '../components/ItemsList';

export default function MiCoberturaScreen() {
	const { voucherStorageData, signOut } = useContext(AuthContext);

	const coberturas = [
		{
			name: 'ASISTENCIA MÉDICA POR ACCIDENTE',
			money: 'USD',
			value: '80.000',
		},
		{
			name: 'ASISTENCIA MÉDICA POR ENFERMEDAD',
			money: 'USD',
			value: '80.000',
		},
		{
			name: 'ASISTENCIA MÉDICA EN CASO DE PRE-EXISTENCIA',
			money: 'USD',
			value: '650',
		},
	];

	console.log(
		'%c MiCoberturaScreen / AuthContext: ',
		'color: #478B20; background: #E7FFD9',
		voucherStorageData.coberturas
	);

	return (
		<View style={style.container}>
			<Text>Vouchers</Text>
			<Text>Nº DE VOUCHER: {voucherStorageData.description}</Text>
			{/* <Text>nombre {infoDataStorage}</Text>
			<Text>Documento: {infoDataStorage}</Text> */}

			{/* <FlatList
				data={voucherStorageData.coberturas}
				renderItem={({ item }) => <Text>{item.name}</Text>}
			/> */}

			{/* <CardWithTitle data={voucherStorageData.coberturas} /> */}
			{/* <CardWithTitle data={voucherStorageData.coberturas} /> */}

			<ItemsList
				data={voucherStorageData.coberturas}
				title={'Detalle de Cobertura'}
			/>

			<Button onPress={() => signOut()}>singOut</Button>
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
