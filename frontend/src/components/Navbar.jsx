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
  User,
  Sparkles,
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
    <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-11 h-11 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col items-start">
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Travel Notes
              </h2>
              <div className="flex items-center gap-1 -mt-0.5">
                <Sparkles className="w-3 h-3 text-indigo-500" />
                <span className="text-xs text-gray-500 font-medium">AI Powered</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-1">
            <li>
              <Link to="/" className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-indigo-700 transition-all duration-200 group">
                <Home className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                Home
              </Link>
            </li>

            {token && (
              <li>
                <Link to="/my-notes" className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-indigo-700 transition-all duration-200 group">
                  <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  My Notes
                </Link>
              </li>
            )}

            <li>
              <Link to="/add-note" className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-indigo-700 transition-all duration-200 group">
                <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
                Add Note
              </Link>
            </li>

            <li>
              <Link to="/search" className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-200 group">
                <Search className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                Search
              </Link>
            </li>

            {/* Divider */}
            <li className="h-8 w-px bg-gray-200 mx-2"></li>

            {!token ? (
              <>
                <li>
                  <Link to="/login" className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-gray-700 hover:bg-gray-100 transition-all duration-200">
                    <LogIn className="w-4 h-4" />
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md hover:shadow-lg transition-all duration-200">
                    <UserPlus className="w-4 h-4" />
                    Sign Up
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-indigo-200">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-xs text-gray-500 font-medium leading-none">Welcome</span>
                      <span className="text-sm font-bold text-gray-900 leading-tight">{user?.name}</span>
                    </div>
                  </div>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-red-700 hover:bg-red-50 transition-all duration-200 group"
                  >
                    <LogOut className="w-4 h-4 group-hover:-rotate-12 transition-transform duration-200" />
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl hover:bg-gray-100 transition-colors duration-200"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4">

            {/* User Info Mobile */}
            {token && user && (
              <div className="mb-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-indigo-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 font-medium">Logged in as</span>
                    <span className="text-lg font-bold text-gray-900">{user.name}</span>
                  </div>
                </div>
              </div>
            )}

            <ul className="flex flex-col gap-2">
              <li>
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-indigo-700 transition-all duration-200">
                  <Home className="w-5 h-5" />
                  Home
                </Link>
              </li>

              {token && (
                <li>
                  <Link to="/my-notes" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-indigo-700 transition-all duration-200">
                    <BookOpen className="w-5 h-5" />
                    My Notes
                  </Link>
                </li>
              )}

              <li>
                <Link to="/add-note" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-indigo-700 transition-all duration-200">
                  <Plus className="w-5 h-5" />
                  Add Note
                </Link>
              </li>

              <li>
                <Link
                  to="/search"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <Search className="w-5 h-5" />
                  Search
                </Link>
              </li>


              <li className="h-px bg-gray-200 my-2"></li>

              {!token ? (
                <>
                  <li>
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium text-gray-700 hover:bg-gray-100 transition-all duration-200">
                      <LogIn className="w-5 h-5" />
                      Login
                    </Link>
                  </li>

                  <li>
                    <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md hover:shadow-lg transition-all duration-200">
                      <UserPlus className="w-5 h-5" />
                      Sign Up
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium text-red-700 hover:bg-red-50 transition-all duration-200"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;