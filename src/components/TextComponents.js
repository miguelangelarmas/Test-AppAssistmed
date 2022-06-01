import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const TextLine = (props) => (
	<Text style={[styles.textLine, { color: (props.color ? props.color : '#424242de') }]}>{props.text}</Text>
);

export const TextKeyValue = (props) => (
	<View style={styles.textKeyValue}>
		<Text style={[styles.textLine, { fontWeight: 'bold' }]}>{props.textKey} </Text>
		<Text style={[styles.textLine, {}]}>{props.textValue}</Text>
	</View>
);

const styles = StyleSheet.create({
	textLine: {
		fontSize: 16,
		color: '#424242de',
		marginBottom: 5
	},
	textKeyValue: {
		flexDirection: 'row',
	},
	twoColumnData: {
	},

});
