import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

function Profile() {
    const { user } = useAuth0();
    const navigate = useNavigate();
    const { studentId } = useParams();
    const [studentData, setStudentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        collegeRollNumber: "",
        enrollmentNumber: "",
        aadharCardNumber: "",
        branch: "",
        collegeEmailId: "",
        email: "",
    });

    useEffect(() => {
        const fetchStudentData = async () => {
            if (!studentId) {
                console.error('No studentId in URL parameters');
                return;
            }

            try {
                console.log('Fetching student data for ID:', studentId);
                const response = await axios.get(`http://127.0.0.1:5000/student/${studentId}`);
                
                if (!response.data) {
                    throw new Error('No data received from server');
                }

                const data = response.data;
                console.log('Received student data:', data);
                setStudentData(data);
                
                // Initialize form data with fetched student data
                setFormData({
                    firstName: data.firstName || "",
                    lastName: data.lastName || "",
                    email: data.email || "",
                    phoneNumber: data.phoneNumber || "",
                    collegeRollNumber: data.collegeRollNumber || "",
                    enrollmentNumber: data.enrollmentNumber || "",
                    aadharCardNumber: data.aadharCardNumber || "",
                    branch: data.branch || "",
                    collegeEmailId: data.collegeEmailId || "",
                });
                setError(null);
            } catch (err) {
                console.error('Error fetching student data:', err);
                const errorMessage = err.response?.data?.error || err.message;
                setError(`Failed to fetch student data: ${errorMessage}`);
                if (err.response?.status === 401) {
                    navigate('/studentLogin');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchStudentData();
    }, [studentId, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.put(`http://127.0.0.1:5000/student/${studentId}`, formData);
            const response = await axios.get(`http://127.0.0.1:5000/student/${studentId}`);
            setStudentData(response.data);
            setIsEditing(false);
            setError(null);
        } catch (err) {
            console.error('Error updating profile:', err);
            setError('Failed to update profile: ' + (err.response?.data?.error || err.message));
        } finally {
            setLoading(false);
        }
    };

    const toggleEditMode = () => {
        if (isEditing) {
            // Reset form data to current student data if canceling edit
            setFormData({
                firstName: studentData.firstName || "",
                lastName: studentData.lastName || "",
                email: studentData.email || "",
                phoneNumber: studentData.phoneNumber || "",
                collegeRollNumber: studentData.collegeRollNumber || "",
                enrollmentNumber: studentData.enrollmentNumber || "",
                aadharCardNumber: studentData.aadharCardNumber || "",
                branch: studentData.branch || "",
                collegeEmailId: studentData.collegeEmailId || "",
            });
        }
        setIsEditing(!isEditing);
        setError(null);
    };

    const getInitial = (name) => {
        return name ? name.charAt(0).toUpperCase() : '?';
    };

    if (loading) {
        return (
            <main className="fixed w-[calc(100vw-450px)] h-screen bg-[#0F0D13ff] rounded-tl-[40px] rounded-bl-[40px] pt-7 pb-7 pr-7 font-albulaRegular">
                <div className="flex items-center justify-center h-full">
                    <p className="text-white text-xl">Loading...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="fixed w-[calc(100vw-450px)] h-screen bg-[#0F0D13ff] rounded-tl-[40px] rounded-bl-[40px] pt-7 pb-7 pr-7 font-albulaRegular">
            <div className="flex flex-row bg-white text-gray-900 rounded-[40px] h-full border-gray-400 shadow-lg">
                <div className="flex flex-col items-center justify-center w-1/3 bg-gradient-to-b from-blue-100 to-indigo-200 rounded-l-[40px] py-36 shadow-inner">
                    <div className="flex flex-col justify-center items-center">
                        <div className="w-40 h-40 rounded-full bg-[#8360ff] shadow-inner flex items-center justify-center mb-4 hover:bg-[#6536ff] transition-colors duration-300">
                            <span className='text-white text-8xl font-albulaHeavy'>
                                {studentData?.firstName ? getInitial(studentData.firstName) : '?'}
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 mt-10">{studentData?.firstName || 'N/A'}</h2>
                        <p className="text-gray-600 mb-2 font-medium mt-5">{studentData?.email || 'N/A'}</p>
                        <p className="text-sm text-gray-500 mb-6">{studentId || 'N/A'}</p>
                    </div>
                </div>

                <div className="w-2/3 bg-gray-50 rounded-r-[40px] py-36 px-20 shadow-inner flex flex-col justify-center relative">
                    <button
                        onClick={toggleEditMode}
                        className={`absolute top-10 right-10 px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                            isEditing 
                            ? 'bg-red-500 hover:bg-red-600 text-white' 
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                    >
                        {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                    </button>

                    <div>
                        <h2 className="text-3xl font-semibold mb-8 text-gray-700">Personal Information</h2>
                        
                        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
                            <input 
                                type="text" 
                                name="firstName" 
                                value={formData.firstName} 
                                onChange={handleChange} 
                                placeholder="First Name" 
                                disabled={!isEditing}
                                className={`p-4 rounded-lg ${!isEditing ? 'bg-gray-100' : 'bg-blue-50'} border border-gray-300 shadow-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed`}
                            />
                            <input 
                                type="text" 
                                name="lastName" 
                                value={formData.lastName} 
                                onChange={handleChange} 
                                placeholder="Last Name" 
                                disabled={!isEditing}
                                className={`p-4 rounded-lg ${!isEditing ? 'bg-gray-100' : 'bg-blue-50'} border border-gray-300 shadow-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed`}
                            />
                            <input 
                                type="text" 
                                name="phoneNumber" 
                                value={formData.phoneNumber} 
                                onChange={handleChange} 
                                placeholder="Phone Number" 
                                disabled={!isEditing}
                                className={`p-4 rounded-lg ${!isEditing ? 'bg-gray-100' : 'bg-blue-50'} border border-gray-300 shadow-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed`}
                            />
                            <input 
                                type="text" 
                                name="aadharCardNumber" 
                                value={formData.aadharCardNumber} 
                                onChange={handleChange} 
                                placeholder="Aadhar Card Number" 
                                disabled={!isEditing}
                                className={`p-4 rounded-lg ${!isEditing ? 'bg-gray-100' : 'bg-blue-50'} border border-gray-300 shadow-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed`}
                            />
                            <input 
                                type="text" 
                                name="branch" 
                                value={formData.branch} 
                                onChange={handleChange} 
                                placeholder="Branch" 
                                disabled={!isEditing}
                                className={`p-4 rounded-lg ${!isEditing ? 'bg-gray-100' : 'bg-blue-50'} border border-gray-300 shadow-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed`}
                            />
                            <input 
                                type="email" 
                                name="collegeEmailId" 
                                value={formData.collegeEmailId} 
                                onChange={handleChange} 
                                placeholder="College Email ID" 
                                disabled={!isEditing}
                                className={`p-4 rounded-lg ${!isEditing ? 'bg-gray-100' : 'bg-blue-50'} border border-gray-300 shadow-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed`}
                            />
                            <input 
                                type="text" 
                                name="collegeRollNumber" 
                                value={formData.collegeRollNumber} 
                                onChange={handleChange} 
                                placeholder="College Roll Number" 
                                disabled={!isEditing}
                                className={`p-4 rounded-lg ${!isEditing ? 'bg-gray-100' : 'bg-blue-50'} border border-gray-300 shadow-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed`}
                            />
                            <input 
                                type="text" 
                                name="enrollmentNumber" 
                                value={formData.enrollmentNumber} 
                                onChange={handleChange} 
                                placeholder="Enrollment Number" 
                                disabled={!isEditing}
                                className={`p-4 rounded-lg ${!isEditing ? 'bg-gray-100' : 'bg-blue-50'} border border-gray-300 shadow-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed`}
                            />
                            
                            {isEditing && (
                                <button 
                                    type="submit" 
                                    disabled={loading}
                                    className="w-full col-span-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-lg mt-10 font-medium hover:from-blue-600 hover:to-indigo-600 transform transition-all duration-300 shadow-lg disabled:opacity-50"
                                >
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </button>
                            )}

                            {error && (
                                <div className="col-span-2 text-red-500 text-center mt-2">
                                    {error}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Profile;