import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AntDesign, Ionicons, Feather, Entypo } from '@expo/vector-icons';

const styles = StyleSheet.create({
	iconWrap: {
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
	<View style={[styles.iconWrap, { backgroundColor: (props.color ? props.color : '#0D559E') }]}>
		{console.log("--- props: ", props)}

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
		{(props.iconSource == undefined || props.icon == undefined) && (
			<AntDesign style={styles.icon} name={'right'} />
		)}
	</View>
);
