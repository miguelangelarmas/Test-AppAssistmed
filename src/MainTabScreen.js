import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createMaterialBottomTabNavigator();

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

export default function MainTabScreen(props) {
        return (
        <Tab.Navigator>
            <Tab.Screen 
            style={styles.navigatorTab} 
            name="MiCoberturaTab" 
            component={MiCoberturaTab}  
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="home" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen name="AsistenciaMedicaTab" component={AsistenciaMedicaTab} />
            <Tab.Screen name="FechasFlexiblesTab" component={FechasFlexiblesTab} />
        </Tab.Navigator>
        )
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