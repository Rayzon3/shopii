import { Router, Request, Response } from "express";
import Product from "../entities/Product";

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

const router = Router()

router.post("/", auth, createProduct)

export default router