import { useState } from "react";
import { Search, MapPin, Loader2, Compass, Globe } from "lucide-react";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
  

    try {
      setLoading(true);
      setHasSearched(true);
      const res = await fetch(
        `http://localhost:5000/api/notes/search?place=${query}`
      );
      const data = await res.json();
      if (Array.isArray(data)) {
        setResults(data);
      } else {
        setResults([]);
      }
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
        <div className="max-w-3xl mx-auto mb-12">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-3">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Search by place name (e.g., Paris, Tokyo, Bali)"
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
                <Compass className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              <button
                onClick={handleSearch}
                disabled={loading || !query.trim()}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="hidden sm:inline">Searching</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span className="hidden sm:inline">Search</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
            <p className="text-lg text-gray-600 font-medium">Searching for {query}...</p>
          </div>
        )}

        {/* Empty State - Before Search */}
        {!loading && !hasSearched && (
          <div className="max-w-2xl mx-auto text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Globe className="w-10 h-10 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Start Your Search</h3>
            <p className="text-gray-600 mb-8">
              Enter a destination to discover travel notes, tips, and experiences shared by fellow travelers
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Paris', 'Tokyo', 'Bali', 'New York', 'London'].map((place) => (
                <button
                  key={place}
                  onClick={() => {
                    setQuery(place);
                    setTimeout(() => {
                      handleSearch(event);
                    }, 100);
                  }}
                  className="px-4 py-2 bg-white border-2 border-gray-200 rounded-xl text-gray-700 font-medium hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-200"
                >
                  {place}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* No Results State */}
        {!loading && hasSearched && results.length === 0 && (
          <div className="max-w-2xl mx-auto text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No Results Found</h3>
            <p className="text-gray-600 mb-8">
              We couldn't find any travel notes for "{query}". Try searching for a different destination or be the first to add notes!
            </p>
            <button
              onClick={() => {
                setQuery("");
                setHasSearched(false);
              }}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
            >
              Try Another Search
            </button>
          </div>
        )}

        {/* Results Grid */}
        {!loading && results.length > 0 && (
          <>
            <div className="max-w-6xl mx-auto mb-6">
              <p className="text-gray-600 text-center">
                Found <span className="font-semibold text-gray-900">{results.length}</span> {results.length === 1 ? 'result' : 'results'} for "{query}"
              </p>
            </div>
            <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {results.map((note, index) => (
                <div
                  key={note._id || index}
                  className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl font-bold text-gray-900 truncate group-hover:text-indigo-600 transition-colors duration-200">
                        {note.placeName}
                      </h2>
                      {note.visibility && (
                        <span className={`inline-block text-xs px-2 py-1 rounded-full mt-1 ${
                          note.visibility === 'public' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {note.visibility}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line line-clamp-6">
                    {note.noteText || note.details}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;