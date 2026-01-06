import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  MapPin,
  Train,
  Home,
  Utensils,
  Compass,
  AlertTriangle,
  Star,
} from "lucide-react";

const NoteDetails = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await fetch(
          `https://travel-notes-app.onrender.com/api/notes/${id}`
        );
        const data = await res.json();
        setNote(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!note) return <p className="p-6">Note not found</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-xl">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <MapPin /> {note.basicInfo.place.name}
        </h1>
        <p className="mt-2 flex items-center gap-2">
          <Star /> Rating: {note.basicInfo.rating}/5 · {note.basicInfo.visitType}
        </p>
      </div>

      {/* Travel Details */}
      <Section title="Travel Details" icon={<Train />}>
        <Detail label="Mode" value={note.travelDetails.mode} />
        <Detail label="From" value={note.travelDetails.from} />
        <Detail label="To" value={note.travelDetails.to} />
        <Detail label="Duration" value={note.travelDetails.duration} />
        <Detail label="Cost" value={`₹${note.travelDetails.approxCost}`} />
      </Section>

      {/* Stay Details */}
      <Section title="Stay Details" icon={<Home />}>
        <Detail label="Hotel" value={note.stayDetails.hotelName} />
        <Detail label="Price" value={note.stayDetails.priceRange} />
        <Detail label="Booking" value={note.stayDetails.bookingType} />
        <Detail
          label="Cleanliness"
          value={`${note.stayDetails.cleanlinessRating}/5`}
        />
        <Detail
          label="Location Advantage"
          value={note.stayDetails.locationAdvantage}
        />
      </Section>

      {/* Food */}
      <Section title="Food & Experience" icon={<Utensils />}>
        <Detail
          label="Must Try"
          value={note.foodDetails.mustTryFood.join(", ")}
        />
        <Detail label="Best Time" value={note.foodDetails.bestTimeToEat} />
        <Detail
          label="Special Dish"
          value={note.foodDetails.localSpecialDish}
        />
      </Section>

      {/* Nearby */}
      <Section title="Nearby Places" icon={<Compass />}>
        {note.nearbyPlaces.map((p, i) => (
          <p key={i}>
            • {p.name} — {p.distance} ({p.bestRoute})
          </p>
        ))}
      </Section>

      {/* Warnings */}
      <Section title="Warnings & Tips" icon={<AlertTriangle />}>
        <p>{note.warnings.commonMistakes}</p>
        <p>{note.warnings.crowdTiming}</p>
        <p>{note.warnings.weatherIssues}</p>
        <p>{note.warnings.hiddenCharges}</p>
      </Section>

      {/* Experience */}
      <Section title="Personal Experience">
        <p className="whitespace-pre-line">{note.personalExperience}</p>
      </Section>
    </div>
  );
};

const Section = ({ title, icon, children }) => (
  <div className="bg-white p-6 rounded-xl shadow">
    <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
      {icon} {title}
    </h2>
    {children}
  </div>
);

const Detail = ({ label, value }) =>
  value ? (
    <p>
      <strong>{label}:</strong> {value}
    </p>
  ) : null;

export default NoteDetails;
