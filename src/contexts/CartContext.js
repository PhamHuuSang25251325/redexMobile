import createDataContext from './createDataContext';
import apiHepler from './../services/axiosConfig';
import { ToastAndroid } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
const FETCHING_PRODUCTS = 'FETCHING_PRODUCTS';
const ADD_ITEM = 'ADD_ITEM';
const UPDATE_ITEM = 'UPDATE_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';
const CHECK_OUT = 'CHECK_OUT';
const REQUEST_ERROR = 'REQUEST_ERROR'


const initialState = {
    listItem: [],
    loading: false,
    message_error: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return {
                ...state,
                listItem: action.items,
                loading: false
            }
        case FETCHING_PRODUCTS:
            return {
                ...state,
                loading: true
            }
        case ADD_ITEM:
            let index = state.listItem.findIndex(item => item.id === action.item.id);
            if (index === -1) {
                return {
                    ...state,
                    listItem: [...state.listItem, action.item]
                }
            }
            return {
                ...state,
                listItem: state.listItem.map(item => item.id !== action.item.id ? item : { ...item, quantity: item.quantity + action.item.quantity })
            }
        case UPDATE_ITEM:
            return {
                ...state,
                listItem: state.listItem.map(item => item.id !== action.item.id ? item : action.item)
            }
        case DELETE_ITEM:
            return {
                ...state,
                listItem: state.listItem.filter(item => item.id !== action.id)
            }
        case CHECK_OUT:
            return initialState;

        case REQUEST_ERROR:
            return {
                ...state,
                loading: false,
                message_error: action.message

            }

        default:
            return state;
    }
}

const addItem = dispatch => async (item) => {
    try {
        const data = await apiHepler.post('/carts', item);
        const { cart } = data.data
        dispatch({
            type: ADD_ITEM,
            item: cart
        })
        ToastAndroid.show('Đã thêm sản phẩm vào giỏ hàng', ToastAndroid.LONG, ToastAndroid.TOP);
    } catch (error) {
        console.log({ error })
    }
}

const updateItem = dispatch => async (item) => {
    try {
        const { id } = item;
        const data = await apiHepler.put(`/carts/${id}`, item)
        dispatch({
            type: UPDATE_ITEM,
            item
        })
    } catch (error) {

    }

}

const getItems = dispatch => async () => {
    dispatch({
        type : FETCHING_PRODUCTS
    })
    try {
        const data = await apiHepler.get('/carts');
        const items = data.data;
        dispatch({
            type: FETCH_PRODUCTS,
            items
        })
    } catch (error) {
        console.log({ error });
        dispatch({
            type: REQUEST_ERROR,
            message_error: 'XXXXX'
        })
    }

}


const deleteItem = dispatch => async (id) => {

    try {
        await apiHepler.delete(`/carts/${id}`);
        dispatch({
            type: DELETE_ITEM,
            id
        })
        ToastAndroid.show('Xóa thành công', ToastAndroid.LONG, ToastAndroid.TOP);
    } catch (error) {
        console.log({ error })
    }


}

const checkout = dispatch => async () => {
    dispatch({
        type: CHECK_OUT,
    })

}

export const { Context, Provider } = createDataContext(reducer, { addItem, updateItem, deleteItem, getItems, checkout }, initialState); 