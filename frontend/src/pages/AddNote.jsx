import { useState } from "react";

import { MapPin, Plane, Hotel, Utensils, AlertTriangle, Heart, Star, Clock, DollarSign, Navigation, Plus, X, Calendar, Users, Camera } from "lucide-react";

const AddNote = () => {
  const [details, setDetails] = useState("");
  const [basicInfo, setBasicInfo] = useState({
    place: null,
    visitType: "visited",
    visibility: "public",
    rating: 3,
  });
  const [travelDetails, setTravelDetails] = useState({
    mode: "train",          // ✅ default enum
    trainOrBusNumber: "",
    from: "",
    to: "",
    duration: "",
    approxCost: "",
  });
  
  const [stayDetails, setStayDetails] = useState({
    hotelName: "",
    priceRange: "",
    bookingType: "offline", // ✅ default enum
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!basicInfo.place) {
      alert("Please select a place");
      return;
    }
  
    const token = localStorage.getItem("token");
  
    try {
      const res = await fetch(
        "https://travel-notes-app.onrender.com/api/notes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            placeName: basicInfo.place,
            basicInfo,
            travelDetails,
            stayDetails,
            foodDetails,
            nearbyPlaces,
            warnings,
            personalExperience,
            noteText: details,
          }),
        }
      );
  
      if (!res.ok) {
        alert("❌ Failed to save note");
        return;
      }
  
      alert("✅ Note saved successfully!");
    } catch (error) {
      console.error(error);
      alert("❌ Something went wrong");
    }
  };
  

  const sections = [
    { id: "basic", label: "Basic Info", icon: MapPin },
    { id: "travel", label: "Travel", icon: Plane },
    { id: "stay", label: "Stay", icon: Hotel },
    { id: "food", label: "Food", icon: Utensils },
    { id: "nearby", label: "Nearby", icon: Navigation },
    { id: "warnings", label: "Warnings", icon: AlertTriangle },
    { id: "experience", label: "Experience", icon: Heart },
  ];

  const RatingStars = ({ rating, onChange, label }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="transition-all duration-200 hover:scale-110"
          >
            <Star
              size={32}
              className={star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
            />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-indigo-600 rounded-2xl mb-4">
            <Camera className="text-white" size={32} />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Create Travel Memory</h1>
          <p className="text-gray-600">Capture every detail of your journey</p>
        </div>

        {/* Progress Navigation */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    activeSection === section.id
                      ? "bg-indigo-600 text-white shadow-lg scale-105"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{section.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info Section */}
          {activeSection === "basic" && (
            <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <MapPin className="text-indigo-600" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Basic Information</h2>
              </div>

              <div className="space-y-6">
                {/* Place Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Destination
                  </label>
                  <input
                    type="text"
                    placeholder="Search for a place..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                    onChange={(e) =>
                      setBasicInfo({ ...basicInfo, place: e.target.value })

                    }
                  />
                </div>

                {/* Visit Type Pills */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Visit Type
                  </label>
                  <div className="flex gap-3">
                    {["visited", "planning", "wishlist"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setBasicInfo({ ...basicInfo, visitType: type })}
                        className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                          basicInfo.visitType === type
                            ? "bg-indigo-600 text-white shadow-lg"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Visibility Toggle */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Visibility
                  </label>
                  <div className="flex gap-3">
                    {["public", "personal"].map((vis) => (
                      <button
                        key={vis}
                        type="button"
                        onClick={() => setBasicInfo({ ...basicInfo, visibility: vis })}
                        className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                          basicInfo.visibility === vis
                            ? "bg-purple-600 text-white shadow-lg"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {vis.charAt(0).toUpperCase() + vis.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <RatingStars
                  rating={basicInfo.rating}
                  onChange={(rating) => setBasicInfo({ ...basicInfo, rating })}
                  label="Overall Rating"
                />

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quick Notes
                  </label>
                  <textarea
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    rows="4"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                    placeholder="Write your thoughts..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Travel Details Section */}
          {activeSection === "travel" && (
            <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Plane className="text-blue-600" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Travel Details</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mode of Travel
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {["train", "bus", "car", "bike", "flight"].map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setTravelDetails({ ...travelDetails, mode })}
                        className={`py-3 rounded-xl font-medium transition-all duration-200 ${
                          travelDetails.mode === mode
                            ? "bg-blue-600 text-white shadow-lg"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {mode.charAt(0).toUpperCase() + mode.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    From
                  </label>
                  <input
                    type="text"
                    value={travelDetails.from}
                    onChange={(e) =>
                      setTravelDetails({ ...travelDetails, from: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    placeholder="Departure location"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    To
                  </label>
                  <input
                    type="text"
                    value={travelDetails.to}
                    onChange={(e) =>
                      setTravelDetails({ ...travelDetails, to: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    placeholder="Arrival location"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3.5 text-gray-400" size={20} />
                    <input
                      type="text"
                      value={travelDetails.duration}
                      onChange={(e) =>
                        setTravelDetails({ ...travelDetails, duration: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      placeholder="e.g. 6 hours"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Approx Cost
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3.5 text-gray-400" size={20} />
                    <input
                      type="number"
                      value={travelDetails.approxCost}
                      onChange={(e) =>
                        setTravelDetails({ ...travelDetails, approxCost: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      placeholder="₹"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Train / Bus Number (Optional)
                  </label>
                  <input
                    type="text"
                    value={travelDetails.trainOrBusNumber}
                    onChange={(e) =>
                      setTravelDetails({ ...travelDetails, trainOrBusNumber: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    placeholder="e.g. 12345"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Stay Details Section */}
          {activeSection === "stay" && (
            <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Hotel className="text-green-600" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Stay Details</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hotel / Lodge Name
                  </label>
                  <input
                    type="text"
                    value={stayDetails.hotelName}
                    onChange={(e) =>
                      setStayDetails({ ...stayDetails, hotelName: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                    placeholder="Where did you stay?"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Range
                    </label>
                    <input
                      type="text"
                      value={stayDetails.priceRange}
                      onChange={(e) =>
                        setStayDetails({ ...stayDetails, priceRange: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                      placeholder="e.g. ₹800–₹1200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Booking Type
                    </label>
                    <div className="flex gap-3">
                      {["online", "offline"].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setStayDetails({ ...stayDetails, bookingType: type })}
                          className={`flex-1 py-3 rounded-xl font-medium transition-all duration-200 ${
                            stayDetails.bookingType === type
                              ? "bg-green-600 text-white shadow-lg"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <RatingStars
                  rating={stayDetails.cleanlinessRating}
                  onChange={(rating) =>
                    setStayDetails({ ...stayDetails, cleanlinessRating: rating })
                  }
                  label="Cleanliness Rating"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location Advantage
                  </label>
                  <textarea
                    value={stayDetails.locationAdvantage}
                    onChange={(e) =>
                      setStayDetails({ ...stayDetails, locationAdvantage: e.target.value })
                    }
                    rows="3"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                    placeholder="e.g. near temple / beach / station"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Food Details Section */}
          {activeSection === "food" && (
            <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Utensils className="text-orange-600" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Food & Local Experience</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Must-Try Food
                  </label>
                  <input
                    type="text"
                    value={foodDetails.mustTryFood.join(", ")}
                    onChange={(e) =>
                      setFoodDetails({
                        ...foodDetails,
                        mustTryFood: e.target.value.split(",").map((f) => f.trim()).filter(Boolean),
                      })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
                    placeholder="Separate with commas"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Food Price Range
                    </label>
                    <input
                      type="text"
                      value={foodDetails.foodPriceRange}
                      onChange={(e) =>
                        setFoodDetails({ ...foodDetails, foodPriceRange: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
                      placeholder="e.g. ₹50–₹200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Best Time To Eat
                    </label>
                    <input
                      type="text"
                      value={foodDetails.bestTimeToEat}
                      onChange={(e) =>
                        setFoodDetails({ ...foodDetails, bestTimeToEat: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
                      placeholder="Morning / Evening"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Local Special Dish
                  </label>
                  <input
                    type="text"
                    value={foodDetails.localSpecialDish}
                    onChange={(e) =>
                      setFoodDetails({ ...foodDetails, localSpecialDish: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
                    placeholder="Famous local specialty"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Nearby Places Section */}
          {activeSection === "nearby" && (
            <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <Navigation className="text-teal-600" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Nearby Places</h2>
              </div>

              <div className="space-y-4">
                {nearbyPlaces.map((place, index) => (
                  <div key={index} className="border-2 border-gray-200 rounded-xl p-6 bg-gradient-to-br from-teal-50 to-cyan-50">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-sm font-semibold text-teal-600">Place {index + 1}</span>
                      <button
                        type="button"
                        onClick={() => setNearbyPlaces(nearbyPlaces.filter((_, i) => i !== index))}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Place Name"
                        value={place.name}
                        onChange={(e) => {
                          const updated = [...nearbyPlaces];
                          updated[index].name = e.target.value;
                          setNearbyPlaces(updated);
                        }}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-200"
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
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-200"
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
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-200"
                      />
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    setNearbyPlaces([...nearbyPlaces, { name: "", distance: "", bestRoute: "" }])
                  }
                  className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-teal-500 hover:text-teal-600 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Plus size={20} />
                  Add Nearby Place
                </button>
              </div>
            </div>
          )}

          {/* Warnings Section */}
          {activeSection === "warnings" && (
            <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertTriangle className="text-red-600" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Warnings & Tips</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Common Mistakes
                  </label>
                  <textarea
                    value={warnings.commonMistakes}
                    onChange={(e) =>
                      setWarnings({ ...warnings, commonMistakes: e.target.value })
                    }
                    rows="3"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200"
                    placeholder="What should people avoid?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Crowd Timing
                  </label>
                  <textarea
                    value={warnings.crowdTiming}
                    onChange={(e) =>
                      setWarnings({ ...warnings, crowdTiming: e.target.value })
                    }
                    rows="3"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200"
                    placeholder="When to avoid crowds / best time to visit"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weather Issues
                  </label>
                  <textarea
                    value={warnings.weatherIssues}
                    onChange={(e) =>
                      setWarnings({ ...warnings, weatherIssues: e.target.value })
                    }
                    rows="3"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200"
                    placeholder="Weather considerations"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hidden Charges / Scams
                  </label>
                  <textarea
                    value={warnings.hiddenCharges}
                    onChange={(e) =>
                      setWarnings({ ...warnings, hiddenCharges: e.target.value })
                    }
                    rows="3"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200"
                    placeholder="What hidden costs to watch out for"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Personal Experience Section */}
          {activeSection === "experience" && (
            <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-pink-100 rounded-lg">
                  <Heart className="text-pink-600" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">My Personal Experience</h2>
              </div>

              <div>
                <textarea
                  value={personalExperience}
                  onChange={(e) => setPersonalExperience(e.target.value)}
                  rows="8"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all duration-200"
                  placeholder="Share your story, memorable moments, and personal insights..."
                />
                <p className="text-sm text-gray-500 mt-3 flex items-center gap-2">
                  <Users size={16} />
                  This helps others understand your unique perspective
                </p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
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