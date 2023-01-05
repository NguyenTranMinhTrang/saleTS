import React from 'react';
import { View, Modal, StyleSheet, Text, Pressable, TouchableOpacity, Alert } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';
import CameraLauch from './Camera';
import LibraryLauch from './Library';

type Props = {
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
    setImage: (uri: string) => void,
}

type Response = {
    code: number,
    message?: string,
    uri?: string,
}

const ModalPickImage = ({ show, setShow, setImage }: Props) => {

    const handleCamera = async () => {
        const image: Response = await CameraLauch() as Response;
        if (image.code === 1 && image.uri) {
            setShow(false);
            setImage(image.uri);
        }
        else {
            const message = image.message as string;
            Alert.alert(message);
        }
    };

    const handleLibrary = async () => {
        const image: Response = await LibraryLauch() as Response;
        if (image.code === 1 && image.uri) {
            setShow(false);
            setImage(image.uri);
        }
        else {
            const message = image.message as string;
            Alert.alert(message);
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={show}
            statusBarTranslucent={true}
        >
            <Pressable
                style={styles.press}
                onPress={() => setShow(false)}
            >
                <View style={styles.container}>
                    <Text style={{ ...FONTS.h1_light, color: COLORS.black }}>Select an option</Text>

                    {/* Camera */}

                    <TouchableOpacity
                        style={{
                            marginTop: SIZES.padding,
                        }}

                        onPress={handleCamera}
                    >
                        <Text style={{ ...FONTS.h2_light, color: COLORS.black }}>Take photo ...</Text>
                    </TouchableOpacity>

                    {/* Library */}

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleLibrary}
                    >
                        <Text style={{ ...FONTS.h2_light, color: COLORS.black }}>Choose from library ...</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                    >
                        <Text style={{ ...FONTS.h2_light, color: COLORS.black }}>Choose another option ...</Text>
                    </TouchableOpacity>

                </View>
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    press: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: COLORS.white,
        width: '90%',
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.padding * 2,
    },
    button: {
        marginTop: SIZES.padding,
    },

});

export default ModalPickImage;
