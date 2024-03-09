import { fakerES as faker } from "@faker-js/faker";

export const generateProduct = () => {
    const product = {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price({min: 100, max: 500}),
        stock: faker.number.int(200),
        code:faker.number.int(5000),
        category: faker.commerce.department(),
        status: faker.datatype.boolean(0.9),
    };
    return product;
};