import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";

const MyNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    const fetchMyNotes = async () => {
      try {
        const res = await fetch(
          "https://travel-notes-app.onrender.com/api/notes/my-notes",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setNotes(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setNotes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMyNotes();
  }, [navigate]);

  if (loading) {
    return <p className="p-6 text-center">Loading your notes...</p>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">My Notes</h1>

      {notes.length === 0 ? (
        <p className="text-gray-600">You haven’t added any notes yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-white p-6 rounded-xl shadow border"
            >
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <h2 className="font-bold text-lg">{note.placeName}</h2>
              </div>
              <p className="text-gray-700 whitespace-pre-line">
                {note.noteText}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyNotes;
