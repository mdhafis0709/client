import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import ProfileCard from '../components/ProfileCard';
import SkillsList from '../components/SkillsList';
import SocialLinks from '../components/SocialLinks';
import Timeline from '../components/Timeline';
import EditProfileModal from '../components/EditProfileModal';
import {
    getProfile, updateProfile, endorseSkill, deleteSkill
} from '../services/api';

export default function ProfilePage() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editOpen, setEditOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState(null);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const fetchProfile = useCallback(async () => {
        try {
            setLoading(true);
            const res = await getProfile();
            setProfile(res.data);
        } catch (e) {
            setError('Failed to load profile. Make sure the backend is running.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchProfile(); }, [fetchProfile]);

    const handleSave = async (data) => {
        setSaving(true);
        try {
            const res = await updateProfile(data);
            setProfile(res.data);
            setEditOpen(false);
            showToast('Profile updated successfully! 🎉');
        } catch (e) {
            showToast('Failed to save profile.', 'error');
        } finally {
            setSaving(false);
        }
    };

    const handleEndorse = async (skillName) => {
        try {
            const res = await endorseSkill(skillName);
            setProfile(res.data);
            showToast(`+1 endorsement for ${skillName} 👍`);
        } catch {
            showToast('Failed to endorse skill.', 'error');
        }
    };

    const handleDeleteSkill = async (skillName) => {
        try {
            const res = await deleteSkill(skillName);
            setProfile(res.data);
            showToast(`Removed "${skillName}" from skills.`);
        } catch {
            showToast('Failed to delete skill.', 'error');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"
                />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="glass-card rounded-2xl p-8 text-center max-w-md">
                    <div className="text-5xl mb-4">⚠️</div>
                    <p className="text-red-400 font-medium">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
                {/* Profile Header */}
                <ProfileCard profile={profile} onEdit={() => setEditOpen(true)} />

                {/* Skills */}
                {profile?.skills?.length > 0 && (
                    <SkillsList
                        skills={profile.skills}
                        onEndorse={handleEndorse}
                        onDeleteSkill={handleDeleteSkill}
                    />
                )}

                {/* Social Links */}
                {profile?.social_links && (
                    <SocialLinks social_links={profile.social_links} />
                )}

                {/* Timeline */}
                {profile?.timeline?.length > 0 && (
                    <Timeline timeline={profile.timeline} />
                )}

                {/* Empty state hint */}
                {!profile?.skills?.length && !profile?.timeline?.length && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="glass-card rounded-3xl p-8 text-center"
                    >
                        <div className="text-5xl mb-3">🚀</div>
                        <p className="text-gray-700 dark:text-gray-300 font-medium">Your profile is ready!</p>
                        <p className="text-gray-600 dark:text-gray-500 text-sm mt-1">Click <strong className="text-purple-600 dark:text-purple-400">Edit Profile</strong> to add your skills, timeline, and social links.</p>
                    </motion.div>
                )}
            </div>

            {/* Edit Modal */}
            <EditProfileModal
                profile={profile || {}}
                isOpen={editOpen}
                onClose={() => setEditOpen(false)}
                onSave={handleSave}
            />

            {/* Toast */}
            <AnimatedToast toast={toast} />
        </>
    );
}

function AnimatedToast({ toast }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={toast ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl font-medium text-sm shadow-xl ${toast?.type === 'error'
                ? 'bg-red-100 border border-red-300 text-red-800 dark:bg-red-900/90 dark:border-red-500/30 dark:text-red-200'
                : 'bg-purple-100 border border-purple-300 text-purple-800 dark:bg-purple-900/90 dark:border-purple-500/30 dark:text-purple-100'
                }`}
        >
            {toast?.message}
        </motion.div>
    );
}
