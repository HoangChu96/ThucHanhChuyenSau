import { AsyncStorage } from 'react-native';

const getAvatar = async () => {
    try {
        const value = await AsyncStorage.getItem('@avatar');
        if (value !== null) {
            return JSON.parse(value);
        }
        return [];
    } catch (error) {
        return [];
    }
};

export default getAvatar;
