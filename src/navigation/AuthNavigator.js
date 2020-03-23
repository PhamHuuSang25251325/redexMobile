import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

const Stack = createStackNavigator();

const AuthNavigator = ()=>{
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="LOGIN" component={LoginScreen}></Stack.Screen>
            <Stack.Screen name="REGISTER" component={RegisterScreen}></Stack.Screen>
        </Stack.Navigator>
    )
}

export default AuthNavigator;