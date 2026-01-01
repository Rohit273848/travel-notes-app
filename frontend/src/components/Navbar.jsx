import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MapPin,
  Home,
  Plus,
  Search,
  Menu,
  X,
  LogIn,
  UserPlus,
  LogOut,
  BookOpen,
} from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setMobileMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-lg bg-opacity-90">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
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
          <ul className="hidden sm:flex items-center gap-2">
            <li>
              <Link to="/" className="nav-link">
                <Home className="w-4 h-4" /> Home
              </Link>
            </li>

            {token && (
              <li>
                <Link to="/my-notes" className="nav-link">
                  <BookOpen className="w-4 h-4" /> My Notes
                </Link>
              </li>
            )}

            <li>
              <Link to="/add-note" className="nav-link">
                <Plus className="w-4 h-4" /> Add Note
              </Link>
            </li>

            <li>
              <Link to="/search" className="nav-primary">
                <Search className="w-4 h-4" /> Search
              </Link>
            </li>

            {!token ? (
              <>
                <li>
                  <Link to="/login" className="nav-link">
                    <LogIn className="w-4 h-4" /> Login
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="nav-primary">
                    <UserPlus className="w-4 h-4" /> Sign Up
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="text-sm text-gray-600 px-3">
                  Hi, <span className="font-semibold">{user?.name}</span>
                </li>
                <li>
                  <button onClick={handleLogout} className="nav-danger">
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </li>
              </>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 rounded-xl hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-4 pt-4 border-t">
            <ul className="flex flex-col gap-2">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="mobile-link"
              >
                <Home /> Home
              </Link>

              {token && (
                <Link
                  to="/my-notes"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mobile-link"
                >
                  <BookOpen /> My Notes
                </Link>
              )}

              <Link
                to="/add-note"
                onClick={() => setMobileMenuOpen(false)}
                className="mobile-link"
              >
                <Plus /> Add Note
              </Link>

              <Link
                to="/search"
                onClick={() => setMobileMenuOpen(false)}
                className="mobile-primary"
              >
                <Search /> Search
              </Link>

              {!token ? (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="mobile-link"
                  >
                    <LogIn /> Login
                  </Link>

                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="mobile-primary"
                  >
                    <UserPlus /> Sign Up
                  </Link>
                </>
              ) : (
                <button onClick={handleLogout} className="mobile-danger">
                  <LogOut /> Logout
                </button>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
