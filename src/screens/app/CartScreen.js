import React, { useContext, useEffect } from 'react';
import { View, SafeAreaView, ActivityIndicator } from 'react-native';
import CustomHeader from '../../shared/CustomHeader';
import { Context as CartContext } from '../../contexts/CartContext';
import Cart from '../../components/Cart';


const CartScreen = ({ navigation }) => {
    const { data, getItems, deleteItem, updateItem } = useContext(CartContext);
    useEffect(() => {
        getItems();
    }, [])


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CustomHeader title="Giỏ hàng" navigation={navigation} isHome={true} />
            {data.loading ?
                (
                    <View style={{ alignItems: 'center', flex: 1, alignContent: 'center' }}>
                        <ActivityIndicator size="large" />
                    </View>
                )
                :
                (
                    <Cart data={data.listItem} deleteItem={deleteItem} updateItem={updateItem} navigation={navigation} />
                )}

        </SafeAreaView>

    )
}



export default CartScreen;