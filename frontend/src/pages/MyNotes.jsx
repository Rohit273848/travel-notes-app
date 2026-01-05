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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmDelete) return;

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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-lg text-gray-600 font-medium">Loading your notes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">

        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                  My Notes
                </h1>
              </div>
              <p className="text-gray-600 ml-15">
                {notes.length} {notes.length === 1 ? 'note' : 'notes'} saved
              </p>
            </div>

            <button
              onClick={() => navigate("/add-note")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <Plus className="w-5 h-5" />
              Add New Note
            </button>
          </div>
        </div>

        {/* Empty State */}
        {notes.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-12 h-12 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No Notes Yet</h3>
            <p className="text-gray-600 mb-8 text-lg">
              Start documenting your travel experiences and memories
            </p>
            <button
              onClick={() => navigate("/add-note")}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <Plus className="w-5 h-5" />
              Create Your First Note
            </button>

          </div>
        ) : (
          /* Notes Grid */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <div
                key={note._id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="font-bold text-xl text-white truncate flex-1">
                      {note.basicInfo?.place?.name || "Unknown Place"}
                    </h2>

                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">
                    📍 {note.basicInfo?.place?.city}
                    {note.basicInfo?.place?.state ? `, ${note.basicInfo.place.state}` : ""}
                    {note.basicInfo?.place?.country ? `, ${note.basicInfo.place.country}` : ""}
                  </p>

                  <p className="text-gray-700 leading-relaxed whitespace-pre-line line-clamp-5 mb-4">
                    {note.noteText || "No additional notes provided."}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-medium">
                      {note.basicInfo?.visitType}
                    </span>

                    <span>⭐ {note.basicInfo?.rating || 0}/5</span>
                  </div>


                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(note)}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100 transition-all duration-200 group/edit"
                    >
                      <Edit3 className="w-4 h-4 group-hover/edit:rotate-12 transition-transform duration-200" />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(note._id)}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 text-red-700 font-semibold hover:bg-red-100 transition-all duration-200 group/delete"
                    >
                      <Trash2 className="w-4 h-4 group-hover/delete:scale-110 transition-transform duration-200" />
                      Delete
                    </button>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyNotes;