import React, { useMemo } from 'react';
import { View, FlatList, Text } from 'react-native';
import CartItem from './CartItem';

const Cart = ({ data, deleteItem, updateItem, navigation }) => {
    const getToal = useMemo(() => {
        let sum= 0;
        for (const item of data) {
            sum+= item.quantity * item.price
        }
        return sum;
    },[data])
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f8fa' }}>
            <FlatList
                data={data}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <CartItem item={item} id={item.id} deleteItem={deleteItem} updateItem={updateItem} navigation={navigation} />}
            />
            <View style={{ backgroundColor: 'transparent', height: 40, width : '100%'}}>
                <Text style={{ textAlign: 'right' , marginRight : 20}}>Tổng tiền hàng : ¥{getToal}</Text>
            </View>
        </View>
    )
}

export default Cart;