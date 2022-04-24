import React, { useState, useEffect, useMemo, useReducer } from 'react';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import {
	NavigationContainer,
	getFocusedRouteNameFromRoute,
} from '@react-navigation/native';

import MainTabNavigation from './src/navigation/MainTabNavigation';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { AuthProvider } from './src/context/AuthContext';
import { getVoucherApi } from './src/services/apiVoucher';
import {
	DefaultTheme,
	Appbar,
	TextInput,
	Provider as PaperProvider,
} from 'react-native-paper';
import LoginScreen from './src/screens/LoginScreen';
import react from 'react';
import { AuthContext } from './src/context/AuthContext';
import voucherStorageData from './src/model/voucherStorageData.json';
import MenuScreen from './src/screens/MenuScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

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

export default function App() {
	// const [isLoading, setIsLoading] = useState(true);
	// const [userToken, setUserToken] = useState(null);

	// const voucherStorageData = voucherStorageData;

	const initialLoginState = {
		isLoading: true,
		authSignIn: '',
		signedIn: false,
		voucherData: [],
	};

	const loginReducer = (prevState, action) => {
		console.log(
			'%c App / loginReducer: ',
			'color: #AD23BE; background: #F2D9F5',
			action
		);
		switch (action.type) {
			case 'RETRIEVE_TOKEN':
				return {
					...prevState,
					authSignIn: action.signIn,
					isLoading: false,
					signedIn: action.signedIn,
					voucherData: action.voucherData,
				};
			case 'LOGIN':
				return {
					...prevState,
					authSignIn: action.signIn,
					signedIn: action.signedIn,
					isLoading: false,
					voucherData: action.voucherData,
				};
			case 'LOGOUT':
				return {
					...prevState,
					authSignIn: null,
					signedIn: false,
					isLoading: false,
				};
		}
	};

	const [loginState, dispatch] = React.useReducer(
		loginReducer,
		initialLoginState
	);

	const [storageVoucher, setStorageVoucher] = useState(null);

	const authDataContext = useMemo(() => ({
		voucherStorageData: storageVoucher,
		signIn: async (validResponse, responseDataApi) => {
			console.log(
				'%c App / signIn: ',
				'color: #AD23BE; background: #F2D9F5',
				validResponse,
				responseDataApi
			);

			const authSignIn = validResponse;

			setStorageVoucher(responseDataApi);

			try {
				await AsyncStorage.setItem('authSignIn', authSignIn);
			} catch (e) {
				console.log('error: ', e);
			}

			dispatch({
				type: 'LOGIN',
				signIn: authSignIn,
				signedIn: authSignIn.length == 0 ? false : true,
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
		console.log('%c App / useEffect', 'color: #057049; background: #D3F4CD');
		setTimeout(async () => {
			// setIsLoading(false);
			console.log('%c App / setTimeout', 'color: #057049; background: #D3F4CD');
			let authSignIn;
			authSignIn = '';
			let varSignedIn = false;
			try {
				authSignIn = await AsyncStorage.getItem('authSignIn');
				const responseDataApi = await getVoucherApi(authSignIn);
				if (responseDataApi.error === false) {
					console.log('AsyncStorage responseDataApi: ', responseDataApi);
					setStorageVoucher(responseDataApi);
					varSignedIn = true;
					console.log(
						'%c App / setTimeout / if (responseDataApi.error === false',
						'color: #057049; background: #D3F4CD'
					);
				}
			} catch (error) {
				console.log('error: ', error);
			}
			dispatch({
				type: 'RETRIEVE_TOKEN',
				signIn: authSignIn,
				signedIn: varSignedIn,
			});
		}, 500);
	}, []);

	if (loginState.isLoading) {
		return (
			<ActivityIndicator style={styles.loader} size='large' color='#33569A' />
		);
	}

	return (
		<>
			{console.log(
				'%c App / RENDERED!',
				'color: #057049; background: #D3F4CD',
				loginState.signedIn
			)}
			<PaperProvider theme={theme}>
				<AuthContext.Provider value={authDataContext}>
					<NavigationContainer>
						{loginState.signedIn ? (
							<Drawer.Navigator
								drawerContent={() => <MenuScreen menu={storageVoucher} />}
							>
								<Drawer.Screen name='Home' component={MainTabNavigation} />
							</Drawer.Navigator>
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
		</>
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
