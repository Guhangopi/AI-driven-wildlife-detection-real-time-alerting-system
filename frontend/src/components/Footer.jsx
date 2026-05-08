import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-nature-950 text-nature-50 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <ShieldAlert className="h-8 w-8 text-nature-400" />
              <span className="font-bold text-xl tracking-tight">AI Wildlife Alerts</span>
            </Link>
            <p className="text-nature-200 text-sm leading-relaxed max-w-xs">
              Advanced AI-powered monitoring designed to instantly detect wild animals, ensuring campus safety through real-time alerts.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="text-nature-200 hover:text-white transition-colors text-sm">
                  Live Dashboard
                </Link>
              </li>
              <li>
                <Link to="/report" className="text-nature-200 hover:text-white transition-colors text-sm">
                  Report Incident
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-nature-200 hover:text-white transition-colors text-sm">
                  Member Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-nature-200 hover:text-white transition-colors text-sm">
                  Register Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Contact & Support</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-sm text-nature-200">
                <MapPin className="w-5 h-5 text-nature-400 shrink-0" />
                <span>SV University Campus<br />Tirupati, Andhra Pradesh</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-nature-200">
                <Phone className="w-5 h-5 text-nature-400 shrink-0" />
                <span>Emergency: 100 / Campus Security</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-nature-200">
                <Mail className="w-5 h-5 text-nature-400 shrink-0" />
                <span>security@svuniversity.edu</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-nature-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-nature-300 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} AI Wildlife Detection System. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <span className="text-nature-400 text-sm font-medium">Protecting Wildlife, Ensuring Safety</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
