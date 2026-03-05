import { motion } from 'framer-motion';
import { FiEdit2, FiMapPin, FiMail } from 'react-icons/fi';

export default function ProfileCard({ profile, onEdit }) {
    if (!profile) return null;
    const { name, bio, location, profile_picture, email } = profile;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="glass-card rounded-3xl p-8 relative overflow-hidden"
        >
            {/* Background decorative circles */}
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-10"
                style={{ background: 'var(--gradient-primary)' }} />
            <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full opacity-10"
                style={{ background: 'var(--gradient-secondary)' }} />

            <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6">
                {/* Avatar */}
                <div className="avatar-ring shrink-0">
                    <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-800">
                        {profile_picture ? (
                            <img
                                src={profile_picture}
                                alt={name}
                                className="w-full h-full object-cover"
                                onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=667eea&color=fff&size=128`; }}
                            />
                        ) : (
                            <img
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'Dev')}&background=667eea&color=fff&size=128`}
                                alt={name}
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>
                </div>

                {/* Info */}
                <div className="flex-1 text-center sm:text-left">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                        {name || 'Your Name'}
                    </h1>
                    <p className="text-purple-600 dark:text-purple-300 font-medium text-lg mb-3">
                        {bio || 'Your bio goes here...'}
                    </p>

                    <div className="flex flex-wrap gap-3 justify-center sm:justify-start text-sm">
                        {location && (
                            <span className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                                <FiMapPin className="text-purple-500 dark:text-purple-400" />
                                {location}
                            </span>
                        )}
                        {email && (
                            <span className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                                <FiMail className="text-purple-500 dark:text-purple-400" />
                                {email}
                            </span>
                        )}
                        {profile.ats_score > 0 && (
                            <span className="flex items-center gap-1 text-green-600 dark:text-green-400 font-semibold bg-green-500/10 px-2 rounded-lg">
                                🎯 ATS Score: {profile.ats_score}/100
                            </span>
                        )}
                    </div>
                </div>

                {/* Edit button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onEdit}
                    className="btn-primary absolute top-0 right-0 sm:relative text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium cursor-pointer"
                >
                    <FiEdit2 />
                    Edit Profile
                </motion.button>
            </div>
        </motion.div>
    );
}
