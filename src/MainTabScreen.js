import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MiCoberturaScreen from "./MiCoberturaScreen";
import AsistenciaMedicaScreen from "./AsistenciaMedicaScreen";
import FechasFlexiblesScreen from "./FechasFlexiblesScreen";

const Tab = createMaterialBottomTabNavigator();

// const MiCoberturaTab = () =>   {
//     return (
//         <View style={styles.container}>
//         <Text>MiCoberturaTab Screen</Text>
//         </View>
//     );
// }
// const AsistenciaMedicaTab = () =>   {
//     return (
//         <View style={styles.container}>
//         <Text>AsistenciaMedicaTab Screen</Text>
//         </View>
//     );
// }
// const FechasFlexiblesTab = () =>   {
//     return (
//         <View style={styles.container}>
//         <Text>FechasFlexiblesTab Screen</Text>
//         </View>
//     );
// }

export default function MainTabScreen(props) {
	return (
		<Tab.Navigator barStyle={styles.navigatorTab}>
			<Tab.Screen
				style={styles.navigatorTab}
				name='Mi Cobertura'
				component={MiCoberturaScreen}
				options={{
					title: "Mi Cobertura",
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name='medical-bag'
							color={color}
							size={20}
						/>
					),
				}}
			/>
			<Tab.Screen
				name='Asistencia Medica'
				component={AsistenciaMedicaScreen}
				options={{
					tabBarLabel: "Asistencia Medica",
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name='card-account-phone'
							color={color}
							size={20}
						/>
					),
				}}
			/>
			<Tab.Screen
				name='Fechas Flexibles'
				component={FechasFlexiblesScreen}
				options={{
					tabBarLabel: "Fechas Flexibles",
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name='autorenew' color={color} size={20} />
					),
				}}
			/>
		</Tab.Navigator>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		fontSize: 14,
	},
	navigatorTab: {
		backgroundColor: "#BE2E2D",
	},
});
