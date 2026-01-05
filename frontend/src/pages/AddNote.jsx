import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PlaceAutocomplete from "../components/PlaceAutocomplete";
import { MapPin, Train, Home, Utensils, Compass, AlertTriangle, Heart } from "lucide-react";

const AddNote = () => {
  const navigate = useNavigate();

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
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [warnings, setWarnings] = useState({
    commonMistakes: "",
    crowdTiming: "",
    weatherIssues: "",
    hiddenCharges: "",
  });
  const [personalExperience, setPersonalExperience] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!basicInfo.place) {
      alert("Please select a place");
      return;
    }

    const noteData = {
      basicInfo: {
        place: basicInfo.place,
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
      alert("❌ Error saving note");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-4 pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Travel Note</h1>
          <p className="text-gray-600">Document your journey with detailed insights</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Place *
                </label>
                <PlaceAutocomplete
                  onSelect={(place) => {
                    setBasicInfo((prev) => ({
                      ...prev,
                      place,
                    }));
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Visit Type
                </label>
                <select
                  value={basicInfo.visitType}
                  onChange={(e) =>
                    setBasicInfo((prev) => ({ ...prev, visitType: e.target.value }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                >
                  <option value="visited">✅ Visited</option>
                  <option value="planning">📅 Planning</option>
                  <option value="wishlist">⭐ Wishlist</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Visibility
                </label>
                <select
                  value={basicInfo.visibility}
                  onChange={(e) =>
                    setBasicInfo((prev) => ({ ...prev, visibility: e.target.value }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                >
                  <option value="public">🌍 Public</option>
                  <option value="personal">🔒 Personal</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Overall Rating: {basicInfo.rating}/5
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={basicInfo.rating}
                  onChange={(e) =>
                    setBasicInfo((prev) => ({
                      ...prev,
                      rating: Number(e.target.value),
                    }))
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Poor</span>
                  <span>Excellent</span>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Quick Notes
                </label>
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  required
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  placeholder="Brief overview of your visit..."
                />
              </div>
            </div>
          </div>

          {/* Two Column Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Travel Details Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-2 mb-6">
                <Train className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">Travel Details</h2>
              </div>

              <div className="space-y-4">
                <select
                  value={travelDetails.mode}
                  onChange={(e) =>
                    setTravelDetails((prev) => ({ ...prev, mode: e.target.value }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                >
                  <option value="">Select Mode of Travel</option>
                  <option value="train">🚆 Train</option>
                  <option value="bus">🚌 Bus</option>
                  <option value="car">🚗 Car</option>
                  <option value="bike">🏍️ Bike</option>
                  <option value="flight">✈️ Flight</option>
                </select>

                <input
                  type="text"
                  placeholder="Train / Bus Number (optional)"
                  value={travelDetails.trainOrBusNumber}
                  onChange={(e) =>
                    setTravelDetails((prev) => ({
                      ...prev,
                      trainOrBusNumber: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />

                <input
                  type="text"
                  placeholder="From (Departure)"
                  value={travelDetails.from}
                  onChange={(e) =>
                    setTravelDetails((prev) => ({ ...prev, from: e.target.value }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />

                <input
                  type="text"
                  placeholder="To (Arrival)"
                  value={travelDetails.to}
                  onChange={(e) =>
                    setTravelDetails((prev) => ({ ...prev, to: e.target.value }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />

                <input
                  type="text"
                  placeholder="Duration (e.g. 6 hours)"
                  value={travelDetails.duration}
                  onChange={(e) =>
                    setTravelDetails((prev) => ({ ...prev, duration: e.target.value }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />

                <input
                  type="number"
                  placeholder="Approx Cost (₹)"
                  value={travelDetails.approxCost}
                  onChange={(e) =>
                    setTravelDetails((prev) => ({
                      ...prev,
                      approxCost: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Stay Details Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-2 mb-6">
                <Home className="w-6 h-6 text-green-600" />
                <h2 className="text-xl font-bold text-gray-900">Stay Details</h2>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Hotel / Lodge Name"
                  value={stayDetails.hotelName}
                  onChange={(e) =>
                    setStayDetails((prev) => ({ ...prev, hotelName: e.target.value }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />

                <input
                  type="text"
                  placeholder="Price Range (e.g. ₹800–₹1200)"
                  value={stayDetails.priceRange}
                  onChange={(e) =>
                    setStayDetails((prev) => ({ ...prev, priceRange: e.target.value }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />

                <select
                  value={stayDetails.bookingType}
                  onChange={(e) =>
                    setStayDetails((prev) => ({ ...prev, bookingType: e.target.value }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                >
                  <option value="">Booking Type</option>
                  <option value="online">💻 Online</option>
                  <option value="offline">🏢 Offline</option>
                </select>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Cleanliness Rating: {stayDetails.cleanlinessRating}/5
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={stayDetails.cleanlinessRating}
                    onChange={(e) =>
                      setStayDetails((prev) => ({
                        ...prev,
                        cleanlinessRating: Number(e.target.value),
                      }))
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                  />
                </div>

                <textarea
                  rows="3"
                  placeholder="Location Advantage (e.g. near temple / beach)"
                  value={stayDetails.locationAdvantage}
                  onChange={(e) =>
                    setStayDetails((prev) => ({
                      ...prev,
                      locationAdvantage: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Food Details Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-2 mb-6">
                <Utensils className="w-6 h-6 text-orange-600" />
                <h2 className="text-xl font-bold text-gray-900">Food & Cuisine</h2>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Must-Try Food (comma separated)"
                  value={foodDetails.mustTryFood.join(", ")}
                  onChange={(e) =>
                    setFoodDetails((prev) => ({
                      ...prev,
                      mustTryFood: e.target.value
                        .split(",")
                        .map((f) => f.trim())
                        .filter(Boolean),
                    }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />

                <input
                  type="text"
                  placeholder="Food Price Range (e.g. ₹50–₹200)"
                  value={foodDetails.foodPriceRange}
                  onChange={(e) =>
                    setFoodDetails((prev) => ({
                      ...prev,
                      foodPriceRange: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />

                <input
                  type="text"
                  placeholder="Best Time To Eat (e.g. Morning / Evening)"
                  value={foodDetails.bestTimeToEat}
                  onChange={(e) =>
                    setFoodDetails((prev) => ({
                      ...prev,
                      bestTimeToEat: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />

                <input
                  type="text"
                  placeholder="Local Special Dish"
                  value={foodDetails.localSpecialDish}
                  onChange={(e) =>
                    setFoodDetails((prev) => ({
                      ...prev,
                      localSpecialDish: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Nearby Places Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-2 mb-6">
                <Compass className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-bold text-gray-900">Nearby Attractions</h2>
              </div>

              <div className="space-y-4">
                {nearbyPlaces.map((place, index) => (
                  <div
                    key={index}
                    className="border-2 border-dashed border-gray-200 rounded-lg p-4 space-y-3 bg-gray-50"
                  >
                    <input
                      type="text"
                      placeholder="Place Name"
                      value={place.name}
                      onChange={(e) => {
                        const updated = [...nearbyPlaces];
                        updated[index].name = e.target.value;
                        setNearbyPlaces(updated);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-sm"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-sm"
                    />

                    <input
                      type="text"
                      placeholder="Best Route"
                      value={place.bestRoute}
                      onChange={(e) => {
                        const updated = [...nearbyPlaces];
                        updated[index].bestRoute = e.target.value;
                        setNearbyPlaces(updated);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-sm"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setNearbyPlaces(nearbyPlaces.filter((_, i) => i !== index))
                      }
                      className="text-red-600 text-sm font-medium hover:text-red-700 transition"
                    >
                      ✕ Remove
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
                  className="w-full bg-purple-50 text-purple-700 px-4 py-3 rounded-lg hover:bg-purple-100 transition font-medium"
                >
                  + Add Nearby Place
                </button>
              </div>
            </div>
          </div>

          {/* Warnings Card - Full Width */}
          <div className="bg-red-50 rounded-xl shadow-lg p-6 border-2 border-red-200">
            <div className="flex items-center gap-2 mb-6">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <h2 className="text-xl font-bold text-red-900">⚠️ Important Warnings & Tips</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <textarea
                rows="3"
                placeholder="Common mistakes people make"
                value={warnings.commonMistakes}
                onChange={(e) =>
                  setWarnings((prev) => ({ ...prev, commonMistakes: e.target.value }))
                }
                className="w-full px-4 py-3 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition bg-white"
              />

              <textarea
                rows="3"
                placeholder="Crowd timing (when to avoid / best time)"
                value={warnings.crowdTiming}
                onChange={(e) =>
                  setWarnings((prev) => ({ ...prev, crowdTiming: e.target.value }))
                }
                className="w-full px-4 py-3 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition bg-white"
              />

              <textarea
                rows="3"
                placeholder="Weather issues to be careful about"
                value={warnings.weatherIssues}
                onChange={(e) =>
                  setWarnings((prev) => ({ ...prev, weatherIssues: e.target.value }))
                }
                className="w-full px-4 py-3 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition bg-white"
              />

              <textarea
                rows="3"
                placeholder="Hidden charges / scams to avoid"
                value={warnings.hiddenCharges}
                onChange={(e) =>
                  setWarnings((prev) => ({ ...prev, hiddenCharges: e.target.value }))
                }
                className="w-full px-4 py-3 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition bg-white"
              />
            </div>
          </div>

          {/* Personal Experience Card - Full Width */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-lg p-6 border border-indigo-200">
            <div className="flex items-center gap-2 mb-6">
              <Heart className="w-6 h-6 text-indigo-600" />
              <h2 className="text-xl font-bold text-gray-900">🧠 My Personal Experience</h2>
            </div>

            <textarea
              rows="6"
              placeholder="Share your journey in your own words... What made this trip special? Any memorable moments?"
              value={personalExperience}
              onChange={(e) => setPersonalExperience(e.target.value)}
              className="w-full px-4 py-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-white"
            />
            <p className="text-sm text-gray-600 mt-2">
              💡 This helps create better summaries and recommendations
            </p>
          </div>
        </form>
      </div>

      {/* Sticky Submit Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg font-bold text-lg"
          >
            💾 Save Travel Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNote;