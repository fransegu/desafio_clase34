import { cartManager } from "../DAL/daos/MongoDB/cartsManagerDB.js"

export const findAll = () => {
    const carts = cartManager.findAll();
    return carts;
};

export const findCById = (id) => {
    const cart = cartManager.findCById(id)        
    return cart;
};


export const createOne = (obj) => {
    const createdCart = cartManager.createOne(obj);
    return createdCart;
};

export const addProduct = (cid,pid) => {
    const cartModific = cartManager.addProductToCart(cid,pid);
    return cartModific;
};

export const deleteOneProduct = (cid,pid) => {
    const cartModific = cartManager.deleteOne(cid,pid);
    return cartModific;
};

export const deleteAll = (cid) => {
    const listaCarts = cartManager.deleteAll(cid);
    return listaCarts;
};

export const updateCart = (cid, pid, quantity) => {
    const cartsModific = cartManager.update(cid, pid, quantity);
    return cartsModific;
};