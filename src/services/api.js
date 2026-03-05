import axios from 'axios';
const api = axios.create({
    baseURL: "https://server-925m.onrender.com/api/",
    headers: {
        "Content-Type": "application/json",
        "x-labs-auth": "true"
    }
});

export const getProfile = () => api.get('/profile');
export const updateProfile = (data) => api.put('/profile', data);
export const addSkill = (skill) => api.post('/skills', { skill });
export const deleteSkill = (skillName) => api.delete(`/skills/${encodeURIComponent(skillName)}`);
export const endorseSkill = (skillName) => api.post(`/endorse/${encodeURIComponent(skillName)}`);
export const generateBio = (tags) => api.post('/generate-bio', { tags });

export const uploadResume = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    // Overriding the default 'application/json' to undefined 
    // forces the browser to set Content-Type correctly to multipart/form-data WITH the boundary
    return api.post('/upload-resume', formData, {
        headers: {
            'Content-Type': undefined
        }
    });
};

export default api;
