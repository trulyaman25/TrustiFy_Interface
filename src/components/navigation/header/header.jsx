"use client"

import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"
import Logo from '../../../assets/images/illustration/logo.png'
import AuthPanel from '../../../sections/auth/AuthPanel'

function Header() {
  const { loginWithRedirect } = useAuth0()
  const [navbarHeight, setNavbarHeight] = useState("h-28")
  const [textColor, setTextColor] = useState("text-white")
  const [isAuthPanelOpen, setIsAuthPanelOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [userType, setUserType] = useState('student')

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const screenHeight = window.innerHeight
      const scrollThreshold = screenHeight * 0.95

      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setNavbarHeight("h-28")
      } else {
        setNavbarHeight("h-20 xl:h-28")
      }

      if (window.scrollY > scrollThreshold) {
        setTextColor("text-black")
      } else {
        setTextColor("text-white")
      }

      lastScrollY = window.scrollY
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
      <header className={`w-screen ${navbarHeight} px-6 h-28 md:px-14 transition-all duration-300 flex flex-row justify-between items-center border-b border-gray-100 z-50`}>
        <div className="cursor-pointer">
          <span className="flex justify-center items-center gap-10" style={{ color: "#6536ff" }}>
            <img src={Logo} alt="" className="w-[75px] h-[75px]"/>
            <span className="font-gilroyEB text-5xl">TrustiFy</span>
          </span>
        </div>

        <div className="w-[700px] h-full flex flex-row justify-between items-center">
          <NavLink
            to="#home"
            className="px-4 py-2 transition-all duration-300 w-[100px] flex flex-row justify-center items-center font-albulaRegular text-black hover:text-[#6536ff]"
            onClick={() => window.scrollTo({ top: document.getElementById("home").offsetTop, behavior: "smooth" })}
          >
            Home
          </NavLink>

          <NavLink
            to="#about"
            className="px-4 py-2 transition-all duration-300 w-[100px] flex flex-row justify-center items-center font-albulaRegular text-black hover:text-[#6536ff]"
            onClick={() => window.scrollTo({ top: document.getElementById("about").offsetTop, behavior: "smooth" })}
          >
            About
          </NavLink>

          <NavLink
            to="#team"
            className="px-4 py-2 transition-all duration-300 w-[100px] flex flex-row justify-center items-center font-albulaRegular text-black hover:text-[#6536ff]"
            onClick={() => window.scrollTo({ top: document.getElementById("team").offsetTop, behavior: "smooth" })}
          >
            Team
          </NavLink>

          <button
            onClick={handleStudentLogin}
            className="px-6 py-2 transition-all border border-black duration-100 rounded-full bg-white text-black hover:bg-gray-50 flex flex-row justify-center items-center font-albulaLight"
          >
            Student Login
          </button>

          <button
            onClick={handleCompanyLogin}
            className="px-6 py-2 transition-all border border-black duration-100 rounded-full bg-white text-black hover:bg-gray-50 flex flex-row justify-center items-center font-albulaLight"
          >
            Company Login
          </button>
        </div>
      </header>

      <AuthPanel 
        isOpen={isAuthPanelOpen} 
        onClose={() => setIsAuthPanelOpen(false)} 
        initialMode={authMode}
        userType={userType}
      />
    </>
  )
}

export default Header