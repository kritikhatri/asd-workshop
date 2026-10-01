const express = require("express");

const productRoutes = require("./routes/productRoutes");

const app = express();

const PORT = 3000;

// Parse JSON request bodies
app.use(express.json());

// Product routes
app.use("/", productRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});