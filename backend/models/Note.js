import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
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
