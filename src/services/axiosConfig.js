import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const instance = axios.create({
    baseURL : 'https://cryptic-headland-99504.herokuapp.com/api'
})

instance.interceptors.request.use(
    async (config)=>{
        const token = await AsyncStorage.getItem('userToken');
        if(token){
            config.headers.Authorization= `Bearer ${token}`
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
)

export default instance;
