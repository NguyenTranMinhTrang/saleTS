import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, SIZES, FONTS } from '../constants';
import { PickDateModal, Chart } from '../components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { format } from 'date-fns';
import actions from '../redux/actions';
import MainLayout from './MainLayout';
import { ChartDayScreenProps } from '../navigation/types';

type Data = {
    state: string,
    formatDate: string,
    date: string,
}

const ChartDay = ({ navigation, route }: ChartDayScreenProps) => {

    const [show, setShow] = React.useState<boolean>(false);
    const [data, setData] = React.useState<Data | null>(null);

    React.useEffect(() => {
        const { state, formatDate, initialState } = route.params;
        setData({
            state,
            formatDate,
            date: `${format(initialState.start, formatDate)} - ${format(initialState.end, formatDate)}`,
        });
        if (state === 'date') {
            actions.chartDays(initialState.start, initialState.end);
        }
        else if (state === 'week') {
            actions.chartWeeks(initialState.start, initialState.end);
        }
        else {
            actions.chartMonths(initialState.start, initialState.end);

        }
    }, []);

    const setFilterDate = (date: string) => {
        const newData: Data = {
            ...data,
            date: date,
        } as Data;
        setData(newData);
    };

    return (
        <MainLayout>
            <View style={styles.container}>
                <View style={styles.containHeader}>
                    <TouchableOpacity
                        style={styles.buttonBack}
                        onPress={() => navigation.goBack()}
                    >
                        <AntDesign
                            size={30}
                            name="arrowleft"
                            color={COLORS.white}
                        />
                    </TouchableOpacity>

                    {
                        data?.state === 'date' ?
                            <Text style={{ ...FONTS.h2, color: COLORS.white }}>Doanh Thu Theo Ngày</Text>
                            :
                            data?.state === 'week' ?
                                <Text style={{ ...FONTS.h2, color: COLORS.white }}>Doanh Thu Theo Tuần</Text>
                                :
                                <Text style={{ ...FONTS.h2, color: COLORS.white }}>Doanh Thu Theo Tháng</Text>
                    }
                </View>

                {/* Modal */}

                <PickDateModal
                    show={show}
                    setShow={setShow}
                    state={data?.state}
                    setDateChoose={setFilterDate}
                />

                {/* Button Filter */}

                <View
                    style={styles.containViewButton}
                >
                    <TouchableOpacity
                        style={styles.containButton}
                        onPress={() => setShow(true)}
                    >
                        <AntDesign
                            size={35}
                            name="filter"
                            color={COLORS.white}
                        />
                    </TouchableOpacity>
                    <Text style={{ ...FONTS.h3, color: COLORS.white }}>{data?.date}</Text>
                </View>

                {/* Chart */}
                <View style={styles.containChart} >
                    <Chart />
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
    containHeader: { alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },
    containViewButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SIZES.padding,
    },
    buttonBack: {
        height: 50,
        width: 50,
        position: 'absolute',
        left: SIZES.padding,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SIZES.radius,
    },
    containChart: {
        height: 500,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containButton: {
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SIZES.radius,
        borderWidth: 1,
        borderColor: COLORS.white,
        marginRight: SIZES.base,
    },

});

export default ChartDay;
