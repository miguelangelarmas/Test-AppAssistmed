import React, { useState, useEffect, useMemo, useReducer } from 'react';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import {
	NavigationContainer,
	getFocusedRouteNameFromRoute,
} from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './src/context/AuthContext';
import { getVoucherApi } from './src/services/apiVoucher';
import {
	DefaultTheme,
	Appbar,
	TextInput,
	Provider as PaperProvider,
} from 'react-native-paper';
import MainTabNavigation from './src/navigation/MainTabNavigation';
import LoginScreen from './src/screens/LoginScreen';
import react from 'react';
import { AuthContext } from './src/context/AuthContext';
import voucherStorageData from './src/model/voucherStorageData.json';

const Stack = createStackNavigator();

const theme = {
	...DefaultTheme,
	customText: {
		mainTitle: {
			fontSize: 24,
			color: '#06326B',
		},
		title: {
			fontSize: 18,
			color: '#06326B',
		},
		subTitle: {
			fontWeight: 'bold',
			fontSize: 18,
			color: '#06326B',
		},
		paragraph: {
			fontSize: 14,
			color: '#06326B',
		},
	},
	colors: {
		...DefaultTheme.colors,
		primary: '#33569A',
		accent: '#A23330',
		text: '#424242',
	},
};

const dummyVoucherStorageData = JSON.parse(JSON.stringify(voucherStorageData));

function getHeaderTitle(route) {
	// If the focused route is not found, we need to assume it's the initial screen
	// This can happen during if there hasn't been any navigation inside the screen
	// In our case, it's "Feed" as that's the first screen inside the navigator
	const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';

	switch (routeName) {
		case 'Asistencia':
			return 'Asistencia Medica';
		case 'Cobertura':
			return 'Mi Cobertura';
		case 'Flexibles':
			return 'Fechas Flexibles';
	}
}

export default function App() {
	// const [isLoading, setIsLoading] = useState(true);
	// const [userToken, setUserToken] = useState(null);

	// const voucherStorageData = voucherStorageData;
	// console.log('voucherStorageData: ', voucherStorageData);

	const initialLoginState = {
		isLoading: true,
		authSignIn: '',
		voucherData: [],
	};

	const loginReducer = (prevState, action) => {
		switch (action.type) {
			case 'RETRIEVE_TOKEN':
				return {
					...prevState,
					authSignIn: action.signIn,
					isLoading: false,
					voucherData: action.voucherData,
				};
			case 'LOGIN':
				return {
					...prevState,
					authSignIn: action.signIn,
					isLoading: false,
					voucherData: action.voucherData,
				};
			case 'LOGOUT':
				return {
					...prevState,
					authSignIn: null,
					isLoading: false,
				};
		}
	};

	const [loginState, dispatch] = React.useReducer(
		loginReducer,
		initialLoginState
	);

	const [storageVoucher, setStorageVoucher] = useState(dummyVoucherStorageData);

	const authDataContext = useMemo(() => ({
		voucherStorageData: storageVoucher,
		signIn: async (validResponse, responseDataApi) => {
			console.log(
				'%c App / responseDataApi: ',
				'color: #AD23BE; background: #F2D9F5',
				responseDataApi,
				validResponse
			);

			const authSignIn = validResponse;

			// setStorageVoucher(responseDataApi);

			try {
				await AsyncStorage.setItem('authSignIn', authSignIn);
			} catch (e) {
				console.log(e);
			}

			dispatch({
				type: 'LOGIN',
				signIn: authSignIn,
				voucherData: responseDataApi,
			});
		},
		signOut: async () => {
			try {
				await AsyncStorage.removeItem('authSignIn');
			} catch (e) {
				console.log(e);
			}
			dispatch({ type: 'LOGOUT' });
		},
	}));

	useEffect(() => {
		setTimeout(async () => {
			// setIsLoading(false);
			let authSignIn;
			authSignIn = '';
			try {
				authSignIn = await AsyncStorage.getItem('authSignIn');
			} catch (error) {
				console.log(error);
			}
			dispatch({ type: 'RETRIEVE_TOKEN', signIn: authSignIn });
		}, 1000);
	}, []);

	if (loginState.isLoading) {
		return (
			<ActivityIndicator style={styles.loader} size='large' color='#33569A' />
		);
	}

	return (
		<PaperProvider theme={theme}>
			<AuthContext.Provider value={authDataContext}>
				<NavigationContainer>
					{loginState.authSignIn == 'si' ? (
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
								component={MainTabNavigation}
								options={({ route }) => ({
									headerTitle: getHeaderTitle(route),
								})}
							/>
						</Stack.Navigator>
					) : (
						<Stack.Navigator
							screenOptions={{
								headerShown: false,
							}}
						>
							<Stack.Screen name='Login' component={LoginScreen} />
						</Stack.Navigator>
					)}
				</NavigationContainer>
			</AuthContext.Provider>
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
	loader: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#33569a1c',
	},
});
