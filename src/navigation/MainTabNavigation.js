import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
	NavigationContainer,
	getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
// import { Drawer } from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsistenciaMedicaScreen from '../screens/AsistenciaMedicaScreen';
import FechasFlexiblesScreen from '../screens/FechasFlexiblesScreen';
import PaperUIComponentsScreen from '../screens/PaperUIComponentsScreen';
import CustomTopTabs from './CustomTopTabs';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function getHeaderTitle(route) {
	const routeName = getFocusedRouteNameFromRoute(route) ?? 'Assistmed';
	switch (routeName) {
		case 'Cobertura':
			return 'Mi Cobertura';
		case 'Asistencia':
			return 'Asistencia Medica';
		case 'Flexibles':
			return 'Fechas Flexibles';
	}
}

function TabsNavigator() {
	return (
		<Tab.Navigator barStyle={styles.navigatorTab}>
			<Tab.Screen
				style={styles.navigatorTab}
				name='Cobertura'
				component={CustomTopTabs}
				options={{
					title: 'Mi Cobertura',
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
				name='Asistencia'
				component={AsistenciaMedicaScreen}
				options={{
					tabBarLabel: 'Asistencia Medica',
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
				name='Flexibles'
				component={FechasFlexiblesScreen}
				options={{
					tabBarLabel: 'Fechas Flexibles',
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name='autorenew' color={color} size={20} />
					),
				}}
			/>
			{/* <Tab.Screen
		name='Paper UI'
		component={PaperUIComponentsNavigation}
		options={{
			tabBarLabel: 'Paper UI',
			tabBarIcon: ({ color, size }) => (
				<MaterialCommunityIcons name='autorenew' color={color} size={20} />
			),
		}}
	/> */}
		</Tab.Navigator>
	);
}

function PaperUIComponentsNavigation() {
	return <PaperUIComponentsScreen />;
}

export default function MainTabNavigation(props) {
	return (
		<>
			<Stack.Navigator
				screenOptions={{
					headerStyle: {
						backgroundColor: '#BE2E2D',
					},
					headerTintColor: '#fff',
				}}
			>
				<Stack.Screen
					name='Mi cobertura'
					component={TabsNavigator}
					options={({ route }) => ({
						headerTitle: getHeaderTitle(route),
					})}
				/>
			</Stack.Navigator>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fcfcfc',
	},
	navigatorTab: {
		backgroundColor: '#BE2E2D',
	},
});
