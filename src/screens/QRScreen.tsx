import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Linking,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { QRScreenScreenProps } from '../navigation/types';

const QRScreen = ({ navigation }: QRScreenScreenProps) => {

    const onSuccess = (e: any) => {
        console.log('Detect: ', e);
        const check = e.data.substring(0, 4);
        if (check === 'http') {
            Linking.openURL(e.data)
                .then(() => {
                    navigation.goBack();
                })
                .catch(err =>
                    console.error('An error occured', err)
                );
        }
        else {
            console.log('Another type data');
        }
    };

    return (
        <QRCodeScanner
            onRead={onSuccess}
            flashMode={RNCamera.Constants.FlashMode.off}
            topContent={
                <Text style={styles.centerText}>
                    Go to{' '}
                    <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
                    your computer and scan the QR code.
                </Text>
            }
            bottomContent={
                <TouchableOpacity style={styles.buttonTouchable}>
                    <Text style={styles.buttonText}>OK. Got it!</Text>
                </TouchableOpacity>
            }
        />
    );
};

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777',
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)',
    },
    buttonTouchable: {
        padding: 16,
    },
});

export default QRScreen;
