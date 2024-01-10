import express from "express"
import { createCategoryController, updateCategoryController, categoryController, singleCategoryController, deleteCategoryController} from "../controllers/categoryController.js"
import { isAdmin, requireSIgnIn } from "../middlewares/auth.js";

const router = express.Router()


//routes
//create category
router.post('/create-category', requireSIgnIn, createCategoryController)

//update category
router.put('/update-category/:id', requireSIgnIn, updateCategoryController)

// all categories
router.get('/get-category', categoryController)

// single category
router.get('/single-category/:slug', singleCategoryController)
export default router

//delete category
router.delete("/delete-category/:id", requireSIgnIn, deleteCategoryController)