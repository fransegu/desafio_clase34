import CustomError from "../errors/error.generate.js";
import { ErrorMessages, ErrorName } from "../errors/error.enum.js";
import { jwtValidation } from "../middlewares/jwt.middleware.js";
import { findAll, findById, createOne, deleteOneProduct, updateProduct } from "../service/product.service.js";

export const findProductById = async (req, res) => {
    const { pid } = req.params;
    try {
        const product = await findById(pid);
        if (!product) {
            return CustomError.generateError(ErrorMessages.PRODUCT_NOT_FOUND,404, ErrorName.PRODUCT_NOT_FOUND);
        }
        res.status(200).json({ message: "Product found", product });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
};

export const findAllProduct = async (req, res) => {
    try {
        const products = await findAll(req.query); 
        res.status(200).json({ message: "Product found", products });   
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createOneProduc = async (req, res) => {
    const { title, description, price, code, stock, category } = req.body;

    if (!title || !description || !price || !code || !stock || ! category) {
        return CustomError.generateError(ErrorMessages.ALL_FIELDS_REQUIRED,400,ErrorName.ALL_FIELDS_REQUIRED);

    }
    try {
        if (req.user.role === "premium") {
            const newProduct = {...req.body, owner:req.user.mail};
            const response = await createOne(newProduct);
            res.status(200).json({ message: "Product created", response });

        } else {
            const response = await createOne(req.body);
            res.status(200).json({ message: "Product created", response });

        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteOneProdAll = async (req, res) => {
    const { id } = req.body;
    const productForDelete = await findById(id);
    console.log("producDel", req.user.mail, producForDelette.owner);
    try {
        if (req.user.role === "premium") {
            if (productForDelete.owner === req.user.mail) {
                const response = await deleteOneProduct(id);
                console.log("response", productForDelete.owner === req.user.mail);
                if (!response) {
                    return res.status(404).json({ message: "Product not found" });
                }
                return res.status(200).json({ message: "Product deleted" });
            } else {
                return res.status(500).json({ message: "This product wasnt created by you" });
            }
        } else {
            const response = await deleteOneProduct(id);
            if (!response) {
                return res.status(404).json({ message: "Product not found" });
            }
            return res.status(200).json({ message: "Product deleted" });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updateProducts = async (req, res) => {
    const { pid } = req.params;
    try {
        const response = await updateProduct(pid, req.body);
        if (!response) {
            return CustomError.generateError(ErrorMessages.PRODUCT_NOT_FOUND,404, ErrorName.PRODUCT_NOT_FOUND);
        }
        res.status(200).json({ message: "Product updated", response });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}