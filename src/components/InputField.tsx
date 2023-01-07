import React from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardTypeOptions } from 'react-native';
import { SIZES, COLORS, FONTS } from '../constants';
import { FieldProps } from 'formik';

interface OtherProps {
    style?: {
        [index: string]: number | string,
    },
    textColor?: {
        color: string
    },
    title: string,
    keyBoard?: KeyboardTypeOptions,
}


const InputField = ({ field, title, meta, style, textColor, keyBoard }: OtherProps & FieldProps) => {

    const { error, touched } = meta;

    const onChangeText = (text: string) => field.onChange(field.name)(text);

    return (
        <View
            style={[{
                marginVertical: SIZES.base,
            }, style]}
        >
            <Text style={[{ ...FONTS.h3, color: COLORS.white, marginBottom: SIZES.base }, textColor]}>{title}</Text>
            <TextInput
                numberOfLines={4}
                style={styles.textInput}
                value={`${field.value}`}
                onChangeText={onChangeText}
                onBlur={field.onBlur(field.name)}
                keyboardType={keyBoard ? keyBoard : 'default'}
            />
            {
                error && touched &&
                <Text style={styles.error}>{error}</Text>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    textInput: {
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray,
        color: COLORS.white,
        height: 60,
        textAlignVertical: 'center',
        padding: SIZES.base * 2,
        ...FONTS.h3,
    },
    error: {
        ...FONTS.h3_light,
        color: 'red',
        marginTop: SIZES.base,
    },
});

export default InputField;
