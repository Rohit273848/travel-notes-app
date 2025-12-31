import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

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
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading public notes...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-10">
        🌍 Public Travel Notes
      </h1>

      {notes.length === 0 ? (
        <p className="text-center text-gray-500">
          No public notes available yet.
        </p>
      ) : (
        <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2">
          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="text-indigo-600" />
                <h2 className="text-xl font-semibold">
                  {note.placeName}
                </h2>
              </div>

              <p className="text-gray-700 whitespace-pre-line">
                {note.noteText}
              </p>

              <p className="text-xs text-gray-400 mt-4">
                {new Date(note.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PublicNotes;
