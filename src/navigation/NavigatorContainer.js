import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import Drawer from './AppNavigator';

const NavigatorConatiner = () => {
    return (
        <NavigationContainer>
            <Drawer />
        </NavigationContainer>
    )
}

export default NavigatorConatiner;