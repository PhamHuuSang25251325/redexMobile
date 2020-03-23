import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Images from '../constants/images';
import Tools from '../helper/Tools';
import NumberInput from '../components/NumberInput';
import AntDesign from 'react-native-vector-icons/AntDesign'

const CartItem = ({ item, navigation, deleteItem, updateItem }) => {
    return (
        <View  style={{ borderColor: '#ddd', borderWidth: 1, marginTop: 20, borderRadius: 5, padding: 10, backgroundColor: '#ffffff', width: 380 }}>
            <View style={{ flexDirection: 'row' }}>
                <Image
                    style={{ width: 30, height: 30, marginRight: 10 }}
                    source={{ uri: `https:${item.shop_logo}` }}
                />
                <Text style={{color : '#666'}}>{item.shop_name}</Text>
            </View>
            <View style={{ flexDirection: 'row', borderColor: '#ddd', borderWidth: 1 }}>
                <View style={{ flex: 2.5 }}>
                    <TouchableOpacity onPress={() => navigation.navigate("OrderSite", {
                        uri: item.url
                    })}>
                        <Image
                            style={{ width: 100, height: 100 }}
                            source={{ uri: `https:${item.image_link}` }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 7.5, marginLeft: 20 }}>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', flex: 2, flexDirection: 'row', alignContent: "center" }} >
                        <Text style={{ textAlign: "center", flex: 9 ,color : '#666'}}>{item.product_name}</Text>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => Tools.confimDelete(item.id, deleteItem)}>
                           <AntDesign name="closecircle" color="#e42929" size={20}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 3 }}>
                            <View >
                                <Text style={{color : '#666'}}>RMB</Text>
                            </View>
                            <View style={{ height: 40 }} >
                                <Text style={{color : '#666'}}>SL</Text>
                            </View>
                            <View >
                                <Text style={{color : '#666'}}>Note</Text>
                            </View>
                            <View >
                                <Text style={{color : '#666'}}>Total</Text>
                            </View>
                        </View>
                        <View style={{ flex: 8, marginLeft: 5 }}>
                            <View >
                                <Text style={{color : '#666'}}>¥{item.price}</Text>
                            </View>
                            <View style={{ height: 40 }}>
                                <NumberInput value={item.quantity} onChange={(value) => updateItem({
                                    ...item,
                                    quantity: value
                                })} />
                            </View>
                            <View >
                                <Text style={{color : '#666'}}>Note....................</Text>
                            </View>
                            <View >
                            <Text style={{color : '#666'}}>¥{item.price * item.quantity}</Text>
                            </View>
                        </View>
                    </View>

                </View>
            </View>
        </View>
    )
}

export default CartItem;