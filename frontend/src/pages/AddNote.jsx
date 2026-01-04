import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PlaceAutocomplete from "../components/PlaceAutocomplete";

const AddNote = () => {
  const navigate = useNavigate();

  /* 🔹 3.1 ADD STATE (TOP OF COMPONENT) */
  const [details, setDetails] = useState("");

  const [basicInfo, setBasicInfo] = useState({
    place: null,
    visitType: "visited",
    visibility: "public",
    rating: 3,
  });
  const [travelDetails, setTravelDetails] = useState({
    mode: "",
    trainOrBusNumber: "",
    from: "",
    to: "",
    duration: "",
    approxCost: "",
  });
  const [stayDetails, setStayDetails] = useState({
    hotelName: "",
    priceRange: "",
    bookingType: "",
    cleanlinessRating: 3,
    locationAdvantage: "",
  });
  const [foodDetails, setFoodDetails] = useState({
    mustTryFood: [],
    foodPriceRange: "",
    bestTimeToEat: "",
    localSpecialDish: "",
  });
  const [nearbyPlaces, setNearbyPlaces] = useState([
    // { name: "", distance: "", bestRoute: "" }
  ]);
  const [warnings, setWarnings] = useState({
    commonMistakes: "",
    crowdTiming: "",
    weatherIssues: "",
    hiddenCharges: "",
  });
  const [personalExperience, setPersonalExperience] = useState("");


  /* 🔐 AUTH CHECK */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      navigate("/login");
    }
  }, [navigate]);

  /* 🔹 3.6 UPDATE SUBMIT DATA */
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!basicInfo.place) {
      alert("Please select a place");
      return;
    }
  
    const noteData = {
      basicInfo: {
        place: basicInfo.place,          // FULL location object
        visitType: basicInfo.visitType,
        visibility: basicInfo.visibility,
        rating: basicInfo.rating,
      },
      travelDetails,
      stayDetails,
      foodDetails,
      nearbyPlaces,
      warnings,
      personalExperience,
      noteText: details, // temporary (we’ll remove later)
    };
  
    try {
      const token = localStorage.getItem("token");
  
      const res = await fetch(
        "https://travel-notes-app.onrender.com/api/notes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(noteData),
        }
      );
  
      if (!res.ok) throw new Error("Failed to save note");
  
      alert("✅ Note saved");
  
      // reset
      setDetails("");
      setPersonalExperience("");
      setBasicInfo({
        place: null,
        visitType: "visited",
        visibility: "public",
        rating: 3,
      });
  
      setTravelDetails({
        mode: "",
        trainOrBusNumber: "",
        from: "",
        to: "",
        duration: "",
        approxCost: "",
      });
  
      setStayDetails({
        hotelName: "",
        priceRange: "",
        bookingType: "",
        cleanlinessRating: 3,
        locationAdvantage: "",
      });
  
    } catch (err) {
      console.error(err);
      alert("❌ Error saving note");
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Add Note</h2>

        {/* 🔹 3.2 PLACE AUTOCOMPLETE */}
        <div>
          <label className="block mb-1 font-medium">Place</label>
          <PlaceAutocomplete
            onSelect={(place) => {
              setBasicInfo((prev) => ({
                ...prev,
                place,
              }));
            }}
          />
        </div>

        {/* 🔹 3.3 VISIT TYPE */}
        <div>
          <label className="block mb-1 font-medium">Visit Type</label>
          <select
            value={basicInfo.visitType}
            onChange={(e) =>
              setBasicInfo({ ...basicInfo, visitType: e.target.value })
            }
            className="input w-full border px-3 py-2 rounded"
          >
            <option value="visited">Visited</option>
            <option value="planning">Planning</option>
            <option value="wishlist">Wishlist</option>
          </select>
        </div>

        {/* 🔹 3.4 VISIBILITY */}
        <div>
          <label className="block mb-1 font-medium">Visibility</label>
          <select
            value={basicInfo.visibility}
            onChange={(e) =>
              setBasicInfo({ ...basicInfo, visibility: e.target.value })
            }
            className="input w-full border px-3 py-2 rounded"
          >
            <option value="public">Public</option>
            <option value="personal">Personal</option>
          </select>
        </div>

        {/* 🔹 3.5 RATING */}
        <div>
          <label className="block mb-1 font-medium">Rating (1–5)</label>
          <input
            type="number"
            min="1"
            max="5"
            value={basicInfo.rating}
            onChange={(e) =>
              setBasicInfo({
                ...basicInfo,
                rating: Number(e.target.value),
              })
            }
            className="input w-full border px-3 py-2 rounded"
          />
        </div>

        {/* NOTES */}
        <div>
          <label className="block mb-1 font-medium">Notes</label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
            rows="4"
            className="w-full border px-3 py-2 rounded"
            placeholder="Travel details, food, stay, tips..."
          />
        </div>

        {/* 🅱️ Travel Details */}
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Travel Details</h3>

          {/* Mode of Travel */}
          <select
            value={travelDetails.mode}
            onChange={(e) =>
              setTravelDetails({ ...travelDetails, mode: e.target.value })
            }
            className="input mb-3"
          >
            <option value="">Select Mode of Travel</option>
            <option value="train">Train</option>
            <option value="bus">Bus</option>
            <option value="car">Car</option>
            <option value="bike">Bike</option>
            <option value="flight">Flight</option>
          </select>

          {/* Train / Bus Number (conditional but simple for now) */}
          <input
            type="text"
            placeholder="Train / Bus Number (optional)"
            value={travelDetails.trainOrBusNumber}
            onChange={(e) =>
              setTravelDetails({
                ...travelDetails,
                trainOrBusNumber: e.target.value,
              })
            }
            className="input mb-3"
          />

          {/* From */}
          <input
            type="text"
            placeholder="From (Departure location)"
            value={travelDetails.from}
            onChange={(e) =>
              setTravelDetails({ ...travelDetails, from: e.target.value })
            }
            className="input mb-3"
          />

          {/* To */}
          <input
            type="text"
            placeholder="To (Arrival location)"
            value={travelDetails.to}
            onChange={(e) =>
              setTravelDetails({ ...travelDetails, to: e.target.value })
            }
            className="input mb-3"
          />

          {/* Duration */}
          <input
            type="text"
            placeholder="Travel Duration (e.g. 6 hours)"
            value={travelDetails.duration}
            onChange={(e) =>
              setTravelDetails({ ...travelDetails, duration: e.target.value })
            }
            className="input mb-3"
          />

          {/* Approx Cost */}
          <input
            type="number"
            placeholder="Approx Cost (₹)"
            value={travelDetails.approxCost}
            onChange={(e) =>
              setTravelDetails({
                ...travelDetails,
                approxCost: e.target.value,
              })
            }
            className="input"
          />
        </div>
        {/* 🅲 Stay Details */}
        <div className="mt-10">
          <h3 className="text-xl font-bold mb-4">Stay Details</h3>

          {/* Hotel / Lodge Name */}
          <input
            type="text"
            placeholder="Hotel / Lodge Name"
            value={stayDetails.hotelName}
            onChange={(e) =>
              setStayDetails({ ...stayDetails, hotelName: e.target.value })
            }
            className="input mb-3"
          />

          {/* Price Range */}
          <input
            type="text"
            placeholder="Price Range (e.g. ₹800–₹1200)"
            value={stayDetails.priceRange}
            onChange={(e) =>
              setStayDetails({ ...stayDetails, priceRange: e.target.value })
            }
            className="input mb-3"
          />

          {/* Booking Type */}
          <select
            value={stayDetails.bookingType}
            onChange={(e) =>
              setStayDetails({ ...stayDetails, bookingType: e.target.value })
            }
            className="input mb-3"
          >
            <option value="">Booking Type</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>

          {/* Cleanliness Rating */}
          <input
            type="number"
            min="1"
            max="5"
            placeholder="Cleanliness Rating (1–5)"
            value={stayDetails.cleanlinessRating}
            onChange={(e) =>
              setStayDetails({
                ...stayDetails,
                cleanlinessRating: Number(e.target.value),
              })
            }
            className="input mb-3"
          />

          {/* Location Advantage */}
          <textarea
            rows="2"
            placeholder="Location Advantage (e.g. near temple / beach / station)"
            value={stayDetails.locationAdvantage}
            onChange={(e) =>
              setStayDetails({
                ...stayDetails,
                locationAdvantage: e.target.value,
              })
            }
            className="input"
          />
        </div>
{/* 🅳 Food & Local Experience */}
<div className="mt-10">
  <h3 className="text-xl font-bold mb-4">Food & Local Experience</h3>

  {/* Must Try Food (comma separated → array) */}
  <input
    type="text"
    placeholder="Must-Try Food (comma separated)"
    value={foodDetails.mustTryFood.join(", ")}
    onChange={(e) =>
      setFoodDetails({
        ...foodDetails,
        mustTryFood: e.target.value
          .split(",")
          .map((f) => f.trim())
          .filter(Boolean),
      })
    }
    className="input mb-3"
  />

  {/* Food Price Range */}
  <input
    type="text"
    placeholder="Food Price Range (e.g. ₹50–₹200)"
    value={foodDetails.foodPriceRange}
    onChange={(e) =>
      setFoodDetails({
        ...foodDetails,
        foodPriceRange: e.target.value,
      })
    }
    className="input mb-3"
  />

  {/* Best Time To Eat */}
  <input
    type="text"
    placeholder="Best Time To Eat (e.g. Morning / Evening)"
    value={foodDetails.bestTimeToEat}
    onChange={(e) =>
      setFoodDetails({
        ...foodDetails,
        bestTimeToEat: e.target.value,
      })
    }
    className="input mb-3"
  />

  {/* Local Special Dish */}
  <input
    type="text"
    placeholder="Local Special Dish"
    value={foodDetails.localSpecialDish}
    onChange={(e) =>
      setFoodDetails({
        ...foodDetails,
        localSpecialDish: e.target.value,
      })
    }
    className="input"
  />
</div>
{/* 🅴 Nearby Places / Attractions */}
<div className="mt-10">
  <h3 className="text-xl font-bold mb-4">Nearby Places / Attractions</h3>

  {nearbyPlaces.map((place, index) => (
    <div
      key={index}
      className="border rounded p-3 mb-4 space-y-2 bg-gray-50"
    >
      <input
        type="text"
        placeholder="Nearby Place Name"
        value={place.name}
        onChange={(e) => {
          const updated = [...nearbyPlaces];
          updated[index].name = e.target.value;
          setNearbyPlaces(updated);
        }}
        className="input w-full"
      />

      <input
        type="text"
        placeholder="Distance (e.g. 5 km)"
        value={place.distance}
        onChange={(e) => {
          const updated = [...nearbyPlaces];
          updated[index].distance = e.target.value;
          setNearbyPlaces(updated);
        }}
        className="input w-full"
      />

      <input
        type="text"
        placeholder="Best Route (e.g. via XYZ Road)"
        value={place.bestRoute}
        onChange={(e) => {
          const updated = [...nearbyPlaces];
          updated[index].bestRoute = e.target.value;
          setNearbyPlaces(updated);
        }}
        className="input w-full"
      />

      <button
        type="button"
        onClick={() =>
          setNearbyPlaces(nearbyPlaces.filter((_, i) => i !== index))
        }
        className="text-red-600 text-sm"
      >
        Remove
      </button>
    </div>
  ))}

  <button
    type="button"
    onClick={() =>
      setNearbyPlaces([
        ...nearbyPlaces,
        { name: "", distance: "", bestRoute: "" },
      ])
    }
    className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
  >
    + Add Nearby Place
  </button>
</div>
{/* ⚠️ Warnings & Tips */}
<div className="mt-10">
  <h3 className="text-xl font-bold mb-4 text-red-600">
    ⚠️ Warnings & Tips (Very Important)
  </h3>

  {/* Common Mistakes */}
  <textarea
    rows="2"
    placeholder="Common mistakes people make"
    value={warnings.commonMistakes}
    onChange={(e) =>
      setWarnings({ ...warnings, commonMistakes: e.target.value })
    }
    className="input mb-3"
  />

  {/* Crowd Timing */}
  <textarea
    rows="2"
    placeholder="Crowd timing (when to avoid / best time)"
    value={warnings.crowdTiming}
    onChange={(e) =>
      setWarnings({ ...warnings, crowdTiming: e.target.value })
    }
    className="input mb-3"
  />

  {/* Weather Issues */}
  <textarea
    rows="2"
    placeholder="Weather issues to be careful about"
    value={warnings.weatherIssues}
    onChange={(e) =>
      setWarnings({ ...warnings, weatherIssues: e.target.value })
    }
    className="input mb-3"
  />

  {/* Hidden Charges / Scams */}
  <textarea
    rows="2"
    placeholder="Hidden charges / scams to avoid"
    value={warnings.hiddenCharges}
    onChange={(e) =>
      setWarnings({ ...warnings, hiddenCharges: e.target.value })
    }
    className="input"
  />
</div>
{/* 🧠 Personal Experience */}
<div className="mt-10">
  <h3 className="text-xl font-bold mb-4">
    🧠 My Personal Experience
  </h3>

  <textarea
    rows="5"
    placeholder="Write your personal experience in your own words..."
    value={personalExperience}
    onChange={(e) => setPersonalExperience(e.target.value)}
    className="input w-full"
  />

  <p className="text-sm text-gray-500 mt-2">
    This helps AI improve and summarize your experience later.
  </p>
</div>


        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Save Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;