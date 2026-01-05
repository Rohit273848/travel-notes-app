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
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-3xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Add Travel Note</h2>
        <p className="mt-2 text-sm text-gray-600">Capture your journey and help others explore better.</p>
      </div>
  
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* 🔹 SECTION 1: BASIC INFO */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-6 border-b pb-4">
            <span className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">📍</span>
            <h3 className="text-lg font-semibold text-gray-800">Basic Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Place Name</label>
              <PlaceAutocomplete
                onSelect={(place) => setBasicInfo((prev) => ({ ...prev, place }))}
                className="w-full transition-all focus:ring-2 focus:ring-indigo-500"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Visit Type</label>
              <select
                value={basicInfo.visitType}
                onChange={(e) => setBasicInfo({ ...basicInfo, visitType: e.target.value })}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="visited">✅ Visited</option>
                <option value="planning">📅 Planning</option>
                <option value="wishlist">⭐ Wishlist</option>
              </select>
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Visibility</label>
              <select
                value={basicInfo.visibility}
                onChange={(e) => setBasicInfo({ ...basicInfo, visibility: e.target.value })}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5"
              >
                <option value="public">🌍 Public</option>
                <option value="personal">🔒 Personal</option>
              </select>
            </div>
  
            <div className="md:col-span-2">
               <label className="block text-sm font-medium text-gray-700 mb-1">Overall Rating (1–5)</label>
               <input
                  type="range" min="1" max="5" step="1"
                  value={basicInfo.rating}
                  onChange={(e) => setBasicInfo({...basicInfo, rating: Number(e.target.value)})}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
               />
               <div className="flex justify-between text-xs text-gray-500 px-1 mt-1">
                  <span>1 Star</span><span>5 Stars</span>
               </div>
            </div>
          </div>
        </div>
  
        {/* 🔹 SECTION 2: TRAVEL & STAY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Travel Details Card */}
          <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-6">
            <h3 className="text-md font-bold mb-4 flex items-center">
              <span className="mr-2">🚀</span> Travel Details
            </h3>
            <div className="space-y-3">
              <select
                value={travelDetails.mode}
                onChange={(e) => setTravelDetails({ ...travelDetails, mode: e.target.value })}
                className="w-full border-gray-300 rounded-md text-sm"
              >
                <option value="">Mode of Travel</option>
                <option value="train">Train</option>
                <option value="flight">Flight</option>
                <option value="car">Car</option>
              </select>
              <input 
                type="text" placeholder="From" 
                className="w-full border-gray-300 rounded-md text-sm"
                value={travelDetails.from} 
                onChange={(e) => setTravelDetails({...travelDetails, from: e.target.value})}
              />
              <input 
                type="text" placeholder="To" 
                className="w-full border-gray-300 rounded-md text-sm"
                value={travelDetails.to} 
                onChange={(e) => setTravelDetails({...travelDetails, to: e.target.value})}
              />
            </div>
          </div>
  
          {/* Stay Details Card */}
          <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-6">
            <h3 className="text-md font-bold mb-4 flex items-center">
              <span className="mr-2">🏨</span> Stay Details
            </h3>
            <div className="space-y-3">
              <input 
                placeholder="Hotel Name" 
                className="w-full border-gray-300 rounded-md text-sm"
                value={stayDetails.hotelName}
                onChange={(e) => setStayDetails({...stayDetails, hotelName: e.target.value})}
              />
              <div className="flex space-x-2">
                  <input 
                    placeholder="Price Range" 
                    className="w-1/2 border-gray-300 rounded-md text-sm"
                    value={stayDetails.priceRange}
                    onChange={(e) => setStayDetails({...stayDetails, priceRange: e.target.value})}
                  />
                  <select className="w-1/2 border-gray-300 rounded-md text-sm">
                      <option>Online</option>
                      <option>Offline</option>
                  </select>
              </div>
            </div>
          </div>
        </div>
  
        {/* 🔹 SECTION 3: FOOD & EXPERIENCE */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center text-orange-600">
             <span className="mr-2">🍲</span> Food & Local Vibes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <textarea
                  placeholder="Must-try food (comma separated)"
                  className="w-full border-gray-300 rounded-md p-2 text-sm md:col-span-2"
                  rows="2"
                  value={foodDetails.mustTryFood.join(", ")}
                  onChange={(e) => setFoodDetails({...foodDetails, mustTryFood: e.target.value.split(",")})}
              />
              <input placeholder="Price Range" className="border-gray-300 rounded-md text-sm p-2" />
              <input placeholder="Best time to visit" className="border-gray-300 rounded-md text-sm p-2" />
          </div>
        </div>
  
        {/* 🔹 SECTION 4: WARNINGS (UI CALLOUT) */}
        <div className="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-6">
          <h3 className="text-red-700 font-bold mb-4 flex items-center">
            <span className="mr-2">⚠️</span> Pro-Tips & Warnings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <textarea 
              placeholder="Common scams/mistakes..." 
              className="w-full border-red-200 rounded-md text-sm focus:ring-red-500"
              value={warnings.commonMistakes}
              onChange={(e) => setWarnings({...warnings, commonMistakes: e.target.value})}
            />
            <textarea 
              placeholder="Weather/Crowd tips..." 
              className="w-full border-red-200 rounded-md text-sm focus:ring-red-500"
              value={warnings.crowdTiming}
              onChange={(e) => setWarnings({...warnings, crowdTiming: e.target.value})}
            />
          </div>
        </div>
  
        {/* 🔹 SUBMIT BUTTON */}
        <div className="pt-6">
          <button
            type="submit"
            className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:-translate-y-1"
          >
            🚀 Save My Journey
          </button>
        </div>
  
      </form>
    </div>
  </div>
  );
};

export default AddNote;