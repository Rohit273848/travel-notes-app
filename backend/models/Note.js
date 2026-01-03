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
    
      trainOrBusNumber: String,
    
      from: String,
      to: String,
    
      duration: String, // e.g. "6 hours"
      approxCost: Number,
    },    

    stayDetails: {
      hotelName: String,
    
      priceRange: {
        type: String, // e.g. "₹500–₹1000", "₹2000+"
      },
    
      bookingType: {
        type: String,
        enum: ["online", "offline"],
      },
    
      cleanlinessRating: {
        type: Number,
        min: 1,
        max: 5,
      },
    
      locationAdvantage: String, // short text
    },
    
    foodDetails: {
      mustTryFood: [String],      // array
      foodPriceRange: String,
      bestTimeToEat: String,
      localSpecialDish: String,
    },
    nearbyPlaces: [
      {
        name: String,
        distance: String,   // e.g. "3 km"
        bestRoute: String,
      },
    ],
    warnings: {
      commonMistakes: String,
      crowdTiming: String,
      weatherIssues: String,
      hiddenCharges: String,
    },
        
    personalExperience: {
      type: String,
    },
    

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Note", noteSchema);
