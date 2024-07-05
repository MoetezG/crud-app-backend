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

    const category = req.query.category || "";
    const search = req.query.search || "";
    const sortOrder =
      req.query.sortOrder === "asc" || req.query.sortOrder === "desc"
        ? req.query.sortOrder
        : "asc";

    // If search query is provided, create a regex search keyword
    const searchKeyword = search
      ? {
          name: {
            $regex: search,
            $options: "i",
          },
        }
      : {};

    // If category query is provided, create a category filter
    const categoryKeyword = category ? { category } : {};

    // Find products that match the category and search keywords, then sort by price
    const products = await Product.find({
      ...categoryKeyword,
      ...searchKeyword,
    }).sort({ price: sortOrder === "asc" ? 1 : -1 });


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
