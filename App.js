import "react-native-gesture-handler";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import {
	DefaultTheme,
	Appbar,
	Provider as PaperProvider,
} from "react-native-paper";
import MainTabScreen from "./src/MainTabScreen";
import LoginScreen from "./src/LoginScreen";

const Stack = createStackNavigator();

const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: "#BE2E2D",
		accent: "blue",
	},
};

function CustomNavigationBar({ navigation, back }) {
	return (
		<Appbar.Header>
			<Appbar.Content title='My awesome app' />
		</Appbar.Header>
	);
}

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isSignedIn: true,
		};
	}

	render() {
		return (
			<PaperProvider theme={theme}>
				<NavigationContainer>
					{this.state.isSignedIn ? (
						<Stack.Navigator>
							<Stack.Screen
								name='Loged in'
								component={MainTabScreen}
								options={{
									title: "Mi Cobertura",
									headerTintColor: "#ffffff",
									headerStyle: {
										backgroundColor: "#BE2E2D",
									},
								}}
							/>
						</Stack.Navigator>
					) : (
						<Stack.Navigator
							screenOptions={{
								header: (props) => <CustomNavigationBar {...props} />,
							}}
						>
							<Stack.Screen name='Login' component={LoginScreen} />
						</Stack.Navigator>
					)}
				</NavigationContainer>
			</PaperProvider>
		);
	}
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
		fontSize: 50,
	},
});

export default App;
