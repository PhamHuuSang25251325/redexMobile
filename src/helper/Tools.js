import {Alert} from 'react-native';

export default {
    confimDelete : (param,callback)=>{
        Alert.alert(
            '',
            'Bạn chắc chắn muốn xóa??',
            [
              {text: 'Cancel', onPress: () => {}, style: 'cancel'},
              {text: 'OK', onPress: () => callback(param)},
            ],
            { cancelable: false }
          )
    }
}