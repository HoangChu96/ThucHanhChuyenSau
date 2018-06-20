import { AsyncStorage } from 'react-native';

const saveAvatar = async (avatar) => {
    await AsyncStorage.setItem('@avatar', JSON.stringify(avatar));
};

export default saveAvatar;
