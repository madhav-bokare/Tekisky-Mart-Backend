import express from "express";
import Mart from "../models/mart.js";

const router = express.Router();

// ===== POST: Add single or multiple Mart =====
router.post("/", async (req, res) => {
  try {
    // Multiple insert
    if (Array.isArray(req.body)) {
      const marts = req.body.map(m => ({
        ...m,
        category: m.category?.toLowerCase(),
      }));

      const savedMarts = await Mart.insertMany(marts);
      return res.status(201).json(savedMarts);
    }

    // Single insert
    const { title, img, category, content, link, price } = req.body;

    if (!title || !img || !category || !content || !link) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newMart = await Mart.create({
      title,
      img,
      category: category.toLowerCase(),
      content,
      link,        
      price: price || 0, 
    });

    res.status(201).json(newMart);
  } catch (err) {
    console.error("CREATE Error:", err);
    res.status(500).json({ error: err.message });
  }
});


// ===== GET: All Mart =====
router.get("/", async (req, res) => {
  try {
    const marts = await Mart.find().lean();
    res.json(marts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ===== GET: By Category =====
router.get("/category/:category", async (req, res) => {
  try {
    const category = req.params.category.toLowerCase();
    const marts = await Mart.find({ category }).lean();
    res.json(marts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ===== GET: By Title =====
router.get("/title/:title", async (req, res) => {
  try {
    const title = decodeURIComponent(req.params.title).trim();

    const mart = await Mart.findOne({
      title: new RegExp(`^${title}$`, "i"),
    }).lean();

    if (!mart) {
      return res.status(404).json({ error: "Mart not found" });
    }

    res.json(mart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ===== PUT: Update Mart =====
router.put("/:id", async (req, res) => {
  try {
    const updatedMart = await Mart.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).lean();

    if (!updatedMart) {
      return res.status(404).json({ error: "Mart not found" });
    }

    res.json(updatedMart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ===== DELETE: Remove Mart =====
router.delete("/:id", async (req, res) => {
  try {
    const deletedMart = await Mart.findByIdAndDelete(req.params.id).lean();

    if (!deletedMart) {
      return res.status(404).json({ error: "Mart not found" });
    }

    res.json({ message: "Mart deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
