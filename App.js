import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import  MainTabScreen from './src/MainTabScreen';

const Stack = createStackNavigator();


const LoginScreen = () =>   {
    return (
        <View style={styles.container}>
        <Text>Home Screen</Text>
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
                <Stack.Screen  name="Login" component={MainTabScreen} style={{backgroundColor: "red"}} />
            ) : (
                <Stack.Screen name="Loged" component={MainTabScreen} />
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