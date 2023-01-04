import store from '../stores';
import types from '../types';
import { endOfMonth, eachDayOfInterval, isEqual, format, eachWeekOfInterval, subDays, isWithinInterval, eachMonthOfInterval } from 'date-fns';
import { Output } from '../../models';
import _ from 'lodash';

const { dispatch } = store;

type yLable = {
    y: number
}

export const getChartByDate = (data: any) => ({
    type: types.CHART_DATE,
    payload: { ...data },
});

export const getChartByWeek = (data: any) => ({
    type: types.CHART_WEEK,
    payload: { ...data },
});

export const getChartByMonth = (data: any) => ({
    type: types.CHART_MONTH,
    payload: { ...data },
});

export const chartDays = (start: Date, end: Date) => {

    const outputs: Output[] = store.getState().product.outputs;

    const days: Date[] = eachDayOfInterval({
        start: start,
        end: end,
    });

    const xLabel: string[] = [];

    const result: yLable[] = _.map(days, (day: Date) => {
        const outputOfDate: Output[] = _.filter(outputs, (output: Output) => {
            return isEqual(output.date, day);
        });

        let listBuyProduct = _.map(outputOfDate, (output: Output) => {
            return output.buy;
        });

        listBuyProduct = _.flatten(listBuyProduct);

        let total: number = _.reduce(listBuyProduct, (sum: number, product: any) => {
            return sum + product.price;
        }, 0);

        xLabel.push(format(day, 'dd/MM/yyyy'));
        return { y: total };
    });

    dispatch(getChartByDate({ data: result, label: xLabel }));
};

export const chartWeeks = (start: Date, end: Date) => {
    const weeks: Date[] = eachWeekOfInterval({
        start: start,
        end: end,
    });

    const mondays: Date[] = _.map(weeks, (week) => {
        return subDays(week, 7);
    });

    const outputs: Output[] = store.getState().product.outputs;
    const xLabel: string[] = [];
    const result: yLable[] = _.map(weeks, (sunday: Date, index: number) => {
        const outputOfDate: Output[] = _.filter(outputs, (output) => {
            return isWithinInterval(output.date, {
                start: mondays[index],
                end: sunday,
            });
        });

        let listBuyProduct = _.map(outputOfDate, (output: Output) => {
            return output.buy;
        });

        listBuyProduct = _.flatten(listBuyProduct);

        let total: number = _.reduce(listBuyProduct, (sum: number, product: any) => {
            return sum + product.price;
        }, 0);

        xLabel.push(`${format(mondays[index], 'dd/MM')} - ${format(sunday, 'dd/MM')}`);

        return { y: total };
    });

    dispatch(getChartByWeek({ data: result, label: xLabel }));
};

export const chartMonths = (start: Date, end: Date) => {
    const months = eachMonthOfInterval({
        start: start,
        end: end,
    });

    const endMonths = _.map(months, (month: Date) => {
        return endOfMonth(month);
    });

    const outputs = store.getState().product.outputs;
    const xLabel: string[] = [];
    const result: yLable[] = _.map(months, (startMonth, index) => {
        const outputOfDate = _.filter(outputs, (output) => {
            return isWithinInterval(output.date, {
                start: startMonth,
                end: endMonths[index],
            });
        });

        let listBuyProduct = _.map(outputOfDate, (output) => {
            return output.buy;
        });

        listBuyProduct = _.flatten(listBuyProduct);

        let total = _.reduce(listBuyProduct, (sum, product) => {
            return sum + product.price;
        }, 0);

        xLabel.push(`${format(startMonth, 'dd/MM')} - ${format(endMonths[index], 'dd/MM')}`);

        return { y: total };
    });

    dispatch(getChartByMonth({ data: result, label: xLabel }));
};

