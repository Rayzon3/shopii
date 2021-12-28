import { Router, Request, Response } from "express";
import Product from "../entities/Product";
import multer from "multer"

import auth from "../middleware/auth"

const createProduct = async (req: Request, res: Response) => {
    const { title, description, price } = req.body

    const user = res.locals.user
    if(title.trim() === ""){
        res.status(400).json({ title: "Product title must not be empty!!" })
    }

    try{
        const product = new Product({ title, description, user, price })
        await product.save()

        return res.json(product)
    }catch(e){
        console.log(e)
        return res.status(500).json({ error: "Oops! Something went wrong." })
    }
}

//for product feed
const getProducts = async (req: Request, res: Response) => {
    try{
        const products = await Product.find({
            order: { createdAt: "DESC" }
        })
        return res.json(products)
    }catch(e){
        console.log(e);
        return res.json({ error: "Oops! That was not supposed to happen :/" })
    }
}

//for single product
const getProduct = async (req: Request, res: Response) => {
    const { identifier, slug } = req.params  
    try{
        const product = await Product.findOneOrFail({
            identifier, slug
        })
        return res.status(500).json(product)
    }catch(e){
        console.log(e);
        return res.status(404).json({ error: "Product not found :/" })
    }
}

const uploadProductImage = async (req: Request, res: Response) => {

}


const router = Router()

router.post("/", auth, createProduct)
router.get("/", getProducts)
router.get("/:identifier/:slug", getProduct)

export default router