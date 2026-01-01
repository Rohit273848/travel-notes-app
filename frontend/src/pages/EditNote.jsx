import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const EditNote = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [noteText, setNoteText] = useState(state?.noteText || "");
  const [loading, setLoading] = useState(false);

  if (!state) {
    return (
      <p className="p-6 text-center text-red-600">
        No note data found. Please go back.
      </p>
    );
  }

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      setLoading(true);

      const res = await fetch(
        `https://travel-notes-app.onrender.com/api/notes/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ noteText }),
        }
      );

      if (!res.ok) {
        alert("Failed to update note");
        return;
      }

      navigate("/my-notes");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Edit Note</h1>

      <textarea
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        className="w-full h-40 p-4 border rounded-lg"
      />

      <div className="mt-4 flex gap-3">
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>

        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-gray-300 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditNote;
