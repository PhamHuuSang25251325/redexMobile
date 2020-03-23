import React, { useState, useEffect } from 'react';
import { View, TextInput, Image } from 'react-native';
import Images from '../constants/images';
import { TouchableOpacity } from 'react-native-gesture-handler';

const NumberInput = ({ value: initialValue, onChange }) => {
    const [value, setValue] = useState(initialValue);
    useEffect(()=>{
        setValue(initialValue)
    },[initialValue])
    const handleMinusPress = () => {
        onChange(value - 1);
    }
    const handlePlusPress = () => {
        onChange(value + 1);
    }
    const handleChangeText= (vl)=>{
        onChange(+vl)
    }
    return (
        <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={handleMinusPress}>
                <Image source={Images.minus} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
            <TextInput
                style={{ borderColor: '#ddd', borderWidth: 1, height: 40, fontSize: 15, width: 50 }}
                value={value.toString()}
                onChangeText={handleChangeText}
                keyboardType='numeric'
            />
            <TouchableOpacity onPress={handlePlusPress}>
                <Image source={Images.plus} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>

        </View>
    )
}


export default NumberInput;