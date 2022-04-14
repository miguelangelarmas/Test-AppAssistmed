import React, { useState, useEffect, useMemo, useReducer } from 'react';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
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
	colors: {
		...DefaultTheme.colors,
		primary: '#A23330',
		accent: '#06326B',
	},
};

const dummyVoucherStorageData = JSON.parse(JSON.stringify(voucherStorageData));

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
						<MainTabNavigation />
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
