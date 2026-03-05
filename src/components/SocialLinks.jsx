import { motion } from 'framer-motion';
import {
    FiGithub, FiLinkedin, FiTwitter, FiGlobe
} from 'react-icons/fi';

const LINKS = [
    { key: 'github', icon: FiGithub, label: 'GitHub', color: 'hover:text-white hover:bg-gray-700' },
    { key: 'linkedin', icon: FiLinkedin, label: 'LinkedIn', color: 'hover:text-white hover:bg-blue-700' },
    { key: 'twitter', icon: FiTwitter, label: 'Twitter', color: 'hover:text-white hover:bg-sky-600' },
    { key: 'portfolio', icon: FiGlobe, label: 'Portfolio', color: 'hover:text-white hover:bg-purple-700' },
];

export default function SocialLinks({ social_links = {} }) {
    const hasLinks = LINKS.some(l => social_links[l.key]);

    if (!hasLinks) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-3xl p-6"
        >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">🔗</span> Connect
            </h2>
            <div className="flex flex-wrap gap-3">
                {LINKS.map(({ key, icon: Icon, label, color }) => {
                    const url = social_links[key];
                    if (!url) return null;
                    const href = url.startsWith('http') ? url : `https://${url}`;
                    return (
                        <motion.a
                            key={key}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.08, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-2xl border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-white/5 text-gray-700 dark:text-gray-300 text-sm font-medium transition-all duration-200 ${color}`}
                        >
                            <Icon className="text-base" />
                            {label}
                        </motion.a>
                    );
                })}
            </div>
        </motion.div>
    );
}
