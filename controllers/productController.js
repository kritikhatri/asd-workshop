const productService = require("../services/productService");
const {
    setCache,
    clearCache
} = require("../middleware/cacheMiddleware");

function getAllProducts(req, res) {
    const products = productService.getAllProducts();

    setCache(req.originalUrl, products);

    res.json(products);
}

function getProductById(req, res) {
    const id = Number(req.params.id);

    const product = productService.getProductById(id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    setCache(req.originalUrl, product);

    res.json(product);
}

function createProduct(req, res) {
    const { name, price } = req.body;

    if (!name || price === undefined) {
        return res.status(400).json({
            message: "Name and price are required"
        });
    }

    const newProduct = {
        id: Date.now(),
        name: name,
        price: price
    };

    const product = productService.createProduct(newProduct);

    // Data changed → invalidate cache
    clearCache();

    res.status(201).json(product);
}

function updateProduct(req, res) {
    const id = Number(req.params.id);

    const updatedProduct = productService.updateProduct(
        id,
        req.body
    );

    if (!updatedProduct) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    // Data changed → invalidate cache
    clearCache();

    res.json(updatedProduct);
}

function deleteProduct(req, res) {
    const id = Number(req.params.id);

    const deletedProduct = productService.deleteProduct(id);

    if (!deletedProduct) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    // Data changed → invalidate cache
    clearCache();

    res.json({
        message: "Product deleted successfully",
        product: deletedProduct
    });
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};