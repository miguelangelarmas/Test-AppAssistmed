import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useContext } from 'react';
import { Button } from 'react-native-paper';

import { AuthContext } from '../context/AuthContext';

export default function MiCoberturaScreen() {
	const { infoDataStorage, signOut } = useContext(AuthContext);

	console.log(
		'%c MiCoberturaScreen / AuthContext: ',
		'color: #478B20; background: #E7FFD9',
		useContext(AuthContext)
	);

	return (
		<View style={style.container}>
			<Text>Mi CoberturaTab Screen</Text>
			<Text>Info Data Storage: {infoDataStorage}</Text>
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
