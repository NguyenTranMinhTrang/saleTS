/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { StyleSheet, processColor } from 'react-native';
import { BarChart } from 'react-native-charts-wrapper';
import { useFocusEffect } from '@react-navigation/native';
import _ from 'lodash';
import update from 'immutability-helper';
import { COLORS } from '../constants';
import { useTypedSelector } from '../redux';
import { ChartLegend, xAxis, BarData } from 'react-native-charts-wrapper';

const BarChartProduct = () => {
    const filterOriginal = useTypedSelector((state) => state.product.filterOriginal);

    const [legend, setLegend] = React.useState<ChartLegend>({
        enabled: true,
        textSize: 14,
        form: 'SQUARE',
        formSize: 14,
        xEntrySpace: 5,
        yEntrySpace: 10,
        formToTextSpace: 5,
        wordWrapEnabled: false,
        maxSizePercent: 0.5,
        textColor: processColor(COLORS.white),
    });

    const [data, setData] = React.useState<BarData>({
        dataSets: [
            {
                values: [],
                label: 'Số Lượng',
                config: {
                    color: processColor(COLORS.lightGreen),
                    barShadowColor: processColor('lightgrey'),
                    highlightAlpha: 90,
                    highlightColor: processColor('red'),
                },
            },
        ],
        config: {
            barWidth: 0.7,
        },
    });

    const [xAxisValue, setXAxis] = React.useState<xAxis>({
        valueFormatter: [],
        granularityEnabled: true,
        granularity: 1,
        textColor: processColor('white'),
        textSize: 14,
        position: 'BOTTOM',
        labelRotationAngle: 90,
    });

    useFocusEffect(
        React.useCallback(() => {
            const xLable: string[] = [];
            const yLable: { y: number }[] = _.map(filterOriginal, (product) => {
                xLable.push(product.name);
                return { y: product.amount };
            });

            if (data.dataSets) {
                setData(
                    update(data, {
                        $set: {
                            dataSets: [{
                                ...data.dataSets[0],
                                values: yLable,
                            }],
                        },
                    })
                );
            }

            setXAxis(
                update(xAxisValue, {
                    $set: {
                        valueFormatter: xLable,
                    },
                })
            );

        }, [filterOriginal])
    );

    return (
        <BarChart
            style={styles.chart}
            data={data}
            xAxis={xAxisValue}
            animation={{ durationX: 2000 }}
            legend={legend}
            gridBackgroundColor={processColor('#ffffff')}
            visibleRange={{ x: { min: 5, max: 5 } }}
            drawBarShadow={false}
            drawValueAboveBar={true}
            marker={{
                enabled: true,
                markerColor: processColor(COLORS.primary),
                textColor: processColor('white'),
            }}
            yAxis={{
                left: {
                    textColor: processColor('white'),
                    textSize: 14,
                    granularityEnabled: true,
                    granularity: 1,
                },
                right: {
                    enabled: false,
                },
            }}
        />
    );
};

const styles = StyleSheet.create({
    chart: {
        flex: 1,
    },
});

export default BarChartProduct;
