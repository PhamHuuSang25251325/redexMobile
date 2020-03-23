import React, { useContext, useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, Dimensions, TouchableOpacity, ActivityIndicator,Picker,DatePickerAndroid } from 'react-native';
import Images from './../../constants/images';
import { TextInput } from 'react-native-gesture-handler';
import { Context } from '../../contexts/AuthContext';

const { width: WIDTH } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
    const { data, register } = useContext(Context);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    return (
        <ImageBackground source={Images.background_login} style={styles.backgroundContainer}>
              <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Name'
                    value={name}
                    onChangeText={setName}
                    placeholderTextColor='rgba(255,255,255,0.7)'

                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    value={email}
                    onChangeText={setEmail}
                    placeholderTextColor='rgba(255,255,255,0.7)'

                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    placeholderTextColor='rgba(255,255,255,0.7)'

                />
                {/* <Text style={styles.textError}>Mật khẩu không được để trống</Text> */}
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='RePass'
                    value={rePassword}
                    onChangeText={setRePassword}
                    placeholderTextColor='rgba(255,255,255,0.7)'

                />
            </View>
            
            
            {data.err_message && <Text style={styles.textError}>{data.err_message}</Text>}
            <TouchableOpacity onPress={() => register({ email, password, name})} style={styles.btnLogin}>
                {data.logginIn ? (<ActivityIndicator />) : (
                    <Text style={styles.btnText}>REGISTER</Text>
                )}
            </TouchableOpacity>
            <View style={styles.textContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('LOGIN')}>
                    <Text style={styles.textLink}>Quay lại Đăng nhập</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
                    <Text style={{ ...styles.textLink, color: 'red' }}>Quên mật khẩu</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 50
    },
    logo: {
        width: 120,
        height: 120
    },
    text: {
        color: 'pink',
        fontSize: 20,
        fontWeight: '500',
        marginTop: 10,
    },
    input: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(0,0,0,0.35)',
        color: 'rgba(255,255,255,0.7)',
        marginHorizontal: 25
    },
    inputContainer: {
        marginTop: 10
    },
    btnLogin: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#432577',
        justifyContent: 'center',
        marginTop: 20
    },
    btnText: {
        color: 'rgba(255,255,255,0.7)',
        textAlign: 'center',
        fontSize: 16,
    },
    textError: {
        color: 'red',
        fontSize: 14,
        marginLeft: 40
    },
    textContainer: {
        flexDirection: 'row',
        marginTop: 10
    },
    textLink: {
        fontSize: 16,
        textDecorationLine: 'underline',
        textAlign: 'center',
        margin: 10
    }

})

export default LoginScreen;