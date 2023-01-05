import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { Formik, FastField, FormikProps, FieldProps } from 'formik';
import { debounce } from 'lodash';
import * as yup from 'yup';
import { SIZES, COLORS, FONTS } from '../constants';
import { InputField, ModalPickImage } from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AntDesign from 'react-native-vector-icons/AntDesign';
import actions from '../redux/actions';
import MainLayout from './MainLayout';
import { sendNotification } from '../utils/pushNotifycation';
import { AddProductScreenProps } from '../navigation/types';
import { Response } from '../models';

interface FormValues {
    name: string,
    profit: number,
    image: string,
    description: string,
    rate: number,
}

const AddProduct = ({ navigation, route }: AddProductScreenProps) => {
    const [show, setShow] = React.useState(false);
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
        name: yup.string().required('Name is required !'),
        description: yup.string().required('Description is required !'),
        profit: yup.number().typeError('You must specify a number').min(0, 'Min value 0'),
    });

    const handleCancel = () => {
        navigation.goBack();
        route.params.reFresh();
    };

    const handleAddProduct = async (values: FormValues) => {
        setLoading(true);
        const convertValue: FormValues = {
            ...values,
            profit: Number(values.profit),
        };
        const result: Response = await actions.addProduct(convertValue) as Response;
        if (result && result.code === 1) {
            formik.current?.resetForm();
            Alert.alert('Sucess', 'Do you want to continue ?',
                [
                    { text: 'Cancel', onPress: handleCancel },
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            );
        }
        sendNotification('Hello', 'Add Product Success !', { id: result.id, type: 'Detail' });
        setLoading(false);
    };

    const renderHeader = () => {
        return (
            <View
                style={styles.containerHeader}
            >
                <Text style={{ ...FONTS.h2, color: COLORS.white }}>Add Product</Text>
                <TouchableOpacity
                    style={styles.buttonBack}
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign
                        name="arrowleft"
                        size={30}
                        color={COLORS.white}
                    />
                </TouchableOpacity>
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
                    name: '',
                    profit: 0,
                    image: '',
                    description: '',
                    rate: 0,
                }}
                onSubmit={handleAddProduct}
            >
                {({ values, handleSubmit, setFieldValue }) => {
                    return (
                        <ScrollView style={styles.containerForm}>
                            <View
                                style={{
                                    padding: SIZES.padding,
                                }}
                            >
                                <ModalPickImage show={show} setShow={setShow} setImage={(uri) => setFieldValue('image', uri)} />

                                <View
                                    style={styles.containerImage}
                                >
                                    <Text style={{ ...FONTS.h3, marginRight: SIZES.base, color: COLORS.white }}>Image: </Text>

                                    {
                                        values.image &&
                                        <Image
                                            source={{ uri: values.image }}
                                            style={styles.image}
                                            resizeMode="cover"
                                        />
                                    }
                                    <TouchableOpacity
                                        style={styles.buttonCamera}
                                        onPress={() => setShow(true)}
                                    >
                                        <AntDesign name="camera" size={30} color={COLORS.white} />
                                    </TouchableOpacity>

                                </View>
                                {/* name */}
                                <FastField
                                    name="name"
                                >
                                    {(props: FieldProps) => (
                                        <InputField title="Name: " {...props} />
                                    )}
                                </FastField>

                                {/* description */}
                                <FastField
                                    name="description"
                                >
                                    {(props: FieldProps) => (
                                        <InputField title="Description: " {...props} />
                                    )}
                                </FastField>

                                {/* profit */}
                                <FastField
                                    name="profit"
                                >
                                    {(props: FieldProps) => (
                                        <InputField keyBoard="number-pad" title="Profit: " {...props} />
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
        paddingTop: SIZES.base * 2,
    },
    containerForm: {
        flex: 1,
    },
    buttonBack: {
        position: 'absolute',
        left: SIZES.padding,
        top: 15,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: COLORS.lightGray,
    },
    containerImage: {
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
    buttonCamera: {
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

});

export default AddProduct;
