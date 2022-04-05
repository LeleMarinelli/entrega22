const MockApi = require("../../models/apis/MockApi");

const productsApi = new MockApi("product");

const getProductsController = (req, res, next) => {
  try {
    res.json(productsApi.getAll());
  } catch (error) {
    next(error.message);
  }
};

const getProductByIdController = (req, res, next) => {
  try {
    const { id } = req.params;
    res.json(productsApi.getById(id));
  } catch (error) {
    next(error.message);
  }
};

const saveProductController = (req, res, next) => {
  try {
    const item = req.body;
    res.json(productsApi.save(item));
  } catch (error) {
    next(error.message);
  }
};

const updateProductController = (req, res, next) => {
  try {
    const { id } = req.params;
    const item = req.body;
    res.json(productsApi.update(id, item));
  } catch (error) {
    next(error.message);
  }
};

const deleteProductController = (req, res, next) => {
  try {
    const { id } = req.params;
    res.json(productsApi.delete(id));
  } catch (error) {
    next(error.message);
  }
};

const populateProductsController = (req, res, next) => {
  try {
    const { qty } = req.query;
    res.json(productsApi.populate(qty));
  } catch (error) {
    next(error.message);
  }
};

module.exports = {
  getProductsController,
  getProductByIdController,
  saveProductController,
  updateProductController,
  deleteProductController,
  populateProductsController,
};
