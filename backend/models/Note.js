import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },    
    placeName: {
      type: String,
      required: true,
    },
    travelDate: String,
    transportDetails: String,
    hotelDetails: String,
    noteText: String,
    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);
export default Note;
