const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";

export const fetchPlaceSuggestions = async (query) => {
  const params = new URLSearchParams({
    q: query,
    format: "json",
    addressdetails: 1,
    limit: 5,
  });

  const res = await fetch(`${NOMINATIM_URL}?${params.toString()}`, {
    headers: {
      "User-Agent": "MyTravelNotesApp/1.0 (student project)",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch location suggestions");
  }

  return res.json();
};
