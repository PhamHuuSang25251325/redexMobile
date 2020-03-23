import React, { useContext } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import Images from '../constants/images';
import { Context } from '../contexts/AuthContext';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';


const CustomHeader = ({ title, navigation, isHome }) => {
    const { logout } = useContext(Context);
    return (
        <View style={{ flexDirection: 'row', height: 50, marginLeft: 5 }}>
            <View style={{ flex: 1, justifyContent: "center" }}>
                {isHome ? (
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Feather name="menu" size={20} />
                    </TouchableOpacity>
                ) : (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image style={{ width: 30, height: 30, marginLeft: 5 }}
                                source={Images.back}
                                resizeMode="contain"

                            />
                        </TouchableOpacity>
                    )}
            </View>
            <View style={{ flex: 1.5, justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', color: '#697683' }}>{title}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <AntDesign name="home" color="gray" size={20} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                        <AntDesign name="shoppingcart" color="blue" size={20} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <TouchableOpacity onPress={logout}>
                        <AntDesign name="logout" color="red" size={20} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default CustomHeader;