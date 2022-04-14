import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useContext } from 'react';
import { Button } from 'react-native-paper';

import { AuthContext } from '../context/AuthContext';

export default function MiCoberturaScreen() {
	const { signOut } = useContext(AuthContext);
	return (
		<View style={style.container}>
			<Text>Mi CoberturaTab Screen</Text>
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
