import { userManager } from "../DAL/daos/MongoDB/usersManagerDB.js";
import { hashData } from "../utils.js";
import { UsersResponse } from "../DAL/dtos/users-response.dto.js";




export const findById = (id) => {
    const user = userManager.findById(id);
    return user;
};

export const findByEmail = (id) => {
    const user = userManager.findByEmail(id);
    return user;
};

export const createOne = (obj) => {
    const hashedPassword = hashData(obj.password);
    const newObj = { ...obj, password: hashedPassword };
    const createdUser = Users.createOne(newObj);
    return createdUser;
};
export const updateUser = async (id, obj) => {
    try {

        const userModific = await Users.updateOne({ _id: id }, obj);
        return userModific;
    } catch (error) {
        throw new Error(`Error updating user: ${error.message}`);
    }
};
