import { useState } from "react";
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
} from "lucide-react";

const AddNote = () => {
  /* =========================
     STATE
  ========================= */
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
  const [activeSection, setActiveSection] = useState("basic");

  /* =========================
     SUBMIT (FIXED)
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ FRONTEND VALIDATION
    if (!basicInfo.place.trim()) {
      alert("Please enter destination");
      return;
    }
    if (!travelDetails.from.trim() || !travelDetails.to.trim()) {
      alert("Please fill travel From & To");
      return;
    }
    if (!stayDetails.hotelName.trim()) {
      alert("Please enter hotel name");
      return;
    }
    if (!details.trim()) {
      alert("Please write some notes");
      return;
    }

    const token = localStorage.getItem("token");

    const payload = {
      placeName: basicInfo.place,
      visitType: basicInfo.visitType,
      visibility: basicInfo.visibility,
      rating: basicInfo.rating,

      travelDetails,
      stayDetails,
      foodDetails,
      nearbyPlaces,
      warnings,
      personalExperience,
      noteText: details,
    };

    console.log("Sending payload:", payload);

    try {
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

      alert("✅ Note saved successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Network error");
    }
  };

  /* =========================
     RATING COMPONENT
  ========================= */
  const RatingStars = ({ rating, onChange, label }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((s) => (
          <button key={s} type="button" onClick={() => onChange(s)}>
            <Star
              size={30}
              className={
                s <= rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }
            />
          </button>
        ))}
      </div>
    </div>
  );

  const sections = [
    { id: "basic", label: "Basic Info", icon: MapPin },
    { id: "travel", label: "Travel", icon: Plane },
    { id: "stay", label: "Stay", icon: Hotel },
    { id: "food", label: "Food", icon: Utensils },
    { id: "nearby", label: "Nearby", icon: Navigation },
    { id: "warnings", label: "Warnings", icon: AlertTriangle },
    { id: "experience", label: "Experience", icon: Heart },
  ];

  /* =========================
     UI
  ========================= */
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-indigo-600 rounded-2xl mb-4">
            <Camera className="text-white" size={32} />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Create Travel Memory
          </h1>
          <p className="text-gray-600">
            Capture every detail of your journey
          </p>
        </div>

        {/* Section Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {sections.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveSection(id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
                  activeSection === id
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100"
                }`}
              >
                <Icon size={18} /> {label}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* BASIC */}
          {activeSection === "basic" && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <input
                className="w-full px-4 py-3 border rounded-xl mb-4"
                placeholder="Destination"
                value={basicInfo.place}
                onChange={(e) =>
                  setBasicInfo({ ...basicInfo, place: e.target.value })
                }
              />

              <RatingStars
                rating={basicInfo.rating}
                onChange={(r) => setBasicInfo({ ...basicInfo, rating: r })}
                label="Overall Rating"
              />

              <textarea
                className="w-full px-4 py-3 border rounded-xl mt-4"
                rows={4}
                placeholder="Quick Notes"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </div>
          )}

          {/* TRAVEL */}
          {activeSection === "travel" && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <input
                className="w-full px-4 py-3 border rounded-xl mb-3"
                placeholder="From"
                value={travelDetails.from}
                onChange={(e) =>
                  setTravelDetails({ ...travelDetails, from: e.target.value })
                }
              />
              <input
                className="w-full px-4 py-3 border rounded-xl"
                placeholder="To"
                value={travelDetails.to}
                onChange={(e) =>
                  setTravelDetails({ ...travelDetails, to: e.target.value })
                }
              />
            </div>
          )}

          {/* STAY */}
          {activeSection === "stay" && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <input
                className="w-full px-4 py-3 border rounded-xl mb-3"
                placeholder="Hotel Name"
                value={stayDetails.hotelName}
                onChange={(e) =>
                  setStayDetails({
                    ...stayDetails,
                    hotelName: e.target.value,
                  })
                }
              />
            </div>
          )}

          {/* EXPERIENCE */}
          {activeSection === "experience" && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <textarea
                rows={6}
                className="w-full px-4 py-3 border rounded-xl"
                placeholder="Your personal experience"
                value={personalExperience}
                onChange={(e) => setPersonalExperience(e.target.value)}
              />
            </div>
          )}

          {/* SUBMIT */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg"
            >
              Save Travel Memory
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
