import createDataContext from './createDataContext';
import AsyncStorage from '@react-native-community/async-storage';
import apiHepler from './../services/axiosConfig';

const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const LOGOUT = 'LOGOUT';
const REFRESH_TOKEN = 'REFRESH_TOKEN';
const REGISTER_SUCCESS= 'REGISTER_SUCCESS';
const REGISTER_FAILURE= 'REGISTER_FAILURE';
import { ToastAndroid } from 'react-native'


const initialState = {
    logginIn: false,
    loggedIn: false,
    user: null,
    userToken: null,
    isLoading: true,
    err_message: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
       
        case REFRESH_TOKEN:
            return {
                loggedIn: true,
                userToken: action.token,
                isLoading: false
            }
        case LOGIN_REQUEST:
            return {
                logginIn: true,
                user: action.user,
            }
        case LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user,
                userToken: action.token
            }
        case LOGIN_FAILURE:
            return {
                err_message: action.message
            }
           
        case LOGOUT:
            return {

            }

        default:
            return state;
    }
}

const login = dispatch => async ({ username, password }) => {
    dispatch({
        type: LOGIN_REQUEST
    })
    try {
        const data = await apiHepler.post('/login', {
            email: username,
            password: password
        });
        const { token } = data.data;
        await AsyncStorage.setItem('userToken', token);
        dispatch({
            type: LOGIN_SUCCESS,
            token
        })
    } catch ({ response: { data } }) {
        dispatch({
            type: LOGIN_FAILURE,
            message: data.message
        })
    }

}

const register = dispatch => async ({ email, password,name }) => {
   
    try {
         await apiHepler.post('/register', {
            email,
            password,
            name
        });
        ToastAndroid.show('Đăng kí tài khoản thành công', ToastAndroid.LONG,ToastAndroid.TOP);
        
    } catch ({ response: { data } }) {
        
        ToastAndroid.show(data.message, ToastAndroid.LONG,ToastAndroid.TOP);
    }

}


const logout = dispatch => async () => {
    await AsyncStorage.removeItem('userToken')
    dispatch({
        type: LOGOUT,
    })

}

const refreshToken = dispatch => async () => {
    try {
        const res = await apiHepler.post('/refresh');
        const token = res.data.access_token;
        await AsyncStorage.setItem('userToken', token);
        dispatch({
            type: REFRESH_TOKEN,
            token
        })
    } catch (error) {
        dispatch({
            type : LOGOUT
        })
    }
}

export const { Context, Provider } = createDataContext(reducer, { login, logout ,refreshToken, register}, initialState); 