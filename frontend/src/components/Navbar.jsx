import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Home, Plus, Search, Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-lg bg-opacity-90">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          
          {/* Logo → Home */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col items-start">
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Travel Notes
              </h2>
              <span className="text-xs text-gray-500 font-medium -mt-1">
                AI Powered
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden sm:flex items-center gap-2 list-none m-0 p-0">
            <li>
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-all duration-200"
              >
                <Home className="w-4 h-4" />
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/add-note"
                className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-all duration-200"
              >
                <Plus className="w-4 h-4" />
                Add Note
              </Link>
            </li>

            <li>
              <Link
                to="/search"
                className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Search className="w-4 h-4" />
                Search
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <ul className="flex flex-col gap-2 list-none m-0 p-0">
              <li>
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-all duration-200"
                >
                  <Home className="w-5 h-5" />
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/add-note"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-all duration-200"
                >
                  <Plus className="w-5 h-5" />
                  Add Note
                </Link>
              </li>

              <li>
                <Link
                  to="/search"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <Search className="w-5 h-5" />
                  Search
                </Link>
              </li>
              <li>
              <Link to="/public-notes">Public Notes</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
