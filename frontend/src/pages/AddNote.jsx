import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PlaceAutocomplete from "../components/PlaceAutocomplete";
import {
  MapPin,
  Plane,
  Hotel,
  Utensils,
  AlertTriangle,
  Heart,
  Star,
  Clock,
  DollarSign,
  Navigation,
  Plus,
  X,
  Users,
  Camera,
  Save,
} from "lucide-react";

const AddNote = () => {
  const navigate = useNavigate();

  /* ================= AUTH CHECK ================= */

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      navigate("/login");
    }
  }, [navigate]);

  /* ================= STATES ================= */

  const [activeSection, setActiveSection] = useState("basic");

  const [details, setDetails] = useState("");

  const [basicInfo, setBasicInfo] = useState({
    place: "",
    visitType: "visited",
    visibility: "public",
    rating: 3,
  });

  const [travelDetails, setTravelDetails] = useState({
    mode: "train",
    trainOrBusNumber: "",
    from: "",
    to: "",
    duration: "",
    approxCost: "",
  });

  const [stayDetails, setStayDetails] = useState({
    hotelName: "",
    priceRange: "",
    bookingType: "offline",
    cleanlinessRating: 3,
    locationAdvantage: "",
  });

  const [foodDetails, setFoodDetails] = useState({
    mustTryFood: [],
    foodPriceRange: "",
    bestTimeToEat: "",
    localSpecialDish: "",
  });

  const [nearbyPlaces, setNearbyPlaces] = useState([]);

  const [warnings, setWarnings] = useState({
    commonMistakes: "",
    crowdTiming: "",
    weatherIssues: "",
    hiddenCharges: "",
  });

  const [personalExperience, setPersonalExperience] = useState("");

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!basicInfo.place) {
      alert("Please select a place");
      return;
    }

    const payload = {
      placeName: basicInfo.place,
      visitType: basicInfo.visitType,
      visibility: basicInfo.visibility,
      rating: Number(basicInfo.rating),

      travelDetails: {
        ...travelDetails,
        approxCost: Number(travelDetails.approxCost) || 0,
      },

      stayDetails: {
        ...stayDetails,
        cleanlinessRating: Number(stayDetails.cleanlinessRating),
      },

      foodDetails,
      nearbyPlaces,
      warnings,
      personalExperience,
      noteText: details,
    };

    console.log("FINAL PAYLOAD", payload);

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
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.error(data);
        alert(data.message || "Failed to save note");
        return;
      }

      alert("✅ Note saved successfully");

      /* RESET */
      setDetails("");
      setPersonalExperience("");
      setBasicInfo({
        place: "",
        visitType: "visited",
        visibility: "public",
        rating: 3,
      });
      setTravelDetails({
        mode: "train",
        trainOrBusNumber: "",
        from: "",
        to: "",
        duration: "",
        approxCost: "",
      });
      setStayDetails({
        hotelName: "",
        priceRange: "",
        bookingType: "offline",
        cleanlinessRating: 3,
        locationAdvantage: "",
      });
      setFoodDetails({
        mustTryFood: [],
        foodPriceRange: "",
        bestTimeToEat: "",
        localSpecialDish: "",
      });
      setNearbyPlaces([]);
      setWarnings({
        commonMistakes: "",
        crowdTiming: "",
        weatherIssues: "",
        hiddenCharges: "",
      });
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  /* ================= RATING ================= */

  const RatingStars = ({ rating, onChange }) => (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button key={star} type="button" onClick={() => onChange(star)}>
          <Star
            className={
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }
          />
        </button>
      ))}
    </div>
  );

  /* ================= SECTIONS ================= */

  const sections = [
    { id: "basic", label: "Basic", icon: MapPin },
    { id: "travel", label: "Travel", icon: Plane },
    { id: "stay", label: "Stay", icon: Hotel },
    { id: "food", label: "Food", icon: Utensils },
    { id: "nearby", label: "Nearby", icon: Navigation },
    { id: "warnings", label: "Warnings", icon: AlertTriangle },
    { id: "experience", label: "Experience", icon: Heart },
  ];

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-10">
          <Camera className="mx-auto text-indigo-600" size={40} />
          <h1 className="text-4xl font-bold mt-2">Create Travel Memory</h1>
          <p className="text-gray-600">Capture every detail</p>
        </div>

        {/* NAV */}
        <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-wrap gap-2 justify-center">
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveSection(s.id)}
                className={`px-4 py-2 rounded-lg flex gap-2 items-center ${
                  activeSection === s.id
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100"
                }`}
              >
                <Icon size={16} />
                {s.label}
              </button>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* BASIC */}
          {activeSection === "basic" && (
            <div className="bg-white p-6 rounded-xl shadow space-y-4">
              <PlaceAutocomplete
                onSelect={(place) =>
                  setBasicInfo((prev) => ({
                    ...prev,
                    place: place.name,
                  }))
                }
              />

              <RatingStars
                rating={basicInfo.rating}
                onChange={(r) =>
                  setBasicInfo({ ...basicInfo, rating: r })
                }
              />

              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={4}
                className="w-full border p-3 rounded"
                placeholder="Quick notes..."
              />
            </div>
          )}

          {/* TRAVEL */}
          {activeSection === "travel" && (
            <div className="bg-white p-6 rounded-xl shadow space-y-4">
              <select
                value={travelDetails.mode}
                onChange={(e) =>
                  setTravelDetails({ ...travelDetails, mode: e.target.value })
                }
                className="w-full border p-2 rounded"
              >
                <option value="train">Train</option>
                <option value="bus">Bus</option>
                <option value="car">Car</option>
                <option value="bike">Bike</option>
                <option value="flight">Flight</option>
              </select>

              <input
                placeholder="From"
                className="w-full border p-2 rounded"
                value={travelDetails.from}
                onChange={(e) =>
                  setTravelDetails({ ...travelDetails, from: e.target.value })
                }
              />

              <input
                placeholder="To"
                className="w-full border p-2 rounded"
                value={travelDetails.to}
                onChange={(e) =>
                  setTravelDetails({ ...travelDetails, to: e.target.value })
                }
              />
            </div>
          )}

          {/* STAY */}
          {activeSection === "stay" && (
            <div className="bg-white p-6 rounded-xl shadow space-y-4">
              <input
                placeholder="Hotel name"
                className="w-full border p-2 rounded"
                value={stayDetails.hotelName}
                onChange={(e) =>
                  setStayDetails({ ...stayDetails, hotelName: e.target.value })
                }
              />
            </div>
          )}

          {/* FOOD */}
          {activeSection === "food" && (
            <div className="bg-white p-6 rounded-xl shadow space-y-4">
              <input
                placeholder="Must try food (comma separated)"
                className="w-full border p-2 rounded"
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
              />
            </div>
          )}

          {/* WARNINGS */}
          {activeSection === "warnings" && (
            <div className="bg-white p-6 rounded-xl shadow space-y-4">
              <textarea
                placeholder="Warnings"
                className="w-full border p-3 rounded"
                value={warnings.commonMistakes}
                onChange={(e) =>
                  setWarnings({ ...warnings, commonMistakes: e.target.value })
                }
              />
            </div>
          )}

          {/* EXPERIENCE */}
          {activeSection === "experience" && (
            <div className="bg-white p-6 rounded-xl shadow space-y-4">
              <textarea
                rows={5}
                className="w-full border p-3 rounded"
                value={personalExperience}
                onChange={(e) => setPersonalExperience(e.target.value)}
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-4 rounded-xl flex items-center justify-center gap-2"
          >
            <Save /> Save Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
 