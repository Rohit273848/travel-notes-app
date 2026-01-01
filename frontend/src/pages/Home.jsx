import { MapPin, Search, BookOpen, Globe, Lock, Sparkles, TrendingUp, ThumbsUp, User, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


const Home = () => {
    const [latestNotes, setLatestNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLatestNotes = async () => {
            try {
                const res = await fetch(
                    "https://travel-notes-app.onrender.com/api/notes/public"
                );
                const data = await res.json();

                setLatestNotes(Array.isArray(data) ? data.slice(0, 6) : []);
            } catch (error) {
                console.error("Home fetch error:", error);
                setLatestNotes([]);
            } finally {
                setLoading(false);
            }
        };

        fetchLatestNotes();
    }, []);

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full opacity-10 blur-3xl"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full opacity-10 blur-3xl"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8 shadow-sm">
                        <Sparkles className="w-4 h-4" />
                        AI-Powered Travel Companion
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
                        Your Travel Stories,
                        <br />
                        <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Powered by AI
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
                        Save all your travel details in one place and instantly find
                        useful information about any location using smart search.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            to="/add-note"
                            className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-1 transition-all duration-200"
                        >
                            <MapPin className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
                            Add Place Note
                        </Link>

                        <Link
                            to="/search"
                            className="group inline-flex items-center justify-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-indigo-300 transform hover:-translate-y-1 transition-all duration-200"
                        >
                            <Search className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                            Search Places
                        </Link>

                    </div>

                    {/* Stats or Trust Indicators */}
                    <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-12 text-center">
                        <div className="flex flex-col items-center">
                            <div className="text-3xl font-bold text-gray-900">Smart</div>
                            <div className="text-sm text-gray-600">AI Search</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="text-3xl font-bold text-gray-900">Secure</div>
                            <div className="text-sm text-gray-600">Your Data</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="text-3xl font-bold text-gray-900">Fast</div>
                            <div className="text-sm text-gray-600">Results</div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Latest Public Places */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
                        Latest Places
                    </h2>

                    {loading && (
                        <p className="text-center text-gray-500">Loading places...</p>
                    )}

                    {!loading && latestNotes.length === 0 && (
                        <p className="text-center text-gray-500">
                            No public places yet. Be the first to add one!
                        </p>
                    )}

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {latestNotes.map((note) => (
                            <Link
                                key={note._id}
                                to={`/search?place=${note.placeName}`}
                                className="group bg-slate-50 p-6 rounded-2xl border hover:shadow-lg transition"
                            >
                                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition">
                                    {note.placeName}
                                </h3>

                                <p className="text-gray-600 mt-2 line-clamp-3">
                                    {note.noteText || note.details}
                                </p>

                                <span className="inline-block mt-4 text-sm text-indigo-600 font-medium">
                                    View details →
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 md:py-28">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Why Choose Us?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Everything you need to manage and discover travel information
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-300 hover:-translate-y-2">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <BookOpen className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-900">
                                Personal Travel Notes
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Store travel dates, transport timings, hotels, food tips,
                                and personal experiences for future reference.
                            </p>
                        </div>

                        <div className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-300 hover:-translate-y-2">
                            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <div className="relative">
                                    <Globe className="w-7 h-7 text-white" />
                                    <Lock className="w-4 h-4 text-white absolute -bottom-1 -right-1" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-900">
                                Public & Private Options
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Keep notes private or share them publicly so others can
                                benefit from your experience.
                            </p>
                        </div>

                        <div className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-300 hover:-translate-y-2">
                            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Sparkles className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-900">
                                Smart AI Search
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Search a place name and get all related notes summarized
                                into clear and useful information.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Future Enhancements Section */}
            <section className="relative py-20 md:py-28 overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 opacity-95"></div>

                {/* Pattern overlay */}
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}></div>

                <div className="relative max-w-5xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-8">
                        <Brain className="w-4 h-4" />
                        Coming Soon
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Future Enhancements
                    </h2>

                    <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
                        This project is designed to scale with more intelligent features
                    </p>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-2xl border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300">
                            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mb-4 mx-auto">
                                <TrendingUp className="w-6 h-6 text-white" />
                            </div>
                            <h4 className="text-white font-semibold mb-2">Trending Places</h4>
                            <p className="text-blue-100 text-sm">Based on user activity</p>
                        </div>

                        <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-2xl border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300">
                            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mb-4 mx-auto">
                                <ThumbsUp className="w-6 h-6 text-white" />
                            </div>
                            <h4 className="text-white font-semibold mb-2">Like & Save</h4>
                            <p className="text-blue-100 text-sm">Public notes interaction</p>
                        </div>

                        <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-2xl border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300">
                            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mb-4 mx-auto">
                                <User className="w-6 h-6 text-white" />
                            </div>
                            <h4 className="text-white font-semibold mb-2">User Profiles</h4>
                            <p className="text-blue-100 text-sm">Login & personalization</p>
                        </div>

                        <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-2xl border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300">
                            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mb-4 mx-auto">
                                <Brain className="w-6 h-6 text-white" />
                            </div>
                            <h4 className="text-white font-semibold mb-2">AI Suggestions</h4>
                            <p className="text-blue-100 text-sm">Advanced recommendations</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        Ready to Start Your Journey?
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Join now and never forget your travel details again
                    </p>
                    <Link
                        to="/add-note"
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-1 transition-all duration-200"
                    >
                        Get Started Free
                        <MapPin className="w-5 h-5" />
                    </Link>

                </div>
            </section>
        </div>
    );
};

export default Home;

// mongodb+srv://rohitmahajan_1845:<db_password>@cluster0.ekar1am.mongodb.net/?appName=Cluster0;