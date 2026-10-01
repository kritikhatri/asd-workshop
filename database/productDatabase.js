let products = [
    {
        id: 1,
        name: "Laptop",
        price: 60000
    },
    {
        id: 2,
        name: "Phone",
        price: 30000
    },
    {
        id: 3,
        name: "Headphones",
        price: 3000
    }
];

function getAllProducts() {
    return products;
}

function getProductById(id) {
    return products.find(product => product.id === id);
}

function createProduct(product) {
    products.push(product);
    return product;
}

function updateProduct(id, updatedData) {
    const index = products.findIndex(product => product.id === id);

    if (index === -1) {
        return null;
    }

    products[index] = {
        ...products[index],
        ...updatedData,
        id: id
    };

    return products[index];
}

function deleteProduct(id) {
    const index = products.findIndex(product => product.id === id);

    if (index === -1) {
        return null;
    }

    const deletedProduct = products[index];

    products.splice(index, 1);

    return deletedProduct;
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};