
const express = require("express");
const pool = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

app.get("/api/v1/products", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, price, stock FROM products ORDER BY id"
    );

    res.status(200).json({
      count: result.rowCount,
      products: result.rows,
    });
  } catch (error) {
    console.error("Failed to fetch products:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/v1/products/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: "Invalid product ID" });
  }

  try {
    const result = await pool.query(
      "SELECT id, name, price, stock FROM products WHERE id = $1",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Failed to fetch product:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Product API listening on port ${PORT}`);
});
