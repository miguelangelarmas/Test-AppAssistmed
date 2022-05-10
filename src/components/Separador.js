import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Separador(props) {
	return <View style={styles.separador}></View>;
}

const styles = StyleSheet.create({
	separador: {
		marginBottom: 10,
	},
});
