import { useEffect, useState } from "react";
import { MapPin, Globe, Calendar, Sparkles } from "lucide-react";

const PublicNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch("https://travel-notes-app.onrender.com/api/notes/public");
        const data = await res.json();
        if (Array.isArray(data)) {
          setNotes(data);
        } else {
          console.error("Unexpected response:", data);
          setNotes([]);
        }
      } catch (error) {
        console.error("Error fetching notes", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mb-4"></div>
          <p className="text-blue-900 text-lg font-medium">Discovering stories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-blue-200 shadow-sm">
            <Globe className="w-5 h-5 text-blue-500 animate-pulse" />
            <span className="text-blue-900 text-sm font-medium">Community Travel Stories</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-blue-900 mb-4 tracking-tight">
            Explore the <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 bg-clip-text text-transparent">World</span>
          </h1>
          <p className="text-xl text-blue-700 max-w-2xl mx-auto">
            Discover authentic travel experiences shared by adventurers around the globe
          </p>
        </div>

        {/* Notes Grid */}
        {notes.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center bg-white/80 backdrop-blur-md rounded-3xl p-12 border border-blue-200 shadow-lg">
            <Sparkles className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <p className="text-blue-900 text-lg font-medium mb-2">No stories yet</p>
            <p className="text-blue-600">Be the first to share your travel adventure!</p>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {notes.map((note, index) => (
              <div
                key={note._id}
                className="group bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-blue-200 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-200/50 transition-all duration-300 hover:scale-105"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Location Header */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-sky-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-bold text-blue-900 mb-1 truncate">
                      {note.placeName}
                    </h2>
                    <div className="flex items-center gap-1 text-blue-600 text-sm">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(note.createdAt).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}</span>
                    </div>
                  </div>
                </div>

                {/* Note Content */}
                <div className="bg-blue-50/50 rounded-xl p-4 mb-3 border border-blue-100">
                  <p className="text-blue-900 leading-relaxed whitespace-pre-line line-clamp-6">
                    {note.noteText}
                  </p>
                </div>

                {/* Read More Indicator */}
                <div className="flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-blue-600 text-sm font-medium">Read more →</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Stats */}
        {notes.length > 0 && (
          <div className="max-w-7xl mx-auto mt-16 text-center">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-6 py-3 rounded-full border border-blue-200 shadow-sm">
              <Sparkles className="w-5 h-5 text-blue-500" />
              <span className="text-blue-900 font-medium">
                {notes.length} {notes.length === 1 ? 'story' : 'stories'} shared
              </span>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default PublicNotes;