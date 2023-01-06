import types from '../types';
import { processColor } from 'react-native';
import { COLORS } from '../../constants';
import update from 'immutability-helper';
import { AnyAction } from 'redux';
import { xAxis, BarLineChartBase, LineData, ChartLegend, ChartBase } from 'react-native-charts-wrapper';

type state = {
    xAxis: xAxis,
    yAxis: BarLineChartBase['yAxis'],
    data: LineData,
    legend: ChartLegend,
    marker: ChartBase['marker'],
}

const initialState: state = {
    xAxis: {
        textColor: processColor('white'),
        textSize: 14,
        gridColor: processColor(COLORS.lightGreen),
        gridLineWidth: 1,
        granularityEnabled: true,
        granularity: 1,
        axisLineColor: processColor('darkgray'),
        axisLineWidth: 1.5,
        gridDashedLine: {
            lineLength: 5,
            spaceLength: 5,
        },
        avoidFirstLastClipping: false,
        position: 'BOTTOM',
        valueFormatter: [],
        labelRotationAngle: 90,
    },
    yAxis: {
        left: {
            drawGridLines: true,
            limitLines: [{
                limit: 112.4,
                lineColor: processColor(COLORS.lightGreen),
                lineDashPhase: 2,
                lineDashLengths: [10, 20],
            }, {
                limit: 89.47,
                lineColor: processColor(COLORS.lightGreen),
                lineDashPhase: 2,
                lineDashLengths: [10, 20],
            }],
        },
        right: {
            drawGridLines: true,
        },
    },

    data: {
        dataSets: [
            {
                values: [],
                label: 'Doanh thu',
                config: {
                    lineWidth: 1.5,
                    drawCircles: true,
                    drawCubicIntensity: 0.5,
                    drawHighlightIndicators: false,
                    color: processColor(COLORS.lightGreen),
                    drawFilled: true,
                    fillColor: processColor(COLORS.lightGreen),
                    fillAlpha: 90,
                },
            },
        ],
    },
    legend: {
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
    },
    marker: {
        enabled: true,
        markerColor: processColor(COLORS.primary),
        textColor: processColor('white'),
    },
};

export default function (state = initialState, action: AnyAction) {
    switch (action.type) {
        case types.CHART_DATE:
            if (state.data.dataSets) {
                const newStateDate = update(state, {
                    xAxis: {
                        $set: {
                            ...state.xAxis,
                            valueFormatter: action.payload.label,
                        },
                    },
                    data: {
                        $set: {
                            dataSets: [{
                                ...state.data.dataSets[0],
                                values: action.payload.data,
                            }],
                        },
                    },
                });
                return { ...newStateDate };

            }
            return state;

        case types.CHART_WEEK:
            if (state.data.dataSets) {
                const newStateWeek = update(state, {
                    xAxis: {
                        $set: {
                            ...state.xAxis,
                            valueFormatter: action.payload.label,
                        },
                    },
                    data: {
                        $set: {
                            dataSets: [{
                                ...state.data.dataSets[0],
                                values: action.payload.data,
                            }],
                        },
                    },
                });

                return { ...newStateWeek };
            }
            return state;

        case types.CHART_MONTH:
            if (state.data.dataSets) {
                const newStateMonth = update(state, {
                    xAxis: {
                        $set: {
                            ...state.xAxis,
                            valueFormatter: action.payload.label,
                        },
                    },
                    data: {
                        $set: {
                            dataSets: [{
                                ...state.data.dataSets[0],
                                values: action.payload.data,
                            }],
                        },
                    },
                });

                return { ...newStateMonth };
            }
            return state;
        default:
            return state;
    }
}
