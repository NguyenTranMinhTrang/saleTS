import store from '../stores';
import types from '../types';
import { getItem, getData } from '../../localStorage';
import { eachDayOfInterval } from 'date-fns';
import { Product, Input, InputDetail, Filter, Output } from '../../models';
import _ from 'lodash';

const { dispatch } = store;

export const getDataList = (data: any) => ({
    type: types.GET_PRODUCT,
    payload: { ...data },
});

export const updateProductList = (data: any) => ({
    type: types.EDIT_PRODUCT,
    payload: { ...data },
});

export const filter = (data: any) => ({
    type: types.FILTER,
    payload: { ...data },
});

export const deleteProductList = (data: any) => ({
    type: types.DELETE_PRODUCT,
    payload: { ...data },
});

export const addProductList = (data: any) => ({
    type: types.ADD_PRODUCT,
    payload: { ...data },
});

export const updateInputDetail = (data: any) => ({
    type: types.UPDATE_INPUT_DETAILS,
    payload: { ...data },
});

export const updateFilterList = (newFilterList: any) => {
    dispatch(filter({ filter: newFilterList }));
};

export const addInputList = (data: any) => ({
    type: types.ADD_INPUT,
    payload: { ...data },
});

export const filterProduct = (products: Product[], inputDetail: InputDetail[], latestInput: Input | null) => {
    const filterArray: Filter[] = _.map(products, (product: Product) => {
        const inputObject = _.filter(inputDetail, (input: InputDetail) => {
            if (input.idProduct === product.id) {
                return true;
            }
            return false;
        });
        // if the input found
        if (inputObject.length !== 0) {
            // have more than 1 input details
            if (inputObject.length >= 2) {
                const isPrice = _.every(inputObject, { priceInput: inputObject[0].priceInput });
                // Case the same price
                if (isPrice) {
                    const amount = _.reduce(inputObject, (sum: number, object: InputDetail) => {
                        return sum + object.amount;
                    }, 0);
                    return {
                        ...product,
                        amount: amount,
                        price: Math.floor(inputObject[0].priceInput + inputObject[0].priceInput * product.profit),
                    };
                }
                // Case different price
                else {
                    if (latestInput) {
                        const inputDetailChoose = _.find(inputObject, { id: latestInput.id });

                        if (inputDetailChoose) {
                            const indexChoose = _.findIndex(inputObject, inputDetailChoose);

                            const listRemove = _.filter(inputObject, (input: InputDetail, index: number) => {
                                return index !== indexChoose;
                            });


                            const newDetail = _.pullAllWith(inputDetail, listRemove, _.isEqual);
                            dispatch(updateInputDetail({ inputDetail: newDetail }));
                            return {
                                ...product,
                                amount: inputDetailChoose.amount,
                                price: Math.floor(inputDetailChoose.priceInput + inputDetailChoose.priceInput * product.profit),
                            };
                        }
                    }
                }

            }
            else {
                return {
                    ...product,
                    amount: inputObject[0].amount,
                    price: Math.floor(inputObject[0].priceInput + inputObject[0].priceInput * product.profit),
                };
            }
        }
        // input not found => chua nhap hang => amount and price = 0
        else {
            return {
                ...product,
                amount: 0,
                price: 0,
            };
        }
    }) as Filter[];

    return _.compact(filterArray);
};

export const filterRefresh = (newInput = null) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const products = store.getState().product.products;
            const inputDetail = store.getState().product.inputDetail;
            const newFilter = filterProduct(products, inputDetail, newInput);
            dispatch(filter({ filter: newFilter, filterOriginal: newFilter }));
            resolve(true);
        }, 500);
    });
};

export const getDataFromLocalStorage = async () => {
    let data: any = await getItem('listData');
    if (!data) {
        getData();
        data = await getItem('listData');
    }
    const filterList = filterProduct(data.products, data.inputDetail, null);
    const outputs: Output[] = [];
    const result = eachDayOfInterval({
        start: new Date(2022, 10, 28),
        end: new Date(2022, 11, 11),
    });

    const n = result.length;

    for (let i = 1; i <= n; i++) {
        const id = Math.floor(Math.random() * 1000 + 1);
        const object = _.find(filterList, { id: id });
        const secondId = Math.floor(Math.random() * 1000 + 1);
        const secondObject = _.find(filterList, (product: Filter) => {
            return product.id === secondId;
        });

        if (object && secondObject) {
            const output = {
                id: i,
                idUser: Math.random() * 2 + 1,
                buy: [
                    {
                        idProduct: id,
                        amount: Math.floor(Math.random() * 10 + 5),
                        price: object.price || 0,
                    },
                    {
                        idProduct: secondId,
                        amount: Math.floor(Math.random() * 10 + 5),
                        price: secondObject.price || 0,
                    },
                ],
                date: result[Math.floor(Math.random() * (n - 1))],
            };

            outputs.push(output);
        }
    }

    dispatch(getDataList({ ...data, filter: filterList, outputs: outputs, filterOriginal: filterList }));
};

export const updateProduct = (item: Product) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const products = store.getState().product.products;
            const newProductList: Product[] = _.map(products, (product: Product) => {
                if (product.id === item.id) {
                    return {
                        ...product,
                        image: item.image,
                        name: item.name,
                        description: item.description,
                        profit: item.profit,
                    };
                }
                return product;
            });
            dispatch(updateProductList({
                products: newProductList,
            }));
            resolve({ code: 1, message: 'Success !' });
        }, 500);
    });
};

export const deleteProduct = (id: number) => {
    const products = store.getState().product.products;
    const listAfterDetele = _.filter(products, (product: Filter) => {
        if (product.id === id) {
            return false;
        }
        return true;
    });
    dispatch(deleteProductList({ products: listAfterDetele }));
};

export const addProduct = (product: any) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const products = store.getState().product.products;
            const id = Date.now();
            let newProduct = {
                id: id,
                ...product,
            };
            products.unshift(newProduct);
            dispatch(addProductList({ products }));
            resolve({ code: 1, message: 'Success !', id: id });
        }, 500);
    });
};



export const addInput = (input: any) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const inputs: Input[] = store.getState().product.inputs;
            const inputDetail: InputDetail[] = store.getState().product.inputDetail;
            const id: number = Date.now();
            const newInput: Input = {
                id: id,
                date: input.date,
            };

            const newInputDetail: InputDetail[] = _.map(input.itemDetail, (value: any) => {
                return {
                    id: id,
                    idProduct: value.item.id,
                    amount: Number(value.amount),
                    status: input.status,
                    priceInput: Number(value.priceInput),
                };
            });

            inputs.push(newInput);
            const newConcatArray = _.concat(inputDetail, newInputDetail);
            dispatch(addInputList({ inputs, inputDetail: newConcatArray }));
            resolve({ code: 1, message: 'Success !', newInput: newInput });
        }, 500);
    });
};
