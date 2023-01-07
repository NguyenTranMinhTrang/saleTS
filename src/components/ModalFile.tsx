import React from 'react';
import { Modal, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';

type Props = {
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
    children: JSX.Element
}

const ModalFile = ({ show, setShow, children }: Props) => {

    const onPress = () => setShow(false);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={show}
            statusBarTranslucent={true}
        >
            <Pressable
                style={styles.press}
            >
                <TouchableOpacity
                    style={styles.buttonBack}
                    onPress={onPress}
                >
                    <AntDesign size={40} color={COLORS.black} name="arrowleft" />
                </TouchableOpacity>
                {children}
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
        backgroundColor: 'white',
    },
    buttonBack: {
        height: 50,
        width: 50,
        position: 'absolute',
        left: SIZES.padding,
        top: SIZES.padding,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
});

export default ModalFile;
