import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function LoginScreen() {
	return (
		<View style={style.container}>
			<Text>Login Screen</Text>
		</View>
	);
}

const style = StyleSheet.create({
	container: {
		backgroundColor: "#ffffff",
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
