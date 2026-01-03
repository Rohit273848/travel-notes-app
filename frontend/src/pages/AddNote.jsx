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
      basicInfo,
      travelDetails,
      noteText: details,
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
      setBasicInfo({
        place: null,
        visitType: "visited",
        visibility: "public",
        rating: 3,
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
