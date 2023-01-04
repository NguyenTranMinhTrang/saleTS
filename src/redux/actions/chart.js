import store from '../stores';
import types from '../types';
import { endOfMonth, eachDayOfInterval, isEqual, format, eachWeekOfInterval, subDays, isWithinInterval, eachMonthOfInterval } from 'date-fns';
import _ from 'lodash';

const { dispatch } = store;

export const getChartByDate = (data) => ({
    type: types.CHART_DATE,
    payload: { ...data },
});

export const getChartByWeek = (data) => ({
    type: types.CHART_WEEK,
    payload: { ...data },
});

export const getChartByMonth = (data) => ({
    type: types.CHART_MONTH,
    payload: { ...data },
});

export const chartDays = (start, end) => {

    const outputs = store.getState().product.outputs;

    const days = eachDayOfInterval({
        start: start,
        end: end,
    });

    const xLabel = [];

    const result = _.map(days, (day) => {
        const outputOfDate = _.filter(outputs, (output) => {
            return isEqual(output.date, day);
        });

        let listBuyProduct = _.map(outputOfDate, (output) => {
            return output.buy;
        });

        listBuyProduct = _.flatten(listBuyProduct);

        let total = _.reduce(listBuyProduct, (sum, product) => {
            return sum + product.price;
        }, 0);

        xLabel.push(format(day, 'dd/MM/yyyy'));
        return { y: total };
    });

    dispatch(getChartByDate({ data: result, label: xLabel }));
};

export const chartWeeks = (start, end) => {
    const weeks = eachWeekOfInterval({
        start: start,
        end: end,
    });

    const mondays = _.map(weeks, (week) => {
        return subDays(week, 7);
    });

    const outputs = store.getState().product.outputs;
    const xLabel = [];
    const result = _.map(weeks, (sunday, index) => {
        const outputOfDate = _.filter(outputs, (output) => {
            return isWithinInterval(output.date, {
                start: mondays[index],
                end: sunday,
            });
        });

        let listBuyProduct = _.map(outputOfDate, (output) => {
            return output.buy;
        });

        listBuyProduct = _.flatten(listBuyProduct);

        let total = _.reduce(listBuyProduct, (sum, product) => {
            return sum + product.price;
        }, 0);

        xLabel.push(`${format(mondays[index], 'dd/MM')} - ${format(sunday, 'dd/MM')}`);

        return { y: total };
    });

    dispatch(getChartByWeek({ data: result, label: xLabel }));
};

export const chartMonths = (start, end) => {
    const months = eachMonthOfInterval({
        start: start,
        end: end,
    });

    const endMonths = _.map(months, (month) => {
        return endOfMonth(month);
    });

    const outputs = store.getState().product.outputs;
    const xLabel = [];
    const result = _.map(months, (startMonth, index) => {
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

