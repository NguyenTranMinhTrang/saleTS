import AsyncStorage from '@react-native-async-storage/async-storage';
import genarateData from '../constants/dummys';

export const setItem = (key: string, data: any) => {
    data = JSON.stringify(data);
    return AsyncStorage.setItem(key, data);
};

export const getItem = (key: string) => {
    return new Promise((resolve) => {
        AsyncStorage.getItem(key).then((data: any) => {
            resolve(JSON.parse(data));
        });
    });
};

export const clearAsyncStorate = () => {
    return AsyncStorage.clear();
};

export const getData = () => {
    let data = genarateData();
    setItem('listData', data);
};
