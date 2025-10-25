import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Type, Send, Sparkles } from 'lucide-react';

interface TextInputProps {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
}

const TextInput: React.FC<TextInputProps> = ({ value, onChange, placeholder }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="card-premium"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <motion.div
            animate={{ rotate: isFocused ? 360 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <Type size={24} className="text-cyan-400 mr-3 glow-cyan" />
          </motion.div>
          <h3 className="text-2xl font-bold text-white">Text Input</h3>
        </div>
        
        <motion.div
          animate={{ scale: value.length > 0 ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <Sparkles size={20} className="text-purple-400 glow-purple" />
        </motion.div>
      </div>
      
      <div className="relative">
        <motion.textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder || "Enter text to convert to sign language..."}
          className="input-field min-h-[140px] resize-none pr-16"
          rows={5}
        />
        
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="absolute bottom-4 right-4 p-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
          disabled={!value.trim()}
        >
          <Send size={20} className="text-white" />
        </motion.button>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-6 flex justify-between items-center"
      >
        <div className="flex items-center space-x-6">
          <motion.div
            animate={{ scale: value.length > 0 ? 1.05 : 1 }}
            className="flex items-center px-4 py-2 bg-white/10 rounded-full backdrop-blur-lg"
          >
            <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></div>
            <span className="text-white/80 text-sm font-medium">
              {value.length} characters
            </span>
          </motion.div>
          
          <motion.div
            animate={{ scale: value.split(' ').filter(word => word.length > 0).length > 0 ? 1.05 : 1 }}
            className="flex items-center px-4 py-2 bg-white/10 rounded-full backdrop-blur-lg"
          >
            <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></div>
            <span className="text-white/80 text-sm font-medium">
              {value.split(' ').filter(word => word.length > 0).length} words
            </span>
          </motion.div>
        </div>
        
        {value.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-full backdrop-blur-lg border border-emerald-400/30"
          >
            <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
            <span className="text-emerald-300 text-sm font-medium">Ready to sign</span>
          </motion.div>
        )}

        {/* Sample Text Suggestions */}
        {value.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4"
          >
            <p className="text-white/60 text-sm mb-3">Try these examples:</p>
            <div className="flex flex-wrap gap-2">
              {[
                "Hello, how are you today?",
                "Welcome to our presentation",
                "Thank you for watching",
                "This is amazing technology"
              ].map((suggestion, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onChange(suggestion)}
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-white/80 text-xs transition-all duration-300"
                >
                  {suggestion}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default TextInput; 