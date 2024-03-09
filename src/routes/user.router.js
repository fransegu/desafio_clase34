import { Router } from "express";
import {  findUserById, findUserByEmail, createUser } from "../controllers/users.controller";
const router = Router();

router.get(
  "/:idUser", findUserById
);
router.put("/premium/:uid", updateUserNow);

export default router;