"use client"
import { useState } from "react"
import { NavLink } from "react-router-dom";

import Logo from '../../assets/images/illustration/logo.png';
import AuthPanel from '../../sections/auth/AuthPanel';

function Home() {
  const [isAuthPanelOpen, setIsAuthPanelOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [userType, setUserType] = useState('student')

  const handleStudentLogin = () => {
    setUserType('student')
    setAuthMode('login')
    setIsAuthPanelOpen(true)
  }

  const handleStudentSignup = () => {
    setUserType('student')
    setAuthMode('signup')
    setIsAuthPanelOpen(true)
  }

  const handleCompanyLogin = () => {
    setUserType('company')
    setAuthMode('login')
    setIsAuthPanelOpen(true)
  }

  const handleCompanySignup = () => {
    setUserType('company')
    setAuthMode('signup')
    setIsAuthPanelOpen(true)
  }

  return (
    <>
      <div className="fixed h-screen w-screen px-4">
        <div className="w-full h-[90px]">
          <header className={`w-full h-full px-6 md:px-14 transition-all duration-300 flex flex-row justify-between items-center border-b border-gray-100 z-50`}>
            <div className="cursor-pointer flex flex-row justify-center items-center gap-20">
              <span className="flex justify-center items-center gap-4" style={{ color: "#6536ff" }}>
                <img src={Logo} alt="" className="w-[65px] h-[65px]"/>
                <span className="font-googleSansBold text-4xl capitalize text-gray-900">verified</span>
              </span>

              <div className="flex flex-row justify-center items-center gap-4">
                <NavLink to="" className="px-4 py-2 transition-all duration-300 w-fit flex flex-row justify-center items-center font-googleSansLight text-black hover:text-[#6536ff]" onClick={() => window.scrollTo({ top: document.getElementById("home").offsetTop, behavior: "smooth" })} >
                  home
                </NavLink>

                <NavLink to="" className="px-4 py-2 transition-all duration-300 w-fit flex flex-row justify-center items-center font-googleSansLight text-black hover:text-[#6536ff]" onClick={() => window.scrollTo({ top: document.getElementById("about").offsetTop, behavior: "smooth" })} >
                  about
                </NavLink>

                <NavLink to="" className="px-4 py-2 transition-all duration-300 w-fit flex flex-row justify-center items-center font-googleSansLight text-black hover:text-[#6536ff]" onClick={() => window.scrollTo({ top: document.getElementById("team").offsetTop, behavior: "smooth" })} >
                  team
                </NavLink>

                <NavLink to="" className="px-4 py-2 transition-all duration-300 w-fit flex flex-row justify-center items-center font-googleSansLight text-black hover:text-[#6536ff]" onClick={() => window.scrollTo({ top: document.getElementById("team").offsetTop, behavior: "smooth" })} >
                  contact us
                </NavLink>
              </div>
            </div>

            <div className="w-fit h-fit flex flex-row justify-between items-center gap-3 border border-gray-400 p-1 rounded-full transition-all ease-in-out">
              <button onClick={handleStudentLogin} className="px-6 py-2 transition-all duration-100 rounded-full bg-white text-black hover:bg-gray-100 flex flex-row justify-center items-center font-albulaLight" >
                Student Login
              </button>

              <button onClick={handleCompanyLogin} className="px-6 py-2 bg-gray-800 hover:bg-gray-950 text-white transition-all border border-black duration-100 rounded-full  flex flex-row justify-center items-center font-albulaLight" >
                Company Login
              </button>
            </div>
          </header>

          <AuthPanel isOpen={isAuthPanelOpen} onClose={() => setIsAuthPanelOpen(false)} initialMode={authMode}userType={userType} />
        </div>

        <div id="home" className="w-full h-[calc(100%-110px)] bg-gradient-to-b from-[#dcecf9] to-[#fcfeff] rounded-3xl verflow-scroll p-10 scrollbar-hide">
          <div className="w-full h-full flex flex-col justify-center items-center gap-5">
            <div>
              <div className="text-5xl text-center font-googleSansBold capitalize mb-5">your digital dateway to</div>
              <div className="text-5xl text-center font-googleSansBold capitalize">verified documents & profile</div>
            </div>

            <div>
              from academic credentials to professional profiles, streamline verification using AI and secure infrastructure
            </div>

            <div className="flex flex-row justify-center items-center gap-1 p-1 border border-gray-300 rounded-full">
            <button className="rounded-full font-googleSansBold text-xl bg-gray-950 hover:bg-slate-950 text-white transition-all ease-in-out duration-100 flex flex-row justify-center items-center gap-3 p-1 pr-7 py-1">
              <span className="w-[44px] h-[44px] bg-white text-gray-950 rounded-full flex items-center justify-center"> ➔ </span>
              <span>Get Started</span>
            </button>


              <button className="px-7 py-3 rounded-full font-googleSansBold text-xl transition-all ease-in-out duration-100">learn more</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;