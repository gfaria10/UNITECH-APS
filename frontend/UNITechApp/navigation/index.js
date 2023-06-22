import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Colors from '../constants/Colors';
import Welcome from '../screens/welcomeScreen';

// import { RootStackParamList } from '../types';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: Colors.background,
    },
};

export default function Navigation() {
    return (
        <NavigationContainer theme={theme}>
            <RootNavigator />
        </NavigationContainer>
    );
}

const Stack = createNativeStackNavigator();

function RootNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Welcome" component={Welcome} />
            {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
            {/* <Stack.Screen name="Register" component={RegisterScreen} /> */}
        </Stack.Navigator>
    );
}
