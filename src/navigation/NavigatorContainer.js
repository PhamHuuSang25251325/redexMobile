import React, { useContext,useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { Context } from '../contexts/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';
import { ActivityIndicator, View } from 'react-native';
import Drawer from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import { createStackNavigator } from "@react-navigation/stack";

const NavigatorConatiner = () => {
    const { data, logout, refreshToken } = useContext(Context);
    useEffect(() => {
        const bootstrapAsync = async () => {
            const userToken = await AsyncStorage.getItem('userToken');
            if (!userToken) {
                logout();
            } else {
                refreshToken();
            }

        };
        bootstrapAsync();
    }, [])


    if (data.isLoading) {
        return (
            <View>
                <ActivityIndicator />
            </View>
        )
    }

    return (
        <NavigationContainer>
              <RootNavigator userToken={data.userToken} />
        </NavigationContainer>
    )
}

const RootStack = createStackNavigator();
const RootNavigator = ({ userToken }) => {
    return (
        <RootStack.Navigator headerMode="none">
            {userToken ? (
                <RootStack.Screen
                    name="App"
                    component={Drawer}
                />
            ) : (
                    <RootStack.Screen
                        name="Auth"
                        component={AuthNavigator}
                    />
                )}
        </RootStack.Navigator>
    )
}

export default NavigatorConatiner;