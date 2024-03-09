import {Router} from 'express'
import { __dirname } from "../utils.js"
import { findProductById, findAllProduct, createOneProduc, deleteOneProdAll, updateProducts } from '../controllers/products.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.get("/", findAllProduct)
router.get("/:pid", findProductById)
router.post("/", authMiddleware(["admin", "premium"]), createOneProduc)
router.delete("/:pid", authMiddleware(["admin", "premium"]), deleteOneProdAll)
router.put("/:pid",authMiddleware(["admin", "premium"]), updateProducts)

export default router