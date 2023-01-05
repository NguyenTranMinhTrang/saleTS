import { PermissionsAndroid } from 'react-native';
import { launchImageLibrary, ImageLibraryOptions, ImagePickerResponse, Asset } from 'react-native-image-picker';

const LibraryLauch = async () => {

    const grantedstorage = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
            title: 'App Camera Permission',
            message: 'App needs access to your camera ',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
        }
    );

    let options: ImageLibraryOptions = {
        mediaType: 'mixed',
    };

    return new Promise((resolve) => {
        if (grantedstorage === PermissionsAndroid.RESULTS.GRANTED) {
            launchImageLibrary(options, (res: ImagePickerResponse) => {
                console.log('Response = ', res);
                if (res.didCancel) {
                    console.log('User cancelled image picker');
                    resolve({
                        code: 0,
                        message: 'User cancelled image picker',
                    });
                } else
                    if (res.errorCode) {
                        console.log('ImagePicker Error: ', res.errorCode);
                        resolve({
                            code: 0,
                            message: `ImagePicker Error: ${res.errorMessage}`,
                        });
                    } else {
                        const asset = res.assets as Asset[];
                        resolve({
                            code: 1,
                            uri: asset[0].uri,
                        });
                    }
            });
        }
        else {
            resolve({
                code: 0,
                message: 'Dont have permission',
            });
        }
    });
};

export default LibraryLauch;


