import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FONTS, SIZES, COLORS } from '../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import images from '../constants/images';
import { Filter, ImageSourcePropType } from '../models';

type Props = {
    item: Filter,
    onPress: (item: Filter) => void,
    onLongPress: (item: Filter) => void,
}

const Item = ({ item, onPress, onLongPress }: Props) => {

    const { name, price, rate, amount, image } = item;
    const src: ImageSourcePropType = image ? { uri: image } : images.productImage;

    const onPressButton = () => onPress(item);
    const onLongPressButton = () => onLongPress(item);

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPressButton}
            onLongPress={onLongPressButton}
        >
            <View style={styles.containerImage}>
                <Image
                    source={src}
                    style={styles.image}
                />
            </View>

            <View style={styles.containerText}>
                <Text style={{ ...FONTS.h2, color: COLORS.white }}>{name}</Text>
                <Text style={{ ...FONTS.h3, color: COLORS.white }}>{`Price : ${price}`}</Text>
                <View style={styles.star}>
                    <Text style={{ ...FONTS.h3, marginRight: SIZES.base, color: COLORS.white }}>{`Rate : ${rate}`}</Text>
                    <AntDesign name="star" size={24} color={COLORS.star} />
                </View>
                <Text style={{ ...FONTS.h3, color: COLORS.white }}>{`Số lượng tồn kho : ${amount}`}</Text>
            </View>
        </TouchableOpacity>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: SIZES.base,
        alignItems: 'center',
        backgroundColor: COLORS.lightGray,
        paddingVertical: SIZES.base * 2,
        paddingLeft: SIZES.base,
        borderRadius: SIZES.radius,
    },
    image: {
        height: 120,
        width: '100%',
        resizeMode: 'cover',
        borderRadius: SIZES.radius,
    },
    containerText: {
        flex: 0.65,
        paddingHorizontal: SIZES.padding,
    },
    containerImage: {
        flex: 0.35,
    },
    star: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default Item;
