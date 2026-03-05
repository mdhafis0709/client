import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import ProfilePage from './pages/ProfilePage';
import { FiMoon, FiSun, FiCode } from 'react-icons/fi';
import { motion } from 'framer-motion';

function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <nav className="sticky top-0 z-30 glass-card border-b border-gray-200 dark:border-white/10 px-6 py-4">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
            <FiCode className="text-white text-sm" />
          </div>
          <span className="text-gray-900 dark:text-white font-bold text-lg">DevProfile</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={toggleTheme}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-colors cursor-pointer ${isDark
            ? 'border-white/10 text-yellow-300 hover:bg-yellow-500/10'
            : 'border-gray-200 text-gray-700 hover:bg-gray-100'
            }`}
        >
          {isDark ? <FiSun /> : <FiMoon />}
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </motion.button>
      </div>
    </nav>
  );
}

function AppContent() {
  const { isDark } = useTheme();
  return (
    <div className={`min-h-screen ${isDark ? 'gradient-bg' : 'gradient-bg-light'}`}>
      <Navbar />
      <main className="pb-16">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProfilePage />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
