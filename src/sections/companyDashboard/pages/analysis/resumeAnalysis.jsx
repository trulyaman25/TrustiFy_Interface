import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaGithub, FaCode, FaHistory } from 'react-icons/fa';
import { BsCloudUpload, BsFillPersonFill } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';

function ResumeAnalysis() {
    const [file, setFile] = useState(null);
    const [analysisResults, setAnalysisResults] = useState({
        verified_profiles: [],
        matched_projects: [],
        lor_certificates: []
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { companyId } = useParams();
    const [analyzedResumes, setAnalyzedResumes] = useState([]);
    const [selectedResume, setSelectedResume] = useState(null);
    
    useEffect(() => {
        // Load previously analyzed resumes from localStorage
        const savedResumes = localStorage.getItem(`analyzed_resumes_${companyId}`);
        if (savedResumes) {
            setAnalyzedResumes(JSON.parse(savedResumes));
        }
    }, [companyId]);

    const handleFileUpload = async (e) => {
        e.preventDefault();
        if (!file) return;

        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });

            if (response.status === 200 && response.data) {
                const newAnalysis = {
                    id: Date.now(),
                    filename: file.name,
                    timestamp: new Date().toISOString(),
                    results: {
                        verified_profiles: response.data.verified_profiles || [],
                        matched_projects: response.data.matched_projects || [],
                        lor_certificates: response.data.lor_certificates || []
                    }
                };

                // Update state and localStorage
                const updatedResumes = [newAnalysis, ...analyzedResumes].slice(0, 50); // Keep last 50 analyses
                setAnalyzedResumes(updatedResumes);
                localStorage.setItem(`analyzed_resumes_${companyId}`, JSON.stringify(updatedResumes));
                
                setAnalysisResults(newAnalysis.results);
                setSelectedResume(newAnalysis);
            } else {
                throw new Error(response.data?.error || 'Upload failed');
            }
        } catch (error) {
            console.error('Error:', error);
            setError(error.message || 'Failed to process resume');
        } finally {
            setLoading(false);
        }
    };

    const handleResumeSelect = (resume) => {
        setSelectedResume(resume);
        setAnalysisResults(resume.results);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    const parseLorData = (lor) => {
        try {
            if (lor.raw) {
                // Extract the JSON string from the raw property
                const jsonMatch = lor.raw.match(/```json\n(.*?)\n```/s);
                if (jsonMatch && jsonMatch[1]) {
                    return JSON.parse(jsonMatch[1]);
                }
            }
            return lor;
        } catch (error) {
            console.error('Error parsing LOR data:', error);
            return lor;
        }
    };

    const today = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <main className="fixed w-[calc(100vw-175px)] h-screen pt-7 pb-7 pr-7 font-albulaRegular">
            <div className="flex h-full bg-white text-gray-900 rounded-[40px] border-gray-400 overflow-hidden">
                {/* Left Section - Upload */}
                <section className="w-[400px] border-r border-gray-200 p-8 overflow-y-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <h2 className="text-2xl font-albulaBold text-gray-800">Upload Resume</h2>
                        <p className="text-sm text-gray-600">
                            Upload a resume to analyze coding profiles, GitHub projects, and letters of recommendation.
                        </p>
                        
                        <form onSubmit={handleFileUpload} className="space-y-4">
                            <label className="flex flex-col items-center p-8 border-2 border-dashed border-indigo-300 rounded-2xl cursor-pointer hover:bg-indigo-50/30 transition-all duration-200">
                                <div className="flex flex-col items-center space-y-4">
                                    <div className="p-4 bg-indigo-100 rounded-full">
                                        <BsCloudUpload className="w-8 h-8 text-indigo-600" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-lg font-medium text-gray-800">
                                            {file ? file.name : "Drop your resume here"}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Supports PDF format only
                                        </p>
                                    </div>
                                </div>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept=".pdf"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </label>
                            
                            <button
                                type="submit"
                                disabled={!file || loading}
                                className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                            >
                                {loading ? (
                                    <div className="flex items-center space-x-2">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Analyzing...</span>
                                    </div>
                                ) : (
                                    <span>Analyze Resume</span>
                                )}
                            </button>
                        </form>

                        {error && (
                            <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
                                {error}
                            </div>
                        )}
                    </motion.div>
                </section>

                {/* Middle Section - Analysis Results */}
                <section className="flex-1 p-8 overflow-y-auto bg-gray-50">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-8"
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-albulaBold text-gray-800">Analysis Results</h2>
                            {selectedResume && (
                                <div className="text-sm text-gray-500">
                                    Analyzed on {formatDate(selectedResume.timestamp)}
                                </div>
                            )}
                        </div>

                        {(analysisResults.verified_profiles.length > 0 || 
                          analysisResults.matched_projects.length > 0 || 
                          analysisResults.lor_certificates.length > 0) ? (
                            <div className="grid grid-cols-1 gap-8">
                                {/* Coding Profiles */}
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3 mb-6">
                                        <FaCode className="w-5 h-5 text-indigo-600" />
                                        <h2 className="font-albulaBold text-xl text-gray-800">Coding Profiles</h2>
                                    </div>
                                    {analysisResults.verified_profiles.map((profile, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="p-6 bg-gradient-to-br from-indigo-50 to-white rounded-2xl border border-indigo-100 shadow-sm hover:shadow-md transition-shadow duration-200"
                                        >
                                            <div className="flex justify-between items-center mb-4">
                                                <h3 className="font-albulaBold text-xl text-gray-800 capitalize">{profile.platform}</h3>
                                                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                                                    {profile.username}
                                                </span>
                                            </div>
                                            
                                            {profile.platform === 'leetcode' && profile.solvedQuestions && (
                                                <div className="space-y-4">
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <div className="col-span-2 p-3 bg-white rounded-xl text-center">
                                                            <p className="text-sm text-gray-500">Total Solved</p>
                                                            <p className="font-albulaBold text-2xl text-indigo-600">{profile.solvedQuestions.All || 0}</p>
                                                        </div>
                                                        <div className="p-3 bg-white rounded-xl text-center">
                                                            <p className="text-xs text-gray-500">Easy</p>
                                                            <p className="font-albulaBold text-lg text-green-600">{profile.solvedQuestions.Easy || 0}</p>
                                                        </div>
                                                        <div className="p-3 bg-white rounded-xl text-center">
                                                            <p className="text-xs text-gray-500">Medium</p>
                                                            <p className="font-albulaBold text-lg text-yellow-600">{profile.solvedQuestions.Medium || 0}</p>
                                                        </div>
                                                        <div className="p-3 bg-white rounded-xl text-center">
                                                            <p className="text-xs text-gray-500">Hard</p>
                                                            <p className="font-albulaBold text-lg text-red-600">{profile.solvedQuestions.Hard || 0}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>

                                {/* GitHub Projects */}
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3 mb-6">
                                        <FaGithub className="w-5 h-5 text-gray-800" />
                                        <h2 className="font-albulaBold text-xl text-gray-800">GitHub Projects</h2>
                                    </div>
                                    {analysisResults.matched_projects.map((project, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="font-albulaBold text-lg text-gray-800">
                                                    {project.repo_data?.repo_name || 'Unknown Project'}
                                                </h3>
                                                {project.github_repo_url && (
                                                    <a
                                                        href={project.github_repo_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center px-3 py-1 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 text-sm"
                                                    >
                                                        <FaGithub className="mr-2" />
                                                        View
                                                    </a>
                                                )}
                                            </div>
                                            
                                            {project.repo_insights && (
                                                <>
                                                    <div className="grid grid-cols-4 gap-3 mb-4">
                                                        <div className="p-2 bg-white rounded-lg text-center">
                                                            <p className="text-xs text-gray-500">Stars</p>
                                                            <p className="font-albulaBold text-gray-800">{project.repo_insights.stars || 0}</p>
                                                        </div>
                                                        <div className="p-2 bg-white rounded-lg text-center">
                                                            <p className="text-xs text-gray-500">Forks</p>
                                                            <p className="font-albulaBold text-gray-800">{project.repo_insights.forks || 0}</p>
                                                        </div>
                                                        <div className="p-2 bg-white rounded-lg text-center">
                                                            <p className="text-xs text-gray-500">Issues</p>
                                                            <p className="font-albulaBold text-gray-800">{project.repo_insights.open_issues || 0}</p>
                                                        </div>
                                                        <div className="p-2 bg-white rounded-lg text-center">
                                                            <p className="text-xs text-gray-500">Commits</p>
                                                            <p className="font-albulaBold text-gray-800">{project.repo_insights.total_commits || 0}</p>
                                                        </div>
                                                    </div>

                                                    {project.repo_insights.languages_used?.length > 0 && (
                                                        <div className="flex flex-wrap gap-2">
                                                            {project.repo_insights.languages_used.map((lang, i) => (
                                                                <span key={i} className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-md text-xs font-medium">
                                                                    {lang}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Letters of Recommendation */}
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3 mb-6">
                                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                        </svg>
                                        <h2 className="font-albulaBold text-xl text-gray-800">Letters of Recommendation</h2>
                                    </div>
                                    {analysisResults.lor_certificates.map((lor, index) => {
                                        const parsedLor = parseLorData(lor);
                                        return (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="p-6 bg-gradient-to-br from-green-50 to-white rounded-2xl border border-green-100 shadow-sm hover:shadow-md transition-shadow duration-200"
                                            >
                                                <div className="space-y-4">
                                                    <div className="flex justify-between items-center">
                                                        <h3 className="font-albulaBold text-lg text-gray-800">
                                                            {parsedLor.document_type || "Letter of Recommendation"}
                                                        </h3>
                                                        {parsedLor.reference_number && (
                                                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                                                {parsedLor.reference_number}
                                                            </span>
                                                        )}
                                                    </div>
                                                    
                                                    <div className="space-y-3">
                                                        {parsedLor.candidate_name && (
                                                            <div className="p-3 bg-white rounded-xl">
                                                                <p className="text-sm text-gray-500">Candidate</p>
                                                                <p className="font-medium text-gray-800">{parsedLor.candidate_name}</p>
                                                            </div>
                                                        )}
                                                        
                                                        {parsedLor.institution_name && (
                                                            <div className="p-3 bg-white rounded-xl">
                                                                <p className="text-sm text-gray-500">Institution</p>
                                                                <p className="font-medium text-gray-800">{parsedLor.institution_name}</p>
                                                            </div>
                                                        )}
                                                        
                                                        {parsedLor.purpose_of_recommendation && (
                                                            <div className="p-3 bg-white rounded-xl">
                                                                <p className="text-sm text-gray-500">Purpose</p>
                                                                <p className="font-albulaMedium">{parsedLor.purpose_of_recommendation}</p>
                                                            </div>
                                                        )}
                                                        
                                                        {parsedLor.sentiment && (
                                                            <div className="flex justify-end">
                                                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                                    parsedLor.sentiment === 'positive' 
                                                                        ? 'bg-green-100 text-green-700' 
                                                                        : 'bg-gray-100 text-gray-700'
                                                                }`}>
                                                                    {parsedLor.sentiment} Recommendation
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-500">Upload a resume to see analysis results</p>
                            </div>
                        )}
                    </motion.div>
                </section>

                {/* Right Section - History */}
                <section className="w-[350px] border-l border-gray-200 bg-white overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center space-x-2">
                            <FaHistory className="text-indigo-600 w-5 h-5" />
                            <h2 className="font-albulaBold text-xl text-gray-800">History</h2>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {analyzedResumes.map((resume) => (
                            <motion.div
                                key={resume.id}
                                whileHover={{ scale: 1.02 }}
                                onClick={() => handleResumeSelect(resume)}
                                className={`p-4 cursor-pointer transition-colors ${
                                    selectedResume?.id === resume.id 
                                        ? 'bg-indigo-50 border-l-4 border-l-indigo-500' 
                                        : 'hover:bg-gray-50 border-b border-gray-100'
                                }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-indigo-100 rounded-full">
                                        <BsFillPersonFill className="w-4 h-4 text-indigo-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            {resume.filename}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {formatDate(resume.timestamp)}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-2 flex items-center space-x-2">
                                    <span className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
                                        {resume.results.verified_profiles.length} Profiles
                                    </span>
                                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                        {resume.results.matched_projects.length} Projects
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                        {analyzedResumes.length === 0 && (
                            <div className="p-8 text-center text-gray-500">
                                <p>No analyzed resumes yet</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}

export default ResumeAnalysis;
