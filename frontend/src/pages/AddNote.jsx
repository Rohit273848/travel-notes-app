import { useState } from "react";
import { MapPin, FileText, Eye, Lock } from "lucide-react";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PlaceAutocomplete from "../components/PlaceAutocomplete";


const AddNote = () => {
  const [placeName, setPlaceName] = useState("");
  const [details, setDetails] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [place, setPlace] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const noteData = {
      place,
      noteText: details,
      isPublic: visibility === "public",
    };

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("https://travel-notes-app.onrender.com/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 🔥 THIS LINE FIXES IT
        },
        body: JSON.stringify(noteData),
      });


      if (!res.ok) {
        throw new Error("Failed to save note");
      }

      alert("✅ Note saved successfully");

      // Clear form
      setPlaceName("");
      setDetails("");
      setVisibility("public");
    } catch (error) {
      console.error(error);
      alert("❌ Error saving note");
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to add a note");
      navigate("/login");
    }
  }, [navigate]);



  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg mb-4">
            <MapPin className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Add Place Note
          </h1>
          <p className="text-gray-600">
            Capture your travel memories and important details
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Place Name */}
              <div className="group">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <MapPin className="w-4 h-4 text-indigo-500" />
                  Place Name
                </label>
                <PlaceAutocomplete
                  onSelect={(selectedPlace) => {
                    setPlace(selectedPlace);
                    setPlaceName(selectedPlace.name);
                  }}
                />

              </div>

              {/* Details */}
              <div className="group">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <FileText className="w-4 h-4 text-indigo-500" />
                  Details & Notes
                </label>
                <textarea
                  rows="5"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Share your experiences, travel dates, transportation details, hotel recommendations, food tips, must-visit spots..."
                  required
                  className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 resize-none"
                ></textarea>
              </div>

              {/* Visibility */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-4">
                  <Eye className="w-4 h-4 text-indigo-500" />
                  Visibility
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label
                    className={`relative flex items-center justify-center gap-3 px-5 py-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${visibility === "public"
                      ? "border-indigo-500 bg-indigo-50 shadow-sm"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                      }`}
                  >
                    <input
                      type="radio"
                      value="public"
                      checked={visibility === "public"}
                      onChange={() => setVisibility("public")}
                      className="sr-only"
                    />
                    <Eye
                      className={`w-5 h-5 ${visibility === "public"
                        ? "text-indigo-600"
                        : "text-gray-400"
                        }`}
                    />
                    <span
                      className={`font-medium ${visibility === "public"
                        ? "text-indigo-900"
                        : "text-gray-700"
                        }`}
                    >
                      Public
                    </span>
                    {visibility === "public" && (
                      <div className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full"></div>
                    )}
                  </label>

                  <label
                    className={`relative flex items-center justify-center gap-3 px-5 py-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${visibility === "personal"
                      ? "border-indigo-500 bg-indigo-50 shadow-sm"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                      }`}
                  >
                    <input
                      type="radio"
                      value="personal"
                      checked={visibility === "personal"}
                      onChange={() => setVisibility("personal")}
                      className="sr-only"
                    />
                    <Lock
                      className={`w-5 h-5 ${visibility === "personal"
                        ? "text-indigo-600"
                        : "text-gray-400"
                        }`}
                    />
                    <span
                      className={`font-medium ${visibility === "personal"
                        ? "text-indigo-900"
                        : "text-gray-700"
                        }`}
                    >
                      Personal
                    </span>
                    {visibility === "personal" && (
                      <div className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full"></div>
                    )}
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-purple-700 transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-300"
              >
                Save Note
              </button>
            </form>
          </div>

          {/* Bottom Accent */}
          <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
        </div>

        {/* Footer Text */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Your notes are saved securely and can be accessed anytime
        </p>
      </div>
    </div>
  );
};

export default AddNote; 