
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Bell, Users, Camera } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative bg-nature-900 overflow-hidden isolate">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.nature.100),theme(colors.nature.900))] opacity-20" />
                <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-nature-600/10 ring-1 ring-nature-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
                
                <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-20 pb-24 sm:pb-32 lg:flex lg:py-40 lg:items-center">
                    <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
                        <h1 className="mt-16 sm:mt-24 lg:mt-12 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                            AI Driven Wildlife Detection <br />
                            <span className="text-nature-600">& Real Time Alerting System</span>
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Advanced AI-powered monitoring designed to instantly detect wild animals like leopards and bears, ensuring campus safety through real-time alerts.
                        </p>
                        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-x-6">
                            <Link
                                to="/login"
                                className="w-full sm:w-auto text-center rounded-md bg-nature-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-nature-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nature-600 transition-all"
                            >
                                Member Login
                            </Link>
                            <Link to="/dashboard" className="w-full sm:w-auto text-center justify-center text-sm font-semibold leading-6 text-gray-900 flex items-center gap-1 group py-2.5">
                                View Live Dashboard <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">→</span>
                            </Link>
                        </div>
                    </div>
                    
                    {/* Hero Image / Graphic */}
                    <div className="mx-auto mt-16 flex w-full max-w-2xl sm:mt-24 lg:ml-10 lg:mt-0 lg:mr-0 lg:max-w-none xl:ml-32 px-4 sm:px-0">
                        <div className="w-full sm:max-w-5xl lg:max-w-none">
                            <div className="rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                                <img
                                    src="/images/hero-leopard.jpg"
                                    alt="Leopard Detection"
                                    className="w-full h-auto object-cover rounded-md shadow-2xl ring-1 ring-gray-900/10 opacity-90"
                                    onError={(e) => {
                                        e.target.onerror = null; 
                                        e.target.src = "https://placehold.co/1920x1080?text=Leopard+Image+Not+Found";
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feature Grid */}
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32 bg-gray-50">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-nature-600">Faster Detection</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Everything you need to ensure campus safety
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Our system utilizes state-of-the-art computer vision to identify potential threats and notify security personnel and students immediately.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                        <div className="relative pl-16">
                            <dt className="text-base font-semibold leading-7 text-gray-900">
                                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-nature-600">
                                    <Camera className="h-6 w-6 text-white" aria-hidden="true" />
                                </div>
                                AI Camera Monitoring
                            </dt>
                            <dd className="mt-2 text-base leading-7 text-gray-600">
                                Continuous monitoring of campus perimeters using advanced object detection models trained to identify wild animals.
                            </dd>
                        </div>
                        <div className="relative pl-16">
                            <dt className="text-base font-semibold leading-7 text-gray-900">
                                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-nature-600">
                                    <Bell className="h-6 w-6 text-white" aria-hidden="true" />
                                </div>
                                Instant Alerts
                            </dt>
                            <dd className="mt-2 text-base leading-7 text-gray-600">
                                Real-time notifications sent to student's mobile devices and dashboards the moment a threat is detected.
                            </dd>
                        </div>
                        <div className="relative pl-16">
                            <dt className="text-base font-semibold leading-7 text-gray-900">
                                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-nature-600">
                                    <Shield className="h-6 w-6 text-white" aria-hidden="true" />
                                </div>
                                Automated Security
                            </dt>
                            <dd className="mt-2 text-base leading-7 text-gray-600">
                                Reduces human error and ensures 24/7 surveillance of critical entry points and secluded areas.
                            </dd>
                        </div>
                        <div className="relative pl-16">
                            <dt className="text-base font-semibold leading-7 text-gray-900">
                                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-nature-600">
                                    <Users className="h-6 w-6 text-white" aria-hidden="true" />
                                </div>
                                Community Reporting
                            </dt>
                            <dd className="mt-2 text-base leading-7 text-gray-600">
                                Enables students and staff to manually report sightings, creating a collaborative safety network.
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
