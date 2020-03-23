import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import CustomHeader from '../../shared/CustomHeader';
import LinearGradient from 'react-native-linear-gradient'


const HomeScreen = ({ navigation }) => {
    return (
        <LinearGradient style={{ flex: 1 }} colors={['#D3CCE3', '#E9E4F0']}>
            <CustomHeader title="Home" navigation={navigation} isHome={true} />
        </LinearGradient>
    )
}

export default HomeScreen;