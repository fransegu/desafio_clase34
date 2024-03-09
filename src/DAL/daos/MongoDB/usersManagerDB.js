import { usersModel } from "../../../DB/Models/users.model.js";

class UsersManager {
    async findById(id) {
        const response = await usersModel.findById(id);
        return response;
    }

    async findByEmail(email) {
        const response = await usersModel.findOne({ email });
        return response;
    }

    async createOne(obj) {
        const response = await usersModel.create(obj);
        return response;
    }
    async updateOne(id, obj) {
        const result = await usersModel.updateOne({ _id: id }, obj);
        return result;
    }
}


export const usersManager = new UsersManager();