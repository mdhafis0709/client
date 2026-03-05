import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiX, FiThumbsUp } from 'react-icons/fi';
import { useState } from 'react';

export default function SkillsList({ skills = [], onEndorse, onDeleteSkill }) {
    const [hoveredSkill, setHoveredSkill] = useState(null);

    const colors = [
        'from-purple-500 to-indigo-600',
        'from-pink-500 to-rose-600',
        'from-cyan-500 to-blue-600',
        'from-emerald-500 to-teal-600',
        'from-orange-500 to-amber-600',
        'from-violet-500 to-purple-600',
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card rounded-3xl p-6"
        >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">⚡</span> Skills
            </h2>

            {skills.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-sm italic">No skills added yet. Edit your profile to add skills.</p>
            ) : (
                <div className="flex flex-wrap gap-3">
                    <AnimatePresence>
                        {skills.map((skill, i) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ delay: i * 0.05 }}
                                onHoverStart={() => setHoveredSkill(skill.name)}
                                onHoverEnd={() => setHoveredSkill(null)}
                                className="skill-tag relative group flex items-center gap-2 px-4 py-2 rounded-2xl border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-white/5"
                            >
                                {/* Colored dot */}
                                <span className={`w-2 h-2 rounded-full bg-gradient-to-br ${colors[i % colors.length]} shrink-0`} />
                                <span className="text-gray-800 dark:text-white font-medium text-sm z-10">{skill.name}</span>

                                {/* Endorse button */}
                                <motion.button
                                    whileTap={{ scale: 0.8 }}
                                    onClick={() => onEndorse(skill.name)}
                                    className="flex items-center gap-1 ml-1 text-xs text-purple-700 hover:text-purple-900 dark:text-purple-300 dark:hover:text-white transition-colors cursor-pointer z-10"
                                    title="Endorse"
                                >
                                    <FiThumbsUp className="text-xs" />
                                    <span className="font-semibold">{skill.endorsements || 0}</span>
                                </motion.button>

                                {/* Delete button on hover */}
                                {hoveredSkill === skill.name && onDeleteSkill && (
                                    <motion.button
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        onClick={() => onDeleteSkill(skill.name)}
                                        className="ml-1 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors cursor-pointer"
                                        title="Remove skill"
                                    >
                                        <FiX className="text-xs" />
                                    </motion.button>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </motion.div>
    );
}
