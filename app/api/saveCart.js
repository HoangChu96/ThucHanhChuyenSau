import { AsyncStorage } from 'react-native';

const saveCart = async (cartArray) => {
    await AsyncStorage.setItem('@cart', JSON.stringify(cartArray));
    await console.log('save ok');
    await console.log(cartArray);
};

export default saveCart;
