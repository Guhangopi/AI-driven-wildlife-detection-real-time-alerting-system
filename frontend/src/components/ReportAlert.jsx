import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, FileText, Send } from 'lucide-react';

const ReportAlert = () => {
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [species, setSpecies] = useState('Leopard');
    const [distance, setDistance] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');

        try {
            const response = await fetch('http://localhost:5000/api/iot/alert', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    location,
                    description,
                    species,
                    distance: parseFloat(distance) || 0,
                    image_url: "https://images.unsplash.com/photo-1546182990-dced71875059?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                })
            });

            if (response.ok) {
                navigate('/dashboard');
            } else {
                setErrorMsg("Failed to report alert. Please try again.");
            }
        } catch (error) {
            console.error("Error reporting alert:", error);
            setErrorMsg("Error connecting to the alert network. Ensure backend is online.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:px-6 lg:px-8 bg-gray-50">
             <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                 <div className="absolute top-[10%] left-[20%] w-[50vh] h-[50vh] rounded-full bg-red-100/40 blur-3xl opacity-60" />
             </div>

            <div className="max-w-lg w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl border border-gray-100 z-10 relative">
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                        <MapPin className="h-8 w-8 text-red-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                        Report an Incident
                    </h2>
                    <p className="mt-3 text-gray-600">
                        Help keep the campus safe. Your report will be instantly shared with the community.
                    </p>
                </div>

                {errorMsg && (
                    <div className="mt-4 p-3 animate-in fade-in slide-in-from-top-2 rounded-xl bg-red-50 border border-red-200 text-sm font-medium text-red-600 text-center shadow-sm">
                        {errorMsg}
                    </div>
                )}

                <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-5">
                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <MapPin className="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                                </div>
                                <input
                                    id="location"
                                    name="location"
                                    type="text"
                                    required
                                    className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all shadow-sm"
                                    placeholder="e.g., Near Library or North Gate"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="species" className="block text-sm font-medium text-gray-700 mb-1">Species Detected</label>
                                <select
                                    id="species"
                                    name="species"
                                    className="block w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all shadow-sm appearance-none"
                                    value={species}
                                    onChange={(e) => setSpecies(e.target.value)}
                                >
                                    <option value="Leopard">Leopard</option>
                                    <option value="Elephant">Elephant</option>
                                    <option value="Sloth Bear">Sloth Bear</option>
                                    <option value="Wild Boar">Wild Boar</option>
                                    <option value="Other">Other Wildlife</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="distance" className="block text-sm font-medium text-gray-700 mb-1">Distance (meters)</label>
                                <input
                                    id="distance"
                                    name="distance"
                                    type="number"
                                    className="block w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all shadow-sm"
                                    placeholder="e.g., 50"
                                    value={distance}
                                    onChange={(e) => setDistance(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Incident Details</label>
                            <div className="relative group">
                                <div className="absolute top-3.5 left-4 pointer-events-none">
                                    <FileText className="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                                </div>
                                <textarea
                                    id="description"
                                    name="description"
                                    required
                                    rows="4"
                                    className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all shadow-sm resize-none"
                                    placeholder="Describe the animal or incident..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-red-600/30 transform hover:-translate-y-0.5"
                    >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-4">
                            <Send className="h-5 w-5 text-white/90 group-hover:text-white transition-colors" />
                        </span>
                        {loading ? 'Submitting Report...' : 'Submit Report'}
                    </button>
                    
                    <div className="text-center">
                         <button type="button" onClick={() => navigate('/')} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                             Cancel and return home
                         </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReportAlert;
