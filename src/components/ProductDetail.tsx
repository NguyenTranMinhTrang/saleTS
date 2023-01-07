import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SIZES, COLORS, FONTS } from '../constants';
import { FastField, FieldArray, useFormikContext, FieldProps, ArrayHelpers, FieldArrayRenderProps } from 'formik';
import InputField from './InputField';
import InputDetail from './InputDetail';
import ModalAdd from './ModalAdd';

type Item = {
    amount: number,
    priceInput: number,
    item: {
        name: string,
        profit: number,
        image?: string,
        description: string,
        rate?: number,
    }
}

type FormValues = {
    date: Date,
    show: boolean,
    itemDetail: Item[],
    delete: number,
    status: string,
}

const ProductDetail = () => {
    const [show, setShow] = React.useState<boolean>(false);
    const { errors, setErrors, values, setFieldValue } = useFormikContext<FormValues>();
    const arrayHelpersRef = React.useRef<ArrayHelpers>();
    const [index, setIndex] = React.useState<number>(0);

    const onPressRemove = () => {
        if (values.delete <= 0) {
            setErrors({
                ...errors,
                delete: 'Min number is 1!',
            });
        }
        else if (values.delete > values.itemDetail.length) {
            setErrors({
                ...errors,
                delete: 'Number is invalid!',
            });
        }
        else {
            arrayHelpersRef.current?.remove(values.delete - 1);
        }
    };

    const render = (arrayHelpers: FieldArrayRenderProps) => {
        arrayHelpersRef.current = arrayHelpers;
        return (
            <View
                style={styles.arrayContain}
            >
                {
                    values.itemDetail && values.itemDetail.length > 0 ? (
                        <ScrollView
                            style={{
                                height: SIZES.height * 0.2,
                            }}
                        >
                            {
                                values.itemDetail.map((detail, indexDetail) => {
                                    return (
                                        <InputDetail
                                            detail={detail}
                                            key={indexDetail}
                                            index={indexDetail}
                                            insert={arrayHelpers.insert}
                                            remove={arrayHelpers.remove}
                                            setShow={setShow}
                                            setIndex={setIndex}
                                        />
                                    );
                                })
                            }
                        </ScrollView>
                    ) :
                        (
                            <TouchableOpacity
                                style={styles.buttonAdd}

                                onPress={() => {
                                    setShow(true);
                                    arrayHelpers.push({ item: {}, amount: 0, priceInput: 0 });
                                }}
                            >
                                <Text style={{ ...FONTS.h3, color: COLORS.white }}>Add item details</Text>
                            </TouchableOpacity>
                        )

                }
            </View>
        );
    };

    return (
        <View>
            <View
                style={styles.container}
            >
                <FastField
                    name="delete"
                >
                    {(props: FieldProps) => (
                        <InputField
                            // eslint-disable-next-line react-native/no-inline-styles
                            style={{ flex: 1 }}
                            title="Remove :"
                            keyBoard="number-pad"
                            {...props}
                        />
                    )}
                </FastField>

                <TouchableOpacity
                    style={styles.buttonRemove}
                    onPress={onPressRemove}
                >
                    <Text style={{ ...FONTS.h3, color: COLORS.white }}>-</Text>
                </TouchableOpacity>
            </View>

            <ModalAdd show={show} setShow={setShow} setFieldValue={setFieldValue} index={index} errors={errors} />

            <FieldArray
                name="itemDetail"
                render={render}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    arrayContain: {
        marginVertical: SIZES.padding,
    },
    buttonRemove: {
        borderRadius: SIZES.radius,
        padding: SIZES.base * 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.red,
        width: 55,
        height: 55,
        marginLeft: SIZES.base,
        marginBottom: 8,
    },
    error: {
        ...FONTS.h3_light,
        color: 'red',
        marginTop: SIZES.base,
    },
    buttonAdd: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.lightGray,
        borderRadius: SIZES.radius,
        padding: SIZES.base * 2,
        height: 60,
    },
});

export default ProductDetail;
