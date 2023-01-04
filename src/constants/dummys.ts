import { Input, InputDetail, Product, User } from '../models';

const genarateData = () => {
    const products: Product[] = [];
    const inputs: Input[] = [];
    let j: number = 0;
    let id: number = 1;
    const inputDetail: InputDetail[] = [];

    for (var i = 1; i <= 1000; i++) {

        const price: number = Math.random() * 100 + 20;

        const detail: InputDetail = {
            id: id,
            idProduct: i,
            amount: 100,
            priceInput: Math.floor(price),
            status: 'good',
        };

        const product: Product = {
            id: i,
            name: `Product ${i}`,
            profit: Number((Math.random() + 0.1).toFixed(1)),
            image: '',
            description: 'bla bla bla',
            rate: Math.floor(Math.random() * 5 + 1),
        };

        j = j + 1;

        if (j === 5) {
            const input: Input = {
                id: id,
                date: new Date(),
            };
            inputs.push(input);
            j = 0;
            id = id + 1;
        }

        products.push(product);
        inputDetail.push(detail);
    }


    const users: User[] = [
        {
            id: 1,
            email: 'john@mail.com',
            password: 'changeme',
            name: 'Jhon',
            role: 'customer',
            avatar: 'https://api.lorem.space/image/face?w=640&h=480&r=9136',
        },
        {
            id: 2,
            email: 'maria@mail.com',
            password: '12345',
            name: 'Maria',
            role: 'customer',
            avatar: 'https://api.lorem.space/image/face?w=640&h=480&r=4294',
        },
        {
            id: 3,
            email: 'Anna@mail.com',
            password: 'Anna123',
            name: 'Anna',
            role: 'customer',
            avatar: 'https://api.lorem.space/image/face?w=640&h=480&r=9182',
        },
    ];

    return {
        products,
        inputs,
        users,
        inputDetail,
    };
};

export default genarateData;

