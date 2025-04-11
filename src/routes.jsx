import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

import Home from './sections/home/home';

import StudentSignIn from './sections/auth/studentAuth/studentSignIn';
import StudentSignUp from './sections/auth/studentAuth/studentSignUp';

import CompanySignIn from './sections/auth/companyAuth/companySignIn';

import Wallet from './sections/userDashboard/pages/wallet/wallet';
import Profile from './sections/userDashboard/pages/profile/profile';
import Analysis from './sections/userDashboard/pages/analysis/analysis';
import Upload from './sections/userDashboard/pages/upload/upload';
import ApplyCompany from './sections/userDashboard/pages/applyCompany/applyCompany';

import CompanyDashboardLayout from './sections/companyDashboard/companyDashboardLayout';
import CompanyAnalysis from './sections/companyDashboard/pages/analysis/analysis';
import CompanyUpload from './sections/companyDashboard/pages/upload/upload';
import CompanySettings from './sections/companyDashboard/pages/settings/settings';
import ResumeAnalysis from './sections/companyDashboard/pages/analysis/resumeAnalysis';

import UserDashboardLayout from './sections/userDashboard/userDashboardLayout';

function WebRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="studentLogin" element={<StudentSignIn/>}/>
                <Route path="studentRegistration" element={<StudentSignUp/>}/>
                <Route path="companyLogin" element={<CompanySignIn/>}/>
                <Route path="companyRegister" element={<CompanySignIn/>}/>

                <Route path="/student" element={<UserDashboardLayout />}>
                    <Route path="wallet/:studentId" element={<Wallet />} />
                    <Route path="profile/:studentId" element={<Profile />} />
                    <Route path="dashboard/:studentId" element={<Analysis />} />
                    <Route path="upload/:studentId" element={<Upload />} />
                    <Route path="apply/:studentId" element={<ApplyCompany />} />
                </Route>

                <Route path="/company" element={<CompanyDashboardLayout />}>
                    <Route path="dashboard/:companyId" element={<CompanyAnalysis />} />
                    <Route path="upload/:companyId" element={<CompanyUpload />} />
                    <Route path="settings/:companyId" element={<CompanySettings />} />
                    <Route path="resume-analysis/:companyId" element={<ResumeAnalysis />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default WebRoutes;