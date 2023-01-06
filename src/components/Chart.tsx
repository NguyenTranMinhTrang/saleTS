import React from 'react';
import { StyleSheet } from 'react-native';
import { LineChart } from 'react-native-charts-wrapper';
import { useTypedSelector } from '../redux';

const Chart = () => {
    const values = useTypedSelector((state) => state.chart);

    return (
        <LineChart
            style={styles.chart}
            data={values.data}
            chartDescription={{ text: '' }}
            xAxis={values.xAxis}
            yAxis={values.yAxis}
            legend={values.legend}
            marker={values.marker}
        />
    );
};

const styles = StyleSheet.create({
    chart: {
        flex: 1,
        height: '90%',
        width: '100%',
    },
});

export default Chart;
