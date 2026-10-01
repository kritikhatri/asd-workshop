const database = require("../database/productDatabase");

function getAllProducts() {
    return database.getAllProducts();
}

function getProductById(id) {
    return database.getProductById(id);
}

function createProduct(product) {
    return database.createProduct(product);
}

function updateProduct(id, updatedData) {
    return database.updateProduct(id, updatedData);
}

function deleteProduct(id) {
    return database.deleteProduct(id);
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};