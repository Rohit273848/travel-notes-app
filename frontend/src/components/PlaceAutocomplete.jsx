import { useEffect, useRef, useState } from "react";
import { fetchPlaceSuggestions } from "../utils/locationApi";

const PlaceAutocomplete = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  // Debounced search
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      try {
        setLoading(true);
        const data = await fetchPlaceSuggestions(query);
        setResults(data);
      } catch (err) {
        console.error(err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setResults([]);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelect = (place) => {
    const structuredPlace = {
      name: place.display_name.split(",")[0],
      city: place.address.city || place.address.town || place.address.village || "",
      state: place.address.state || "",
      country: place.address.country || "",
      lat: Number(place.lat),
      lng: Number(place.lon),
      source: "openstreetmap",
    };

    onSelect(structuredPlace);
    setQuery(structuredPlace.name);
    setResults([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setActiveIndex((prev) => Math.min(prev + 1, results.length - 1));
    }
    if (e.key === "ArrowUp") {
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    }
    if (e.key === "Enter" && activeIndex >= 0) {
      handleSelect(results[activeIndex]);
    }
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search place (e.g. Goa, Paris)"
        className="w-full px-4 py-3 border rounded-xl"
      />

      {loading && (
        <div className="absolute z-10 bg-white w-full p-3 text-sm">
          Loading...
        </div>
      )}

      {!loading && results.length === 0 && query.length >= 2 && (
        <div className="absolute z-10 bg-white w-full p-3 text-sm text-gray-500">
          No results found
        </div>
      )}

      {results.length > 0 && (
        <ul className="absolute z-10 bg-white w-full border rounded-xl shadow">
          {results.map((place, index) => (
            <li
              key={place.place_id}
              onClick={() => handleSelect(place)}
              className={`p-3 cursor-pointer hover:bg-gray-100 ${
                index === activeIndex ? "bg-gray-100" : ""
              }`}
            >
              <div className="font-medium">
                {place.display_name.split(",")[0]}
              </div>
              <div className="text-xs text-gray-500">
                {place.address.city || place.address.state || ""},{" "}
                {place.address.country}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlaceAutocomplete;
