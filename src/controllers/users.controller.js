import { findByEmail, findById, createOne } from "../service/user.service.js";
import { jwtValidation } from "../middlewares/jwt.middlewares.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
import passport from "passport";
import CustomError from "../errors/error.generate.js";
import { ErrorMessages, ErrorName } from "../errors/errors.enum.js";


export const findUserById = (req, res) => {
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        const { idUser } = req.params;
        const user = await findById(idUser);
        if (!user) {
                return CustomError.generateError(ErrorMessages.USER_NOT_EXIST,404,ErrorName.USER_NOT_EXIST);
            }
        res.json({ message: "User", user });
}};

export const findUserByEmail = async (req, res) => {
    const { UserEmail } = req.body;
    const user = await findByEmail(UserEmail);
    if (!user) {
        return CustomError.generateError(ErrorMessages.USER_NOT_EXIST,404,ErrorName.USER_NOT_EXIST);

    }
    res.status(200).json({ message: "User found", user });
};

export const createUser =  async (req, res) => {
    const { name, lastName, email, password } = req.body;
    if (!name || !lastName || !email || !password) {
        return CustomError.generateError(ErrorMessages.ALL_FIELDS_REQUIRED,400,ErrorName.ALL_FIELDS_REQUIRED);

    }
    const createdUser = await createOne(req.body);
    res.status(200).json({ message: "User created", user: createdUser });
};
export const updateUserNow = async (req, res) => {
    const { uid } = req.params;
    const { role, email } = req.body;
    try {        
    const userToUpdate = await findById(uid);
    if (!userToUpdate) {
        return res.status(404).json({ message: "User not found" });
    }
    if (userToUpdate._doc.email !== email ){
        return res.status(404).json({ message: "The information provided are incorrect" });
    }
    if (userToUpdate.role !== role) {
        const newUser = { ...userToUpdate._doc, role: role };
        console.log(newUser, "New user");
        const updatedUser = await updateUser(uid, newUser);
        res.status(200).json({ message: "User updated", user: updatedUser });
        } else {
            res.status(402).json({ message: "Nothing has changed" });
            }
    }
    catch (error) {
            res.status(500).json({ message: error.message });
        }
    }