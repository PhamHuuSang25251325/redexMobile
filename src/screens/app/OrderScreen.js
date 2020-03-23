import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import CustomHeader from '../../shared/CustomHeader';
import Images from '../../constants/images';
import LinearGradient from 'react-native-linear-gradient'

const { width: WIDTH } = Dimensions.get('window');
const OrderScreen = ({ navigation }) => {
    return (
        <LinearGradient style={{ flex: 1 }} colors={['#D3CCE3', '#E9E4F0']}>
            <CustomHeader title="Đặt hàng" navigation={navigation} isHome={true} />
            <View style={styles.listLogoContainer}>
                <View style={styles.logoContainer}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('OrderSite', {
                            uri: 'https://main.m.taobao.com/',
                            title : 'TAOBAO.COM'
                        })
                    }}>
                        <Image style={styles.image} source={Images.taobao_logo} />
                    </TouchableOpacity>
                </View>
                <View style={styles.logoContainer}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('OrderSite', {
                            uri: 'https://www.tmall.com/',
                            title : 'TMALL.COM'
                        })
                    }}>
                        <Image style={styles.image} source={Images.tmall_logo} />
                    </TouchableOpacity>
                </View>
                <View style={styles.logoContainer}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('OrderSite', {
                            uri: 'https://m.1688.com/',
                            title : '1688.COM'
                        })
                    }}>
                        <Image style={styles.image} source={Images.s1688_logo} />
                    </TouchableOpacity>
                </View>
            </View>



        </LinearGradient>

    )
}

const styles = StyleSheet.create({
    listLogoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoContainer: {
        marginTop: 20
    },
    image: {
        width: WIDTH - 55,
        height: 150
    }
})



export default OrderScreen;