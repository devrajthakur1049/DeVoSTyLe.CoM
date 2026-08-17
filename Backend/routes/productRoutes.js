const express = require('express');
const router = express.Router();


const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect } = require('../middleware/authmiddleware');
const { admin } = require('../middleware/adminmiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Tem







router.route('/').get(getAllProducts).post(protect, admin, upload.single('image'), createProduct);
router.route('/:id').get(getProductById).put(protect, admin, upload.single('image'), updateProduct).delete(protect, admin, deleteProduct);

module.exports = router;