import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './src/context/AuthContext';
import { getVoucherApi } from './src/services/apiVoucher';
import {
	DefaultTheme,
	Appbar,
	Provider as PaperProvider,
} from 'react-native-paper';
import MainTabNavigation from './src/navigation/MainTabNavigation';
import LoginScreen from './src/screens/LoginScreen';

const Stack = createStackNavigator();

const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: '#BE2E2D',
		accent: 'blue',
	},
};

export default function App() {
	useEffect(() => {
		(async () => {
			await loadVoucherApi('12345678');
		})();
	}, []);

	const loadVoucherApi = async () => {
		try {
			const response = await getVoucherApi();
			console.log('response: ', response);
		} catch (error) {
			console.log('error: ', error);
		}
	};

	const [isSignedIn, setIsSignedIn] = useState(false);

	return (
		<PaperProvider theme={theme}>
			<NavigationContainer>
				<AuthProvider>
					{isSignedIn ? (
						<MainTabNavigation />
					) : (
						<Stack.Navigator>
							<Stack.Screen name='Login' component={LoginScreen} />
						</Stack.Navigator>
					)}
				</AuthProvider>
			</NavigationContainer>
		</PaperProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: 14,
	},
	navigatorTab: {
		fontSize: 50,
	},
});
