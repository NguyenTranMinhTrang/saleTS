import React from 'react';
import { View, Modal, Pressable, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { SIZES, COLORS, FONTS } from '../constants';
import { BlurView } from '@react-native-community/blur';
import DateModal from './DateModal';
import MonthModal from './MonthModal';
import { isAfter, subDays, format, isFuture, differenceInWeeks, differenceInMonths } from 'date-fns';
import actions from '../redux/actions';

type Props = {
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
    state: string | undefined,
    setDateChoose: (date: string) => void,
}

const PickDateModal = ({ show, setShow, state, setDateChoose }: Props) => {

    const [start, setStart] = React.useState(subDays(new Date(), 7));
    const [end, setEnd] = React.useState(new Date());
    const [showStart, setShowStart] = React.useState(false);
    const [showEnd, setShowEnd] = React.useState(false);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={show}
            statusBarTranslucent={true}
        >
            <BlurView
                style={styles.absolute}
                blurType="light"
                blurAmount={10}
                reducedTransparencyFallbackColor="white"
            />
            <Pressable
                style={styles.contain}
                onPress={() => setShow(false)}
            >
                <View
                    style={styles.viewContain}
                >
                    {
                        state === 'month' ?
                            <>
                                <MonthModal
                                    title={'From: '}
                                    date={start}
                                    setDate={setStart}
                                    show={showStart}
                                    setShow={setShowStart}
                                />

                                <MonthModal
                                    title={'To: '}
                                    date={end}
                                    setDate={setEnd}
                                    show={showEnd}
                                    setShow={setShowEnd}
                                />
                            </>
                            :
                            <>
                                <DateModal
                                    title={'From: '}
                                    date={start}
                                    setDate={setStart}
                                    show={showStart}
                                    setShow={setShowStart}
                                />

                                <DateModal
                                    title={'To: '}
                                    date={end}
                                    setDate={setEnd}
                                    show={showEnd}
                                    setShow={setShowEnd}
                                />
                            </>
                    }

                    <View
                        style={styles.containerButton}
                    >
                        <TouchableOpacity
                            style={styles.button}

                            onPress={() => {
                                if (isAfter(start, end)) {
                                    Alert.alert('The begin date must be before the end date!');
                                }
                                else if (isFuture(end)) {
                                    Alert.alert('Invalid date');
                                }
                                else if (state === 'week' && differenceInWeeks(end, start) < 2) {
                                    Alert.alert('The distance must be greater than or equal 2 weeks');
                                }
                                else if (state === 'month' && differenceInMonths(end, start) < 2) {
                                    Alert.alert('The distance must be greater or equal than 2 months');
                                }
                                else {
                                    setShow(false);
                                    setDateChoose(`${format(start, 'dd/MM/yyyy')} - ${format(end, 'dd/MM/yyyy')}`);
                                    if (state === 'date') {
                                        actions.chartDays(start, end);
                                    }
                                    else if (state === 'week') {
                                        actions.chartWeeks(start, end);
                                    }
                                    else {
                                        actions.chartMonths(start, end);
                                    }
                                }
                            }}
                        >
                            <Text style={{ ...FONTS.h3, color: COLORS.white }}>Ok</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    contain: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SIZES.padding,
    },
    viewContain: {
        width: '100%',
        backgroundColor: 'white',
        padding: SIZES.padding,
        borderRadius: SIZES.radius,
    },
    containerButton: {
        alignItems: 'flex-end',
        width: '100%',
    },
    button: {
        height: 60,
        width: 150,
        backgroundColor: COLORS.primary,
        marginTop: SIZES.padding,
        borderRadius: SIZES.radius,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default PickDateModal;

