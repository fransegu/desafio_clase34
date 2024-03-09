import { productsManager } from "../DAL/daos/MongoDB/productManagerDB.js"


export const findAll = () => {
    const products = productsManager.findAll();
    return products;
};

export const findById = (id) => {
    const product = productsManager.findById(id);
    return product;
};

export const createOne = (obj) => {
    const createdProduct = productsManager.createOne(obj);
    return createdProduct;
};

export const deleteOneProduct = (pid) => {
    const productDelete = productsManager.deleteOne(pid);
    return productDelete;
};

export const updateProduct = (pid, obj) => {
    const productModific = productsManager.updateOne( pid, obj);
    return productModific;
};