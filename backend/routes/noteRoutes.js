import dotenv from "dotenv";
dotenv.config(); // ✅ MUST be first thing executed

import express from "express";
import OpenAI from "openai";
import authMiddleware from "../middleware/authMiddleware.js";
import Note from "../models/Note.js";

const router = express.Router();

// ✅ Debug (temporary – you can remove later)
console.log("OPENAI KEY LOADED:", !!process.env.OPENAI_API_KEY);

// --------------------
// ADD NOTE
// --------------------
router.post("/", authMiddleware, async (req, res) => {
  try {
    const newNote = new Note({
      ...req.body,
      user: req.userId || null,
    });

    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// --------------------
// FETCH PUBLIC NOTES
// --------------------
router.get("/public", async (req, res) => {
  try {
    const allNotes = await Note.find().sort({ createdAt: -1 });

    const publicNotes = allNotes.filter(
      (note) => note.isPublic === true || note.visibility === "public"
    );

    res.status(200).json(publicNotes);
  } catch (error) {
    console.error("Public notes error:", error);
    res.status(500).json({ message: "Failed to fetch public notes" });
  }
});

// --------------------
// SEARCH NOTES
// --------------------
router.get("/search", async (req, res) => {
  try {
    const { place } = req.query;

    if (!place) {
      return res.status(400).json({ message: "Place query is required" });
    }

    const notes = await Note.find({
      placeName: { $regex: place, $options: "i" },
      isPublic: true,
    }).sort({ createdAt: -1 });

    res.status(200).json(notes);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Search failed" });
  }
});

// --------------------
// AI SUMMARY
// --------------------
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/ai-summary", async (req, res) => {
  try {
    const { place } = req.body;

    if (!place) {
      return res.status(400).json({ message: "Place name required" });
    }

    const notes = await Note.find({
      placeName: { $regex: place, $options: "i" },
      isPublic: true,
    });

    if (notes.length === 0) {
      return res.json({ summary: "No notes available for this place." });
    }

    const combinedText = notes.map((n) => n.noteText).join("\n");

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You summarize travel notes in simple, clear English.",
        },
        {
          role: "user",
          content: `Summarize these travel notes:\n${combinedText}`,
        },
      ],
    });

    res.json({
      summary: response.choices[0].message.content,
    });
  } catch (error) {
    console.error("AI Summary error:", error);
    res.status(500).json({ message: "AI summary failed" });
  }
});

// GET: My Notes (Protected)
router.get("/my-notes", authMiddleware, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.userId }).sort({
      createdAt: -1,
    });

    res.json(notes);
  } catch (error) {
    console.error("My notes error:", error);
    res.status(500).json({ message: "Failed to fetch notes" });
  }
});


export default router;
