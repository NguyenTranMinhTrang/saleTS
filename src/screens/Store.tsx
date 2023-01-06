import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../constants';
import { BarChartProduct } from '../components';
import MainLayout from './MainLayout';

const Store = () => {
    return (
        <MainLayout>
            <View style={styles.container}>
                <View style={styles.containHeader}>
                    <Text style={{ ...FONTS.h2, color: COLORS.white }}>Số Lượng Hàng Tồn Kho</Text>
                </View>

                <View style={styles.containerMainView}>
                    <BarChartProduct />
                </View>
            </View>
        </MainLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: SIZES.padding,
    },
    containHeader: {
        alignItems: 'center',
        marginBottom: SIZES.padding,
    },
    containerMainView: {
        height: SIZES.height * 0.7,
        justifyContent: 'center',
    },
});

export default Store;
