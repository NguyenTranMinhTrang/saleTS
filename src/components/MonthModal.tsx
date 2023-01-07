import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SIZES, COLORS, FONTS } from '../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MonthPicker from 'react-native-month-year-picker';
import { format } from 'date-fns';
import { EventTypes } from 'react-native-month-year-picker';

type Props = {
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
    date: Date,
    setDate: React.Dispatch<React.SetStateAction<Date>>,
    title: string,
}

const MonthModal = ({ show, setShow, date, setDate, title }: Props) => {

    const showPicker = React.useCallback((value: boolean) => setShow(value), []);

    const onValueChange = React.useCallback(
        (event: EventTypes, newDate: Date) => {
            const selectedDate = newDate || date;

            showPicker(false);
            setDate(selectedDate);
        },
        [date, showPicker],
    );

    const onPress = () => setShow(true);

    return (
        <View
            style={styles.containerDate}
        >
            <Text style={{ ...FONTS.h3, marginRight: SIZES.base, color: COLORS.white }}>{title}</Text>
            {
                date &&
                <View style={styles.textDate}>
                    <Text style={{ ...FONTS.h3, color: COLORS.white }}>{format(date, 'MM/yyyy')}</Text>
                </View>

            }
            <TouchableOpacity
                style={styles.buttonDate}
                onPress={onPress}
            >
                <AntDesign name="calendar" size={30} color={COLORS.white} />
            </TouchableOpacity>

            {/* Modal get date */}
            {
                show &&
                <MonthPicker
                    onChange={onValueChange}
                    value={date}
                />

            }
        </View>
    );
};

const styles = StyleSheet.create({
    containerDate: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SIZES.base,
    },
    textDate: {
        flex: 1,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray,
        height: 70,
        padding: SIZES.base * 2,
        marginRight: SIZES.base,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonDate: {
        height: 55,
        width: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: COLORS.lightGray,
    },
});

export default MonthModal;
