import { useState } from "react";
import { Search, MapPin, Loader2, Compass, Globe } from "lucide-react";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // ✅ AI STATES (REQUIRED)
  const [summary, setSummary] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  // ✅ AI FUNCTION (INSIDE COMPONENT)
  const generateSummary = async () => {
    if (!query.trim()) {
      alert("Please enter a place name first");
      return;
    }

    try {
      setAiLoading(true);
      setSummary("");

      const res = await fetch(
        "http://travel-notes-app.onrender.com/api/notes/ai-summary",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ place: query }),
        }
      );

      const data = await res.json();
      setSummary(data.summary);
    } catch (error) {
      console.error(error);
      alert("AI summary failed");
    } finally {
      setAiLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setLoading(true);
      setHasSearched(true);
      const res = await fetch(
        `http://travel-notes-app.onrender.com/api/notes/search?place=${query}`
      );
      const data = await res.json();
      setResults(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg mb-4">
            <Search className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Search Travel Notes
          </h1>
          <p className="text-lg text-gray-600">
            Discover insights and experiences from travelers around the world
          </p>
        </div>

        {/* Search Box */}
        <div className="max-w-3xl mx-auto mb-6">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-3">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
                  placeholder="Search by place name"
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl"
                />
                <Compass className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>

              <button
                onClick={handleSearch}
                disabled={loading || !query.trim()}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold"
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </div>
          </div>
        </div>

        {/* ✅ AI SUMMARY BUTTON (NOW VISIBLE) */}
        <div className="max-w-3xl mx-auto mb-8 text-center">
          <button
            onClick={generateSummary}
            disabled={!query.trim() || aiLoading}
            className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold shadow-lg hover:bg-purple-700 disabled:opacity-50"
          >
            {aiLoading ? "Generating AI Summary..." : "✨ Generate AI Summary"}
          </button>
        </div>

        {/* ✅ AI SUMMARY OUTPUT */}
        {summary && (
          <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow mb-10">
            <h2 className="text-xl font-semibold mb-2">🤖 AI Summary</h2>
            <p className="text-gray-700 whitespace-pre-line">{summary}</p>
          </div>
        )}

        {/* Results */}
        {!loading && results.length > 0 && (
          <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {results.map((note, index) => (
              <div
                key={note._id || index}
                className="bg-white p-6 rounded-2xl shadow"
              >
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <MapPin className="text-indigo-600" />
                  {note.placeName}
                </h2>
                <p className="text-gray-700 mt-2">
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
