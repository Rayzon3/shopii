import { Router, Request, Response } from "express";
import Product from "../entities/Product";
import multer, { FileFilterCallback } from "multer";
import path from "path";

import auth from "../middleware/auth";
import makeId from "../util/helpers";

// import image from "../../web/public"

const imageStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./web/public");
  },
  filename: function (req, file, callback) {
    const name = makeId(15);
    callback(null, name + path.extname(file.originalname));
  },
});
const fileFilter = (req, file, callback) => {
  if (file.mimetype === "image/jpeg" || "image/png") {
    callback(null, true);
  } else {
    callback(new Error("The image file must be jpeg or png !!"), false);
  }
};
const upload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1024 * 1024 * 5, //file size limit 5MB
  },
  fileFilter: fileFilter,
});

const createProduct = async (req: Request, res: Response) => {
  const { title, description, price } = req.body;
  const user = res.locals.user;
  if (title.trim() === "") {
    res.status(400).json({ title: "Product title must not be empty!!" });
  }

  try {
    console.log(req.file);
    const product = new Product({ title, description, user, price });
    // upload.single("file");
    product.imageUrn = req.file.filename;

    await product.save();

    return res.json(product);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Oops! Something went wrong." });
  }
};

//for product feed
const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({
      order: { createdAt: "DESC" },
    });
    return res.json(products);
  } catch (e) {
    console.log(e);
    return res.json({ error: "Oops! That was not supposed to happen :/" });
  }
};

//for single product
const getProduct = async (req: Request, res: Response) => {
  const { identifier, slug } = req.params;
  try {
    const product = await Product.findOneOrFail({
      identifier,
      slug,
    });
    return res.status(500).json(product);
  } catch (e) {
    console.log(e);
    return res.status(404).json({ error: "Product not found :/" });
  }
};

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: "public/images",
//     filename: (req, file, callback) => {
//       const name = makeId(15);
//       callback(null, name + path.extname(file.originalname)); // will look like this kdhsbvvwkjvhlw + .png
//     },
//   }),
//   fileFilter: (_, file: any, callback: FileFilterCallback) => {
//     console.log(file);
//     if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
//       callback(null, true);
//     } else {
//       callback(new Error("Wrong file type!!"));
//     }
//   },
// });

const uploadProductImage = async (req: Request, res: Response) => {
  const { identifier, slug } = req.params;
  try {
    const product = await Product.findOneOrFail({
      identifier,
      slug,
    });
    const type = req.body.type;
    if (type !== "image") {
      return res.status(400).json({ error: "Wrong file type!!" });
    }
    product.imageUrn = req.file.filename;
    await product.save();
    return res.json(product);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Something went wrong!!" });
  }
};

const router = Router();
router.post("/", auth, upload.single("file"), createProduct);
// router.post(
//   "/:identifier/:slug/image",
//   auth,
//   upload.single("file"),
//   uploadProductImage
// );
router.get("/", getProducts);
router.get("/:identifier/:slug", getProduct);

export default router;
