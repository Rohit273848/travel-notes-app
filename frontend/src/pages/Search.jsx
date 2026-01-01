import { useState, useEffect } from "react";
import { Search, MapPin, Compass } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // ✅ AI states
  const [summary, setSummary] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  // ✅ AI summary
  const generateSummary = async () => {
    if (!query.trim()) {
      alert("Please enter a place name first");
      return;
    }

    try {
      setAiLoading(true);
      setSummary("");

      const res = await fetch(
        "https://travel-notes-app.onrender.com/api/notes/ai-summary",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ place: query }),
        }
      );

      const data = await res.json();
      setSummary(data.summary || "No summary available");
    } catch (err) {
      console.error(err);
      alert("AI summary failed");
    } finally {
      setAiLoading(false);
    }
  };

  // ✅ Search function (NO event dependency)
  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      setHasSearched(true);

      const res = await fetch(
        `https://travel-notes-app.onrender.com/api/notes/search?place=${encodeURIComponent(
          query
        )}`
      );

      const data = await res.json();
      setResults(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Auto search when coming from Home page
  useEffect(() => {
    const placeFromURL = searchParams.get("place");

    if (placeFromURL) {
      setQuery(placeFromURL);
    }
  }, [searchParams]);

  useEffect(() => {
    if (query) {
      handleSearch();
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl items-center justify-center mb-4">
            <Search className="text-white w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold">Search Travel Notes</h1>
          <p className="text-gray-600">
            Discover insights shared by travelers
          </p>
        </div>

        {/* Search box */}
        <div className="max-w-3xl mx-auto mb-6">
          <div className="bg-white p-3 rounded-3xl shadow">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by place name"
                  className="w-full px-6 py-4 rounded-2xl border-2 bg-gray-50"
                />
                <Compass className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

              <button
                onClick={handleSearch}
                disabled={loading || !query.trim()}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl"
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </div>
          </div>
        </div>

        {/* AI Summary Button */}
        <div className="text-center mb-8">
          <button
            onClick={generateSummary}
            disabled={!query.trim() || aiLoading}
            className="px-6 py-3 bg-purple-600 text-white rounded-xl"
          >
            {aiLoading ? "Generating..." : "✨ Generate AI Summary"}
          </button>
        </div>

        {/* AI Summary Output */}
        {summary && (
          <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow mb-10">
            <h2 className="text-xl font-semibold mb-2">🤖 AI Summary</h2>
            <p className="text-gray-700 whitespace-pre-line">{summary}</p>
          </div>
        )}

        {/* Results */}
        {!loading && results.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {results.map((note, index) => (
              <div
                key={note._id || index}
                className="bg-white p-6 rounded-2xl shadow"
              >
                <h2 className="text-xl font-bold flex gap-2 items-center">
                  <MapPin className="text-indigo-600" />
                  {note.placeName}
                </h2>
                <p className="mt-2 text-gray-700">
                  {note.noteText || note.details}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
