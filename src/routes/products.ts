import { Router, Request, Response } from "express";
import Product from "../entities/Product";
import multer, { FileFilterCallback } from "multer"
import path from "path"

import auth from "../middleware/auth"
import makeId from "../util/helpers";

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

const upload = multer({
    storage: multer.diskStorage({
        destination: "public/images",
        filename: (req, file, callback) => {
            const name = makeId(15)
            callback(null, name + path.extname(file.originalname)) // will look like this kdhsbvvwkjvhlw + .png
        }
    }),
    fileFilter: (_, file: any, callback: FileFilterCallback) => {
        console.log(file)
        if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){
            callback(null, true)
        }else{
            callback(new Error("Wrong file type!!"))
        }
    }
})
const uploadProductImage = async (req: Request, res: Response) => {
    const product: Product = res.locals.product
    try{
        const type = req.body.type
        if(type !== "image"){
            return res.status(400).json({ error: "Wrong file type!!" })
        }
        product.imageUrn = req.file.filename
        await product.save()
    }catch(e){
        console.log(e)
        return res.status(500).json({ error: "Something went wrong!!" })
    }
    res.json({ success: true })
}


const router = Router()

router.post("/", auth, createProduct)
router.post("/image", auth, upload.single('file'), uploadProductImage)
router.get("/", getProducts)
router.get("/:identifier/:slug", getProduct)

export default router