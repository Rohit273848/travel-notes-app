import { useEffect, useState } from "react";
import { MapPin, Edit3, Trash2, Loader2, FileText, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MyNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      setLoading(false);
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

  const handleEdit = (note) => {
    navigate(`/edit-note/${note._id}`, { state: note });
  };

  const handleDelete = async (noteId) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `https://travel-notes-app.onrender.com/api/notes/${noteId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        alert("Failed to delete note");
        return;
      }

      setNotes((prev) => prev.filter((note) => note._id !== noteId));
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <FileText className="text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">My Notes</h1>
              <p className="text-gray-600 ml-1">
                {notes.length} {notes.length === 1 ? "note" : "notes"} saved
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/add-note")}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl"
          >
            <Plus />
            Add Note
          </button>
        </div>

        {/* Empty State */}
        {notes.length === 0 ? (
          <div className="text-center py-20">
            <FileText className="w-16 h-16 mx-auto text-indigo-500 mb-4" />
            <h3 className="text-2xl font-bold mb-2">No Notes Yet</h3>
            <button
              onClick={() => navigate("/add-note")}
              className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-xl"
            >
              Create Your First Note
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <div key={note._id} className="bg-white rounded-2xl shadow">
                <div className="bg-indigo-600 p-4 flex items-center gap-2 text-white">
                  <MapPin />
                  <h2 className="font-bold truncate">{note.placeName}</h2>
                </div>

                <div className="p-6">
                  <p className="text-gray-700 line-clamp-5 mb-4">
                    {note.noteText}
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(note)}
                      className="flex-1 bg-blue-100 text-blue-700 py-2 rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(note._id)}
                      className="flex-1 bg-red-100 text-red-700 py-2 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default MyNotes;
