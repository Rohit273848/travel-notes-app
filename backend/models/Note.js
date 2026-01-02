import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    basicInfo: {
      place: {
        name: {
          type: String,
          required: true,
        },
        city: String,
        state: String,
        country: String,
        lat: Number,
        lng: Number,
        source: String, // google | mapbox | manual
      },

      visitType: {
        type: String,
        enum: ["visited", "planning", "wishlist"],
        required: true,
      },

      visibility: {
        type: String,
        enum: ["public", "personal"],
        required: true,
      },

      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
    },

    travelDetails: {
      mode: {
        type: String,
        enum: ["train", "bus", "car", "bike", "flight"],
      },
      transportNumber: String,
      departure: String,
      arrival: String,
      duration: String,
      cost: Number,
    },

    stayDetails: {
      hotelName: String,
      priceRange: String,
      bookingType: {
        type: String,
        enum: ["online", "offline"],
      },
      cleanlinessRating: Number,
      locationAdvantage: String,
    },

    noteText: String,

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Note", noteSchema);
