import React, { useState, useContext } from 'react';
import {
	View,
	StyleSheet,
	FlatList,
	ScrollView,
	SafeAreaView,
} from 'react-native';
import {
	useTheme,
	DefaultTheme,
	Avatar,
	Text,
	Button,
	Card,
	Title,
	Paragraph,
	Divider,
	Subheading,
} from 'react-native-paper';

import { AuthContext } from '../context/AuthContext';

export default function MiCoberturaCoberturasScreen() {
	const { voucherStorageData } = useContext(AuthContext);
	const { colors } = useTheme();
	// console.log(
	// 	'%c MiCoberturaCoberturasScreen / AuthContext: ',
	// 	'color: #478B20; background: #E7FFD9',
	// 	voucherStorageData
	// );

	return (
		<ScrollView style={styles.container}>
			<Card elevation={2} style={styles.card}>
				<Card.Content>
					<Title>Detalle de Coberturas</Title>

					{voucherStorageData.coberturas.map((cobertura, key) => {
						return (
							<View style={styles.item} key={key}>
								<Divider style={styles.divider} />
								<Subheading>{cobertura.name}</Subheading>
								<Text style={styles.coberturaPrecio}>
									{cobertura.money} {cobertura.value}
								</Text>
							</View>
						);
					})}
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
	},
	card: {
		marginBottom: 25,
	},
	divider: {
		marginTop: 15,
		marginBottom: 10,
	},
	coberturaTitulo: {},
	coberturaPrecio: {
		fontWeight: 'bold',
	},
	item: {
		marginBottom: 0,
	},
	separador: {
		marginBottom: 10,
	},
});
