import dotenv from "dotenv";
dotenv.config(); // ✅ MUST be first thing executed

import express from "express";
import OpenAI from "openai";
import authMiddleware from "../middleware/authMiddleware.js";
import Note from "../models/Note.js";

const router = express.Router();

// ✅ Debug (temporary – you can remove later)
console.log("OPENAI KEY LOADED:", !!process.env.OPENAI_API_KEY);


const cleanEmptyEnums = (obj, enumFields) => {
  enumFields.forEach((path) => {
    const keys = path.split(".");
    let ref = obj;

    for (let i = 0; i < keys.length - 1; i++) {
      if (!ref[keys[i]]) return;
      ref = ref[keys[i]];
    }

    const lastKey = keys[keys.length - 1];
    if (ref[lastKey] === "") {
      delete ref[lastKey];
    }
  });
};

// --------------------
// ADD NOTE (FIXED)
// --------------------
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { basicInfo, ...rest } = req.body;

    if (!basicInfo?.place) {
      return res.status(400).json({ message: "Place data missing" });
    }

    // ✅ Normalize place
    const normalizedPlace = {
      name:
        basicInfo.place.name ||
        basicInfo.place.display_name ||
        "Unknown Place",
      city: basicInfo.place.city || basicInfo.place.address?.city || "",
      state: basicInfo.place.state || basicInfo.place.address?.state || "",
      country:
        basicInfo.place.country || basicInfo.place.address?.country || "",
      lat: Number(basicInfo.place.lat),
      lng: Number(basicInfo.place.lng || basicInfo.place.lon),
      source: basicInfo.place.source || "openstreetmap",
    };

    // ✅ FIX ENUM ISSUE HERE
    cleanEmptyEnums(req.body, [
      "travelDetails.mode",
      "stayDetails.bookingType",
    ]);

    const newNote = new Note({
      basicInfo: {
        ...basicInfo,
        place: normalizedPlace,
      },
      ...rest,
      user: req.userId,
    });

    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("ADD NOTE ERROR:", error);
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
       (note) => note.basicInfo?.visibility === "public"
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
      "basicInfo.place.name": { $regex: place, $options: "i" },
      "basicInfo.visibility": "public",
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
      "basicInfo.place.name": { $regex: place, $options: "i" },
      "basicInfo.visibility": "public",
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

// --------------------
// UPDATE NOTE (Protected)
// --------------------
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.userId }, // ownership check
      req.body,
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Failed to update note" });
  }
});

// --------------------
// DELETE NOTE (Protected)
// --------------------
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.userId, // ownership check
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete note" });
  }
});


export default router;
