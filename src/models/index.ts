import { ImageURISource, ImageRequireSource } from 'react-native';

// product
export interface Product {
    id: number,
    name: string,
    profit: number,
    image: string,
    description: string,
    rate: number,
}

// input detail
export interface InputDetail {
    id: number,
    idProduct: number,
    amount: number,
    priceInput: number,
    status: string,
}

// input
export interface Input {
    id: number,
    date: Date,
}

// User
export interface User {
    id: number,
    email: string,
    password: string,
    name: string,
    role: string,
    avatar: string
}

// Filter
export interface Filter {
    id: number,
    name: string,
    profit: number,
    image: string,
    description: string,
    rate: number,
    amount: number,
    price: number,
}

// Output
export interface Output {
    id: number,
    idUser: number,
    buy: any[],
    date: Date,
}

// Response
export interface Response {
    code: number,
    message: string,
    [index: string]: any,
}

export type ImageSourcePropType = number | ImageURISource | ImageURISource[] | ImageRequireSource;

export type Props = {
    children?: JSX.Element,
};
