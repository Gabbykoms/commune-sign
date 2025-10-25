import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Github, Twitter, Linkedin, Mail, Globe } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-20">
      <div className="container mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Globe className="text-white mr-2" size={24} />
              <h3 className="text-2xl font-bold text-white">Commune</h3>
            </div>
            <p className="text-white/80 text-lg mb-4 max-w-md">
              Empowering communication through innovative technology. 
              Making the world more accessible, one sign at a time.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://github.com/commune"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="p-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                href="https://twitter.com/commune"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="p-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
              >
                <Twitter size={20} />
              </motion.a>
              <motion.a
                href="https://linkedin.com/company/commune"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="p-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a
                href="mailto:hello@commune.com"
                whileHover={{ scale: 1.1 }}
                className="p-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
              >
                <Mail size={20} />
              </motion.a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Products</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Commune Sign
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Commune Voice
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Commune Translate
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Commune Connect
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 mb-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center text-white/70 text-sm mb-4 md:mb-0">
            <span>© {currentYear} Commune. All rights reserved.</span>
            <span className="mx-2">•</span>
            <span>Made with</span>
            <Heart className="mx-1 text-red-400" size={14} />
            <span>for accessibility</span>
          </div>
          
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-white/70 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/70 hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-white/70 hover:text-white transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 