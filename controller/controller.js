import Product from "../model/productModule.js";

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product).status(201).send("Product created");
  } catch (error) {
    res.send(error.msg).status(400);
  }
};
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      return res.send("No products found").status(404);
    } else {
      res.json(products).status(200);
    }
  } catch (error) {
    res.send(error.msg).status(400);
  }
};
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.send("No product found").status(404);
    } else {
      res.json(product).status(200);
    }
  } catch (error) {
    res.send(error.msg).status(400);
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.send("No product found").status(404);
    } else {
      const product = await Product.findByIdAndDelete(id);
      res.send("prodect deleted").status(200).json(product);
    }
  } catch (error) {
    res.send(error.msg).status(400);
  }
};
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id);
    if (!product) {
      return res.send("No product found").status(404);
    } else {
      res.send("prodect updated").status(200).json(product);
    }
  } catch (err) {
    res.send(err.msg).status(400);
  }
};

export {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
};
