import categoryModel from "../models/categoryModel.js"
import slugify from "slugify"

export const createCategoryController = async (req,res) => {
    try {
        const {name} = req.body 
        if(!name){
            return res.status(401).send({message : "Name is Required"})
        }

        const existingCategory = await categoryModel.findOne({name})
        if(existingCategory){
            return res.status(200).send({
                success: true,
                message : "Category Already Exist"
            })
        }
        const category = await new categoryModel({name, slug:slugify(name)}).save()
        res.status(201).send({
            success : true,
            message : "New Category Created",
            category,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            error,
            message : "Error in Category"
        })
    }
}

export const updateCategoryController = async (req,res) => {
    try {
        const {name} = req.body
        const {id} = req.params
        const category = await categoryModel.findByIdAndUpdate(id, {name, slug:slugify(name)}, {name: true})
        res.status(200).send({
            success: true,
            message : "Category updated Succesfully",
            category,
        })
    } catch (error) {
        console.log(error)
        res.status(401),send({
            success : false,
            error,
            message : "Error while Updating category"
        })
    }
}

//get all
export const categoryController = async(req,res) => {
    try {
        const category = await categoryModel.find({})
        res.status(200).send({
            success : true,
            message : "All Categories List",
            category,
        })
    } catch (error) {
        console.log(error)
        res.status(402).send({
            sucess: false,
            message: "Error while getting all category",
            error,
        })
    }
}

//single category
export const singleCategoryController = async(req,res) => {
    try {
        const category = await categoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            message: "Get single category successfully",
            category,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "Error while getting single category",
            error
        })
    }
}

// delete category
export const deleteCategoryController = async(req,res) => {
    try {
        const {id} = req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: "Category Deleted Successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "Error while deleting category",
            error,

        })
    }
}