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
	Provider as PaperProvider,
} from 'react-native-paper';
import MainTabNavigation from './src/navigation/MainTabNavigation';
import LoginScreen from './src/screens/LoginScreen';
import react from 'react';
import { AuthContext } from './src/context/AuthContext';

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
	// const [isLoading, setIsLoading] = useState(true);
	// const [userToken, setUserToken] = useState(null);

	const initialLoginState = {
		isLoading: true,
		userName: null,
		userToken: null,
	};

	const loginReducer = (prevState, action) => {
		switch (action.type) {
			case 'RETRIEVE_TOKEN':
				return {
					...prevState,
					userToken: action.token,
					isLoading: false,
				};
			case 'LOGIN':
				return {
					...prevState,
					userName: action.id,
					userToken: action.token,
					isLoading: false,
				};
			case 'LOGOUT':
				return {
					...prevState,
					userName: null,
					userToken: null,
					isLoading: false,
				};
		}
	};

	const [loginState, dispatch] = React.useReducer(
		loginReducer,
		initialLoginState
	);

	const authDataContext = useMemo(() => ({
		signIn: async (foundUser) => {
			console.log('App / authDataContext: ', userName);

			const userToken = String(foundUser[0].userToken);
			const userName = foundUser[0].username;

			try {
				await AsyncStorage.setItem('userToken', userToken);
			} catch (e) {
				console.log(e);
			}

			dispatch({ type: 'LOGIN', id: userName, token: userToken });
		},
		signOut: async () => {
			try {
				await AsyncStorage.removeItem('userToken');
			} catch (e) {
				console.log(e);
			}
			dispatch({ type: 'LOGOUT' });
		},
	}));

	useEffect(() => {
		setTimeout(async () => {
			// setIsLoading(false);
			let userToken;
			userToken = null;
			try {
				userToken = await AsyncStorage.getItem('userToken');
			} catch (error) {
				console.log(error);
			}
			dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
		}, 1000);
	}, []);

	if (loginState.isLoading) {
		return (
			<View>
				<Text>IS LOADING</Text>
			</View>
		);
	}

	return (
		// <PaperProvider theme={theme}>
		<AuthContext.Provider value={authDataContext}>
			<NavigationContainer>
				{loginState.userToken != null ? (
					<MainTabNavigation />
				) : (
					<Stack.Navigator>
						<Stack.Screen name='Login' component={LoginScreen} />
					</Stack.Navigator>
				)}
			</NavigationContainer>
		</AuthContext.Provider>
		// </PaperProvider>
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
