import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AntDesign, Ionicons, Feather, Entypo, MaterialIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
	iconWrap: {
		backgroundColor: 'green',
		borderRadius: 20,
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
	icon: {
		color: 'white',
		fontSize: 22,
	},
});

export const RoundedIcon = (props) => (

	<View style={styles.iconWrap}>
		{props.iconSource == 'Ionicons' && (
			<Ionicons style={styles.icon} name={props.icon} />
		)}
		{props.iconSource == 'AntDesign' && (
			<AntDesign style={styles.icon} name={props.icon} />
		)}
		{props.iconSource == 'Feather' && (
			<Feather style={styles.icon} name={props.icon} />
		)}
		{props.iconSource == 'Entypo' && (
			<Entypo style={styles.icon} name={props.icon} />
		)}
		{props.iconSource == 'MaterialIcons' && (
			<MaterialIcons style={styles.icon} name={props.icon} />
		)}
	</View>
);
