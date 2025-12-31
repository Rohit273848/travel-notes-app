import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddNote from "./pages/AddNote";
import PublicNotes from "./pages/PublicNotes";
import Home from "./pages/Home";
import SearchPage from "./pages/Search";


function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-note" element={<AddNote />} />
        <Route path="/public-notes" element={<PublicNotes />} />
        <Route path="/search" element={<SearchPage />} />

      </Routes>
    </>
  );
}

export default App;
