import { Router } from 'express';
import { findCartById, findAllCart, addProductCart, createOneCart, cartBuy, deleteOneProdCart, deleteOneCartAll, updateCartQuantity } from '../controllers/cart.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';


const router = Router();

router.get("/", findAllCart)
router.post("/",authMiddleware(["user", "premium"]),  createOneCart)
router.get("/:cid", findCartById)
router.get("/:cid/purchase", cartBuy)
router.put("/:cid/products/:pid",authMiddleware(["user", "premium"]),  updateCartQuantity)
router.post("/:cid/products/:pid",authMiddleware(["user", "premium"]), addProductCart)
router.delete("/:cid/products/:pid",authMiddleware(["user", "premium"]), deleteOneProdCart)
router.delete("/:cid",authMiddleware(["user", "premium"]),  deleteOneCartAll)

export default router;