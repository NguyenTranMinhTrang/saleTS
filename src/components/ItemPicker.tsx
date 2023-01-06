import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';

type Props = {
    name: string,
}

const ItemPicker = ({ name }: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.flex2}>
                <AntDesign name="plus" size={25} color={COLORS.white} />
            </View>
            <View style={styles.flex8}>
                <Text style={{ ...FONTS.h3, color: COLORS.white }}>{name}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        paddingHorizontal: SIZES.padding,
        borderRadius: SIZES.radius,
    },
    flex2: { flex: 0.2 },
    flex8: { flex: 0.8 },
});

export default ItemPicker;
