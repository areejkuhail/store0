const Product = require('../models/Product');


const getProducts = async (req, res) => {
  const page     = Number(req.query.page)    || 1;
  const limit    = Number(req.query.limit)   || 12;
  const keyword  = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: 'i' } }
    : {};
  const category = req.query.category ? { category: req.query.category } : {};

  const filter = { ...keyword, ...category };
  const count  = await Product.countDocuments(filter);
  const products = await Product.find(filter)
    .limit(limit)
    .skip(limit * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / limit), total: count });
};


const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'المنتج غير موجود' });
  res.json(product);
};

const createProduct = async (req, res) => {
  const { name, price, description, category, image, countInStock } = req.body;
  const product = await Product.create({ name, price, description, category, image, countInStock });
  res.status(201).json(product);
};


const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'المنتج غير موجود' });

  Object.assign(product, req.body);
  const updated = await product.save();
  res.json(updated);
};


const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: 'المنتج غير موجود' });
  res.json({ message: 'تم حذف المنتج' });
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };