import React from 'react';
import { AlertTriangle, Facebook, Twitter, Instagram, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-yellow-400" />
              <span className="text-gray-900 font-medium">HazardHawk</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
            <p className="text-gray-600">
              © {new Date().getFullYear()} HazardHawk. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
