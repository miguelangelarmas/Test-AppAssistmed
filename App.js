import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const LoginScreen = () =>   {
    return (
        <View style={styles.container}>
        <Text>Home Screen</Text>
        </View>
    );
}
const LogedScreen = () =>   {
    return (
        <Tab.Navigator>
            <Tab.Screen style={styles.navigatorTab} name="MiCoberturaTab" component={MiCoberturaTab}  />
            <Tab.Screen name="AsistenciaMedicaTab" component={AsistenciaMedicaTab} />
            <Tab.Screen name="FechasFlexiblesTab" component={FechasFlexiblesTab} />
        </Tab.Navigator>
    );
}
const MiCoberturaTab = () =>   {
    return (
        <View style={styles.container}>
        <Text>MiCoberturaTab Screen</Text>
        </View>
    );
}
const AsistenciaMedicaTab = () =>   {
    return (
        <View style={styles.container}>
        <Text>AsistenciaMedicaTab Screen</Text>
        </View>
    );
}
const FechasFlexiblesTab = () =>   {
    return (
        <View style={styles.container}>
        <Text>FechasFlexiblesTab Screen</Text>
        </View>
    );
}

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isSignedIn:false,
        };
    }

    render() {
        return (
        <NavigationContainer >
        <Stack.Navigator>
            {this.state.isSignedIn ? (
                <Stack.Screen  name="Login" component={LoginScreen} style={{backgroundColor: "red"}} />
            ) : (
                <Stack.Screen name="Loged" component={LogedScreen} />
            )}
        </Stack.Navigator>
        </NavigationContainer>
        );
    }
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

export default App;