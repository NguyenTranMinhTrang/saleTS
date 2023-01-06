import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { Formik, FastField, FieldProps, FormikProps } from 'formik';
import { debounce } from 'lodash';
import * as yup from 'yup';
import { SIZES, COLORS, FONTS } from '../constants';
import { InputField, ProductDetail, DateModal } from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import actions from '../redux/actions';
import MainLayout from './MainLayout';
import { InputScreenProps } from '../navigation/types';
import { Response } from '../models';

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

const Input = ({ navigation }: InputScreenProps) => {
    const [loading, setLoading] = React.useState(false);

    const formik = React.useRef<FormikProps<FormValues>>(null);

    const debouncedValidate = React.useMemo(
        () => debounce(() => formik.current?.validateForm, 500),
        [formik],
    );

    React.useEffect(() => {
        debouncedValidate();
    }, [formik.current?.values, debouncedValidate]);

    const validate = yup.object().shape({
        status: yup.string().required('Status is required !'),
        itemDetail: yup.array()
            .of(
                yup.object().shape({
                    amount: yup.number().typeError('You must specify a number').min(0, 'Min value 0').required('Amount is required !'),
                    priceInput: yup.number().typeError('You must specify a number').min(0, 'Min value 0').required('Price is required !'),
                    item: yup.object().shape({
                        name: yup.string().required(),
                        profit: yup.number().required(),
                        image: yup.string().nullable(),
                        description: yup.string().required(),
                        rate: yup.number().nullable(),
                    }).required('Error object'),
                })
            ).min(1, 'Products is required !'),
    });

    const handleCancel = (newInput: any) => {
        navigation.jumpTo('Home');
        actions.filterRefresh(newInput);
    };

    const handleAddInput = async (values: FormValues) => {
        console.log('Create');
        setLoading(true);
        const result: Response = await actions.addInput(values) as Response;
        setLoading(false);
        if (result && result.code === 1) {
            Alert.alert('Sucess', 'Do you want to back to the Home screen or continue ?',
                [
                    { text: 'Home Screen', onPress: () => handleCancel(result.newInput) },
                    { text: 'Continue', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            );
        }
    };


    const renderHeader = () => {
        return (
            <View
                style={styles.containerHeader}
            >
                <Text style={{ ...FONTS.h2, color: COLORS.white }}>Form Input</Text>
            </View>
        );
    };

    const renderForm = () => (
        <KeyboardAwareScrollView>
            <Formik
                innerRef={formik}
                enableReinitialize={true}
                validationSchema={validate}
                validateOnChange={false}
                initialValues={{
                    date: new Date(),
                    show: false,
                    itemDetail: [],
                    delete: 1,
                    status: '',
                }}
                onSubmit={handleAddInput}
            >
                {({ setFieldValue, values, handleSubmit, errors }) => {
                    return (
                        <View style={styles.containerForm}>
                            <ScrollView>
                                <View
                                    style={{
                                        paddingHorizontal: SIZES.padding,
                                        paddingBottom: SIZES.padding,
                                    }}
                                >
                                    {/* date */}

                                    <DateModal
                                        textColor={COLORS.white}
                                        show={values.show}
                                        date={values.date}
                                        setShow={(show) => setFieldValue('show', show)}
                                        setDate={(date) => setFieldValue('date', date)}
                                        title={'Date: '}
                                    />

                                    {/*  product list*/}

                                    <ProductDetail />

                                    {
                                        (errors.itemDetail && !Array.isArray(errors.itemDetail))
                                        &&
                                        <Text style={{ ...FONTS.h3, color: COLORS.red }}>{errors.itemDetail}</Text>
                                    }

                                    {/* status */}
                                    <FastField
                                        name="status"
                                    >
                                        {(props: FieldProps) => (
                                            <InputField title="Status: " {...props} />
                                        )}
                                    </FastField>

                                    <View
                                        style={styles.containerAdd}
                                    >
                                        <TouchableOpacity
                                            style={styles.addButton}
                                            onPress={handleSubmit}
                                        >
                                            {
                                                loading
                                                    ? <ActivityIndicator size="large" color={COLORS.white} />
                                                    : <Text style={{ ...FONTS.h3, color: COLORS.white }}>Add</Text>
                                            }
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    );
                }}
            </Formik>
        </KeyboardAwareScrollView>
    );

    return (
        <MainLayout>
            <View
                style={styles.container}
            >
                {renderHeader()}
                {renderForm()}
            </View>
        </MainLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: SIZES.base * 2,
    },
    containerForm: {
        height: SIZES.height * 0.75,
    },
    containerDate: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SIZES.base,
    },
    image: {
        height: 120,
        flex: 1,
        marginRight: SIZES.padding,
        borderRadius: SIZES.radius,
    },
    buttonDate: {
        height: 55,
        width: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: COLORS.lightGray,
    },
    containerAdd: {
        alignItems: 'center',
        marginTop: SIZES.padding,
    },
    addButton: {
        width: '100%',
        backgroundColor: COLORS.lightGray,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SIZES.radius,
        paddingVertical: SIZES.base * 2,
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

});

export default Input;
