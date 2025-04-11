import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ApplyCompany() {
    const navigate = useNavigate();
    const { user } = useAuth0();
    const [companies, setCompanies] = useState([]);
    const [userApplications, setUserApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { studentId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            if (!studentId) {
                setError('Student ID is not available');
                navigate('/studentLogin');
                return;
            }

            try {
                setLoading(true);
                const [companiesRes, applicationsRes] = await Promise.all([
                    axios.get('http://127.0.0.1:5000/companies'),
                    axios.get(`http://127.0.0.1:5000/applications/student/${studentId}`)
                ]);
                
                setCompanies(companiesRes.data);
                setUserApplications(applicationsRes.data);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError('Failed to fetch data: ' + err.message);
                if (err.response?.status === 401) {
                    navigate('/studentLogin');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [studentId, navigate]);

    const handleApply = async (companyId) => {
        try {
            // Get user's verified documents
            const documentsResponse = await axios.get(`http://127.0.0.1:5000/student/documents/${studentId}`);
            const verifiedDocs = documentsResponse.data.filter(doc => doc.verify_flag);
            
            if (verifiedDocs.length === 0) {
                alert("You need at least one verified document to apply!");
                return;
            }

            await axios.post('http://127.0.0.1:5000/apply', {
                studentId,
                companyId,
                documents: verifiedDocs.map(doc => doc.ipfs_hash)
            });

            // Refresh applications
            const newApplicationsRes = await axios.get(`http://127.0.0.1:5000/applications/student/${studentId}`);
            setUserApplications(newApplicationsRes.data);
            
            alert("Application submitted successfully!");
        } catch (err) {
            console.error("Error applying:", err);
            alert("Failed to submit application: " + err.message);
        }
    };

    const getApplicationStatus = (companyId) => {
        const application = userApplications.find(app => app.companyId === companyId);
        return application ? application.status : null;
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'accepted':
                return 'bg-green-100 text-green-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const today = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <>
            <main className="fixed w-[calc(100vw-450px)] h-screen pt-7 pb-7 pr-7 font-albulaRegular">   
                <div className="flex flex-row justify-between bg-white text-gray-900 rounded-[40px] h-full border-gray-400 shadow-inner">
                    <section className='w-full bg-white h-full rounded-bl-[40px] rounded-tl-[40px] p-20 shadow-inner'>
                        <h1 className="font-albulaHeavy text-4xl text-slate-800">Companies</h1>
                        <p className="text-slate-500 mt-3 ml-1 font-albulaMedium">{today}</p>

                        <p className="text-md text-gray-600 font-albulaRegular mt-8">
                            Welcome to <span className="text-violet-600">Trustify</span>! Here you can view and apply to companies registered on our platform. 
                            Connect with potential employers and share your verified documents securely.
                        </p>

                        {loading ? (
                            <p className='mt-10'>Loading companies...</p>
                        ) : error ? (
                            <p className="text-red-500 mt-10">{error}</p>
                        ) : (
                            <div className="mt-10">
                                <div>
                                    <h1 className='font-albulaHeavy text-2xl text-slate-700'>Available Companies</h1>
                                </div>

                                <div className="mt-6">
                                    <div className="grid grid-cols-4 gap-4 py-4 border-b border-gray-300 text-slate-500 font-albulaMedium">
                                        <p className="font-albulaMedium">Company Name</p>
                                        <p className="font-albulaMedium text-center">Industry</p>
                                        <p className="font-albulaMedium text-center">Location</p>
                                        <p className="font-albulaMedium text-center">Action</p>
                                    </div>

                                    <ul className='max-h-[525px] overflow-y-auto'>
                                        {companies.map((company, index) => {
                                            const applicationStatus = getApplicationStatus(company.companyId);
                                            
                                            return (
                                                <li key={index} className="grid grid-cols-4 items-center p-6 pr-10 border-b-2 hover:border-1 hover:border-indigo-200 hover:bg-indigo-50 transition-all duration-200 gap-4">
                                                    <div className="flex items-center justify-start">
                                                        <p className="font-semibold text-slate-800">{company.companyName}</p>
                                                    </div>

                                                    <div className="flex items-center justify-center">
                                                        <span className="px-4 py-1 rounded-xl text-sm bg-violet-100 text-violet-800">
                                                            {company.industry || 'Technology'}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center justify-center">
                                                        <span className="text-slate-500">
                                                            {company.location || 'Not Specified'}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center justify-center">
                                                        {applicationStatus ? (
                                                            <span className={`px-4 py-1 rounded-xl text-sm capitalize ${getStatusColor(applicationStatus)}`}>
                                                                {applicationStatus}
                                                            </span>
                                                        ) : (
                                                            <button 
                                                                onClick={() => handleApply(company.companyId)}
                                                                className='px-4 py-1 rounded-xl text-sm bg-indigo-400 text-white hover:bg-indigo-600 transition-all duration-200'
                                                            >
                                                                Apply Now
                                                            </button>
                                                        )}
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </section>

                    <section className='w-[400px] h-full'>
                        <main className="h-full bg-slate-100 pt-20 p-12 flex flex-col justify-between rounded-br-[40px] rounded-tr-[40px] bg-gradient-to-b from-blue-100 to-indigo-200">
                            <div>
                                <h1 className="font-albulaBold text-2xl mb-6 text-slate-800">Application Statistics</h1>
                                <div className="mt-12">
                                    <div>
                                        <div className="flex flex-row justify-between items-center mt-10">
                                            <p className="text-gray-600 font-albulaBold text-sm">Applied Companies</p>
                                            <span className="text-gray-500 font-albulaMedium text-sm">
                                                {userApplications.length}
                                            </span>
                                        </div>

                                        <div className="flex items-center">
                                            <div className="h-2 w-full bg-gray-200 rounded-full mr-2 mt-3">
                                                <div className="h-2 bg-green-500 rounded-full" 
                                                    style={{ width: `${Math.min(userApplications.length * 10, 100)}%` }}>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex flex-row justify-between items-center mt-10">
                                            <p className="text-gray-600 font-albulaBold text-sm">Accepted</p>
                                            <span className="text-gray-500 font-albulaMedium text-sm">
                                                {userApplications.filter(app => app.status === 'accepted').length}
                                            </span>
                                        </div>

                                        <div className="flex items-center">
                                            <div className="h-2 w-full bg-gray-200 rounded-full mr-2 mt-3">
                                                <div className="h-2 bg-green-500 rounded-full" 
                                                    style={{ width: `${Math.min(userApplications.filter(app => app.status === 'accepted').length * 10, 100)}%` }}>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className='w-[300px] h-fit rounded-3xl p-8 flex flex-col justify-center items-center border-dashed border-2 border-[#8360ff]'>
                                    <NavLink to={`/student/profile/${studentId}`} className='w-full h-[70px] bg-[#13130d] rounded-2xl font-albulaBold uppercase text-white hover:bg-orange-400 transition-all duration-300 hover:drop-shadow-xl flex justify-center items-center'>
                                        Update Profile
                                    </NavLink>
                                </div>

                                <div className='w-[300px] h-fit rounded-3xl p-8 flex flex-col justify-center items-center border-dashed border-2 border-[#8360ff] mt-5'>
                                    <NavLink to={`/student/upload/${studentId}`} className='w-full h-[70px] rounded-2xl font-albulaBold uppercase text-white bg-[#8360ff] hover:bg-purple-700 transition-all duration-300 hover:drop-shadow-xl flex justify-center items-center'>
                                        Upload Documents
                                    </NavLink>
                                </div>
                            </div>
                        </main>
                    </section>
                </div>
            </main>
        </>
    );
}

export default ApplyCompany;