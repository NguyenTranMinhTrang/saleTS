import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SIZES, FONTS, images } from '../constants';
import { subDays } from 'date-fns';
import MainLayout from './MainLayout';
import { ChartScreenProps } from '../navigation/types';

const Chart = ({ navigation }: ChartScreenProps) => {

    const navigateDate = () => navigation.navigate('ChartDay', {
        state: 'date',
        formatDate: 'dd/MM/yyyy',
        initialState: { start: subDays(new Date(), 7), end: new Date() },
    });

    const navigateWeek = () => navigation.navigate('ChartDay', {
        state: 'week',
        formatDate: 'dd/MM/yyyy',
        initialState: { start: subDays(new Date(), 30), end: new Date() },
    });

    const navigateMonth = () => navigation.navigate('ChartDay', {
        state: 'month',
        formatDate: 'dd/MM',
        initialState: { start: subDays(new Date(), 180), end: new Date() },
    });

    return (
        <MainLayout>
            <View style={styles.container}>
                <View style={styles.containHeader}>
                    <Text style={{ ...FONTS.h2, color: COLORS.white }}>Thống Kê Doanh Thu</Text>
                </View>

                <View style={styles.containerMainView}>
                    <Image
                        source={images.chart}
                        style={styles.image}
                        resizeMode="cover"
                    />
                    <View
                        style={styles.containViewButton}
                    >
                        <TouchableOpacity
                            style={styles.buttonContain}
                            onPress={navigateDate}
                        >
                            <Text style={{ ...FONTS.h3, color: COLORS.black }}>Theo Ngày</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.buttonContain}
                            onPress={navigateWeek}
                        >
                            <Text style={{ ...FONTS.h3, color: COLORS.black }}>Theo Tuần</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.buttonContain}
                            onPress={navigateMonth}
                        >
                            <Text style={{ ...FONTS.h3, color: COLORS.black }}>Theo Tháng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </MainLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SIZES.padding,
    },
    containHeader: { alignItems: 'center' },
    containerMainView: { flex: 1, justifyContent: 'center' },
    containViewButton: {
        width: '100%',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: SIZES.padding,
    },
    image: {
        height: '100%',
        width: '100%',
        opacity: 0.5,
    },
    buttonContain: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: SIZES.padding,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        width: 200,
        marginBottom: SIZES.base * 2,
        opacity: 0.9,
    },

});

export default Chart;
