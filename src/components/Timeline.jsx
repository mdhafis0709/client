import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

function TimelineEntry({ entry, index }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
            className="relative flex items-start gap-4 group"
        >
            {/* Timeline dot */}
            <div className="relative flex flex-col items-center shrink-0">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: index * 0.1 + 0.2, type: 'spring', stiffness: 200 }}
                    className="w-4 h-4 rounded-full border-2 border-purple-400 bg-purple-900 z-10 group-hover:scale-125 transition-transform"
                />
                {/* Connector line drawn from CSS parent */}
            </div>

            {/* Content card */}
            <motion.div
                whileHover={{ scale: 1.02, x: 4 }}
                className="mb-8 flex-1 bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-4 hover:border-purple-300 dark:hover:border-purple-500/40 transition-all"
            >
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-purple-400 font-bold text-sm tracking-widest">{entry.year}</span>
                    {entry.company && (
                        <span className="text-gray-500 dark:text-gray-400 text-xs">• {entry.company}</span>
                    )}
                </div>
                <h3 className="text-gray-900 dark:text-white font-semibold">{entry.title}</h3>
                {entry.description && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{entry.description}</p>
                )}
            </motion.div>
        </motion.div>
    );
}

export default function Timeline({ timeline = [] }) {
    if (!timeline.length) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card rounded-3xl p-6"
        >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="text-2xl">📅</span> Work Timeline
            </h2>

            <div className="relative">
                {/* Vertical line */}
                <div className="timeline-line absolute left-[7px] top-2 bottom-0 w-0.5" />

                <div className="pl-8">
                    {[...timeline].sort((a, b) => b.year - a.year).map((entry, i) => (
                        <TimelineEntry key={i} entry={entry} index={i} />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
