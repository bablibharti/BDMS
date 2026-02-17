// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeartbeat, FaTint } from 'react-icons/fa'; // npm install react-icons

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-red-50">

      {/* Optional simple top bar / hero accent */}
      <nav className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center px-6 py-5 md:px-12">
        <div className="flex items-center gap-3">
          <FaTint className="text-white text-4xl drop-shadow-lg" />
          <h1 className="text-3xl font-bold text-white">LifeDrop</h1>
        </div>
        <div className="flex gap-4">
          <Link
            to="/login"
            className="text-white font-medium hover:underline"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-white text-red-600 px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Hero Section - made more emotional & visual */}
      <section className="relative pt-28 pb-40 md:pt-40 md:pb-60 bg-red-600 text-white overflow-hidden">
        {/* Subtle overlay pattern can be added via CSS or SVG later */}
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="flex justify-center mb-6">
            <FaHeartbeat className="text-8xl md:text-9xl text-red-200 opacity-80 animate-pulse-slow" />
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight drop-shadow-lg">
            One Drop<br className="sm:hidden" /> Saves Lives
          </h1>
          
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-95 font-light">
            Be someone's hero today. Connect donors with those in urgent need — fast, reliable, India-wide.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/register"
              className="bg-white text-red-700 hover:bg-red-50 font-bold text-xl px-12 py-6 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Become a Donor
            </Link>
            
            <Link
              to="/login"
              className="border-2 border-white text-white hover:bg-white hover:text-red-700 font-bold text-xl px-12 py-6 rounded-full transition-all duration-300"
            >
              Login / Request Blood
            </Link>
          </div>

          <p className="mt-10 text-lg opacity-90 flex items-center justify-center gap-2">
            <FaTint className="text-red-200" /> Already empowered <span className="font-bold">15,000+</span> successful donations
          </p>
        </div>
      </section>

      {/* Quick Stats - slightly more realistic */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-6xl font-bold text-red-600 mb-3">65,000+</div>
              <p className="text-xl text-gray-700 font-medium">Active Donors</p>
            </div>
            <div>
              <div className="text-6xl font-bold text-red-600 mb-3">24×7</div>
              <p className="text-xl text-gray-700 font-medium">Emergency Matching</p>
            </div>
            <div>
              <div className="text-6xl font-bold text-red-600 mb-3">Mumbai & 15+ Cities</div>
              <p className="text-xl text-gray-700 font-medium">PAN India Reach</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - unchanged but good */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-20 text-gray-800">
            How LifeDrop Saves Lives
          </h2>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Card 1 */}
            <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all text-center border-t-4 border-red-500">
              <div className="w-24 h-24 mx-auto mb-8 bg-red-100 rounded-full flex items-center justify-center text-5xl font-bold text-red-600">
                1
              </div>
              <h3 className="text-3xl font-bold mb-5">Register & Verify</h3>
              <p className="text-gray-600 text-lg">Add your blood group, location, and last donation — quick & secure.</p>
            </div>

            {/* Card 2 & 3 similar — keeping same structure */}
            <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all text-center border-t-4 border-red-500">
              <div className="w-24 h-24 mx-auto mb-8 bg-red-100 rounded-full flex items-center justify-center text-5xl font-bold text-red-600">
                2
              </div>
              <h3 className="text-3xl font-bold mb-5">Search or Request</h3>
              <p className="text-gray-600 text-lg">Find nearby donors or raise urgent requests instantly.</p>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all text-center border-t-4 border-red-500">
              <div className="w-24 h-24 mx-auto mb-8 bg-red-100 rounded-full flex items-center justify-center text-5xl font-bold text-red-600">
                3
              </div>
              <h3 className="text-3xl font-bold mb-5">Connect & Donate</h3>
              <p className="text-gray-600 text-lg">Get matched in minutes — save a life today.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-28 bg-red-600 text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-10">
            Your Drop Can Be Someone's Lifeline
          </h2>
          <Link
            to="/register"
            className="bg-white text-red-700 hover:bg-red-50 font-bold text-2xl px-16 py-7 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 inline-block"
          >
            Register as a Donor Now
          </Link>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-16 text-center">
        <p className="text-lg">© {new Date().getFullYear()} LifeDrop — Every Drop Counts</p>
        <p className="mt-3">Made with ❤️ in Mumbai, for India</p>
      </footer>
    </div>
  );
}