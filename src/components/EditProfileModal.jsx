import { motion, AnimatePresence } from 'framer-motion';
import { useForm, useFieldArray } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { FiX, FiPlus, FiTrash2, FiZap, FiLoader, FiUploadCloud, FiCheckCircle } from 'react-icons/fi';
import { generateBio, uploadResume } from '../services/api';
import { useRef } from 'react';

const inputClass =
    'form-input w-full bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all text-sm';

const labelClass = 'block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1';

export default function EditProfileModal({ profile, isOpen, onClose, onSave }) {
    const [generatingBio, setGeneratingBio] = useState(false);
    const [uploadingResume, setUploadingResume] = useState(false);
    const [parseSuccess, setParseSuccess] = useState(null); // null, { score }
    const [bioTags, setBioTags] = useState('');
    const fileInputRef = useRef(null);

    const { register, handleSubmit, reset, setValue, watch, control } = useForm();

    useFieldArray({ control, name: 'skills' });
    useFieldArray({ control, name: 'timeline' });

    useEffect(() => {
        if (profile && isOpen) {
            reset({
                name: profile.name || '',
                bio: profile.bio || '',
                email: profile.email || '',
                location: profile.location || '',
                profile_picture: profile.profile_picture || '',
                github: profile.social_links?.github || '',
                linkedin: profile.social_links?.linkedin || '',
                twitter: profile.social_links?.twitter || '',
                portfolio: profile.social_links?.portfolio || '',
                skillsRaw: (profile.skills || []).map(s => s.name).join(', '),
                timelineRaw: JSON.stringify(profile.timeline || [], null, 2),
            });
        }
    }, [profile, isOpen, reset]);

    const handleGenerateBio = async () => {
        const tags = bioTags.split(',').map(t => t.trim()).filter(Boolean);
        if (!tags.length) return;
        setGeneratingBio(true);
        try {
            const res = await generateBio(tags);
            setValue('bio', res.data.bio);
        } catch (err) {
            setValue('bio', `Passionate ${tags[0] || 'developer'} skilled in ${tags.slice(1).join(', ')}.`);
        } finally {
            setGeneratingBio(false);
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Ensure it's a PDF
        if (file.type !== 'application/pdf') {
            alert('Please upload a valid PDF file.');
            return;
        }

        setUploadingResume(true);
        try {
            const res = await uploadResume(file);
            const data = res.data;
            // Update form with parsed ATS data
            setValue('name', data.name || '');
            setValue('bio', data.bio || '');
            setValue('email', data.email || '');
            setValue('location', data.location || '');
            setValue('skillsRaw', (data.skills || []).map(s => s.name).join(', '));
            setValue('timelineRaw', JSON.stringify(data.timeline || [], null, 2));

            // Show custom success UI
            setParseSuccess({ score: data.ats_score });
            setTimeout(() => setParseSuccess(null), 5000);
        } catch (err) {
            console.error(err);
            const backendMsg = err.response?.data?.detail || err.message;
            alert(`Failed to parse resume: ${backendMsg}`);
        } finally {
            setUploadingResume(false);
            // Reset input so the same file could be uploaded again if needed
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const onSubmit = (data) => {
        // Parse skills from comma-separated string
        const skillNames = data.skillsRaw
            ? data.skillsRaw.split(',').map(s => s.trim()).filter(Boolean)
            : [];
        const skillsArray = (profile.skills || []);
        const mergedSkills = skillNames.map(name => {
            const existing = skillsArray.find(s => s.name === name);
            return existing || { name, endorsements: 0 };
        });

        // Parse timeline from textarea JSON
        let timeline = [];
        try { timeline = JSON.parse(data.timelineRaw || '[]'); } catch { }

        onSave({
            name: data.name,
            bio: data.bio,
            email: data.email,
            location: data.location,
            profile_picture: data.profile_picture,
            skills: mergedSkills,
            timeline,
            social_links: {
                github: data.github,
                linkedin: data.linkedin,
                twitter: data.twitter,
                portfolio: data.portfolio,
            },
        });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="modal-overlay fixed inset-0 bg-black/60 z-40"
                    />

                    {/* Modal panel */}
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-white dark:bg-gray-950 border-l border-gray-200 dark:border-white/10 z-50 overflow-y-auto"
                    >
                        <div className="p-6">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit Profile</h2>
                                <button
                                    onClick={onClose}
                                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                                >
                                    <FiX className="text-xl" />
                                </button>
                            </div>

                            {/* Success Notification */}
                            <AnimatePresence>
                                {parseSuccess && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -20, height: 0 }}
                                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                                        exit={{ opacity: 0, y: -20, height: 0 }}
                                        className="mb-6 overflow-hidden"
                                    >
                                        <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4 flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-600 dark:text-green-400 shrink-0">
                                                <FiCheckCircle className="text-2xl" />
                                            </div>
                                            <div>
                                                <h4 className="text-green-700 dark:text-green-400 font-bold text-sm">Resume Parsed!</h4>
                                                <p className="text-green-600/80 dark:text-green-400/60 text-xs">
                                                    ATS Score: <span className="font-bold underline text-green-700 dark:text-green-300">{parseSuccess.score}/100</span>. Data applied to form.
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => setParseSuccess(null)}
                                                className="ml-auto text-green-700 dark:text-green-400 hover:opacity-70"
                                            >
                                                <FiX />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                                {/* Resume ATS Uploader */}
                                <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-4 flex items-center justify-between">
                                    <div>
                                        <h3 className="text-purple-700 dark:text-purple-300 font-semibold text-sm">Magic ATS Fill</h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Upload your PDF resume to auto-fill your profile details and calculate your ATS score!</p>
                                    </div>
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        className="hidden"
                                        ref={fileInputRef}
                                        onChange={handleFileUpload}
                                    />
                                    <motion.button
                                        type="button"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={uploadingResume}
                                        className="btn-primary text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium disabled:opacity-50 shrink-0 cursor-pointer"
                                    >
                                        {uploadingResume ? <FiLoader className="animate-spin text-lg" /> : <FiUploadCloud className="text-lg" />}
                                        {uploadingResume ? 'Parsing...' : 'Upload PDF'}
                                    </motion.button>
                                </div>
                                <hr className="border-gray-200 dark:border-white/10" />

                                {/* Basic Info */}
                                <div>
                                    <label className={labelClass}>Full Name</label>
                                    <input {...register('name')} placeholder="John Doe" className={inputClass} />
                                </div>

                                <div>
                                    <label className={labelClass}>Email</label>
                                    <input {...register('email')} placeholder="john@example.com" className={inputClass} />
                                </div>

                                <div>
                                    <label className={labelClass}>Location</label>
                                    <input {...register('location')} placeholder="Chennai, India" className={inputClass} />
                                </div>

                                <div>
                                    <label className={labelClass}>Profile Image URL</label>
                                    <input {...register('profile_picture')} placeholder="https://..." className={inputClass} />
                                </div>

                                {/* AI Bio Generator */}
                                <div>
                                    <label className={labelClass}>Bio</label>
                                    <textarea
                                        {...register('bio')}
                                        rows={3}
                                        placeholder="Tell the world about yourself..."
                                        className={inputClass + ' resize-none'}
                                    />
                                    <div className="mt-2 flex gap-2">
                                        <input
                                            value={bioTags}
                                            onChange={e => setBioTags(e.target.value)}
                                            placeholder="Tags: Python, ML, FastAPI ..."
                                            className={inputClass + ' flex-1'}
                                        />
                                        <motion.button
                                            type="button"
                                            whileHover={{ scale: 1.04 }}
                                            whileTap={{ scale: 0.96 }}
                                            onClick={handleGenerateBio}
                                            disabled={generatingBio}
                                            className="btn-primary text-white px-3 py-2 rounded-xl flex items-center gap-1 text-sm font-medium disabled:opacity-60 cursor-pointer shrink-0"
                                        >
                                            {generatingBio
                                                ? <FiLoader className="animate-spin" />
                                                : <FiZap />}
                                            {generatingBio ? 'Generating...' : 'AI Bio'}
                                        </motion.button>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-500 text-xs mt-1">Enter comma-separated tags, then click AI Bio to generate.</p>
                                </div>

                                {/* Skills */}
                                <div>
                                    <label className={labelClass}>Skills (comma-separated)</label>
                                    <input
                                        {...register('skillsRaw')}
                                        placeholder="React, Python, FastAPI, MongoDB"
                                        className={inputClass}
                                    />
                                </div>

                                {/* Social Links */}
                                <div className="border border-gray-200 dark:border-white/10 rounded-2xl p-4 space-y-3">
                                    <p className="text-gray-700 dark:text-gray-300 text-sm font-medium">Social Links</p>
                                    {['github', 'linkedin', 'twitter', 'portfolio'].map(key => (
                                        <div key={key}>
                                            <label className="block text-gray-600 dark:text-gray-400 text-xs mb-1 capitalize">{key}</label>
                                            <input {...register(key)} placeholder={`${key}.com/you`} className={inputClass} />
                                        </div>
                                    ))}
                                </div>

                                {/* Timeline */}
                                <div>
                                    <label className={labelClass}>Timeline (JSON array)</label>
                                    <textarea
                                        {...register('timelineRaw')}
                                        rows={6}
                                        placeholder={`[{"year":"2025","title":"AI Engineer","company":"ABC Corp","description":"..."}]`}
                                        className={inputClass + ' resize-none font-mono text-xs'}
                                    />
                                    <p className="text-gray-600 dark:text-gray-500 text-xs mt-1">Each entry: year, title, company (optional), description (optional).</p>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3 pt-2">
                                    <motion.button
                                        type="submit"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="btn-primary flex-1 text-white py-3 rounded-xl font-semibold cursor-pointer"
                                    >
                                        Save Changes
                                    </motion.button>
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="flex-1 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 py-3 rounded-xl font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-all cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
