"use client"
import logoImage from "../../assets/images/illustration/logo.png"
import { useState } from "react"
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useTypewriter } from "react-simple-typewriter"

export default function Home() {
  const [typeEffect] = useTypewriter({
    words: ["Reliability", "Security"],
    loop: true,
    typeSpeed: 30,
    deleteSpeed: 10,
  })

  // Simulating authentication state for the UI
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div
        id="home"
        className="min-h-screen w-full flex flex-col lg:flex-row justify-between items-center relative p-4 sm:p-6 md:p-12 lg:p-24 gradient-background"
      >
        {/* Left column */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-start space-y-6 md:space-y-8">
          <div className="font-bold text-black w-full break-words">
            <div className="relative w-12 h-12 sm:w-16 sm:h-16 mb-4">
              <svg width="64" height="64" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M147.5 300C229.037 300 295 233.037 295 151.5C295 69.9628 229.037 3 147.5 3C65.9628 3 0 69.9628 0 151.5C0 233.037 65.9628 300 147.5 300Z"
                  fill="white"
                />
                <path d="M230.5 90L135 185.5L90 140.5L60 170.5L135 245.5L260.5 120L230.5 90Z" fill="black" />
                <path d="M230 90L205 65L180 90L205 115L230 90Z" fill="white" />
              </svg>
            </div>

            <div className="text-xs sm:text-sm uppercase tracking-[2px] mt-4">
              Streamlining Payment Verification Process with Unmatched Efficiency
            </div>

            <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight">
              Empowering You to Verify Your Payments with <span className="text-[#00E5C7]">{typeEffect}</span>|
            </h1>
          </div>

          {/* Buttons */}
          <div className="w-full sm:w-auto mt-6 sm:mt-8 md:mt-12">
          {isAuthenticated ? (
                <div className="flex flex-row justify-center items-center gap-x-4">
                    <NavLink to="/student/dashboard" className="styled-button w-[236px]">Jump To Dashboard</NavLink>
                    <NavLink className="logoutButton h-[30px] w-[100px] ml-[50px]" onClick={() => logout({ returnTo: window.location.origin })}>Log Out</NavLink>
                </div>
            ) : (
                <NavLink className="styled-button w-[150px] mt-[70px]" onClick={() => loginWithRedirect()}> Get Started </NavLink>
            )}
          </div>
        </div>

        {/* Right column - Phone mockup */}
        <div className="w-full lg:w-1/2 flex justify-center mt-12 lg:mt-0">
          <div className="relative w-[200px] sm:w-[240px] md:w-[280px] lg:w-[320px] aspect-[9/16]">
            {/* Phone Frame */}
            <div className="absolute inset-0 bg-gray-100 rounded-[24px] border-3 border-black overflow-hidden shadow-lg">
              {/* Phone Screen Content */}
              <div className="h-full flex flex-col">
                {/* Top Half - Face Recognition */}
                <div className="h-1/2 bg-gray-200 flex items-center justify-center relative">
                  <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden">
                    <img
                      src="/placeholder.svg"
                      alt="User face"
                      className="w-16 h-16 object-cover"
                    />
                  </div>
                </div>

                {/* Middle Section - Teal Circle with Icon */}
                <div className="h-12 flex justify-center relative -mt-6">
                  <div className="w-12 h-12 bg-[#00E5C7] rounded-full flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 3C7.032 3 3 7.032 3 12C3 16.968 7.032 21 12 21C16.968 21 21 16.968 21 12C21 7.032 16.968 3 12 3ZM10.5 16.06L6.44 12L7.5 10.94L10.5 13.94L16.5 7.94L17.56 9L10.5 16.06Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                </div>

                {/* Text Section */}
                <div className="text-center text-[10px] mt-1">
                  <p>Your face. Your password.</p>
                </div>

                {/* Bottom Half - Geometric Pattern */}
                <div className="flex-grow mt-2 grid grid-cols-2 grid-rows-2">
                  <div className="bg-white border border-gray-200 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 5L35 35" stroke="#0047FF" strokeWidth="4" />
                        <path d="M15 5L35 25" stroke="#0047FF" strokeWidth="4" />
                        <path d="M25 5L35 15" stroke="#0047FF" strokeWidth="4" />
                      </svg>
                    </div>
                  </div>
                  <div className="bg-[#00E5C7]"></div>
                  <div className="bg-[#0047FF]"></div>
                  <div className="bg-white border border-gray-200 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 35L35 5" stroke="black" strokeWidth="2" strokeDasharray="4 4" />
                        <path d="M5 25L25 5" stroke="black" strokeWidth="2" strokeDasharray="4 4" />
                        <path d="M5 15L15 5" stroke="black" strokeWidth="2" strokeDasharray="4 4" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment And Checkout Section */}
      <div className="w-full py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto bg-white rounded-[32px] overflow-hidden shadow-xl border border-gray-100">
          <div className="flex flex-col md:flex-row p-4 sm:p-6 md:p-12 items-center">
            {/* Left Column */}
            <div className="w-full md:w-1/2 pr-0 md:pr-8 mb-8 md:mb-0 space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Payment And<br />Checkout
              </h1>
              
              <p className="text-gray-800 max-w-md text-sm sm:text-base">
                Keep more money from each and every sale. And save your customers time while protecting their privacy.
                Here's how Trustify helps you do it.
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="bg-black rounded-full p-5 flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M16 4C9.383 4 4 9.383 4 16C4 22.617 9.383 28 16 28C22.617 28 28 22.617 28 16C28 9.383 22.617 4 16 4ZM14 21.414L8.586 16L10 14.586L14 18.586L22 10.586L23.414 12L14 21.414Z"
                      fill="#00E5C7"
                    />
                  </svg>
                </div>

                <div>
                  <h3 className="text-sm font-bold tracking-wider uppercase mb-2">
                    SMOOTH, SIMPLE, SECURE USER EXPERIENCE
                  </h3>
                  <p className="text-gray-800 max-w-xs">
                    Paying with Trustify is quick and easy. Your customers just tap the Trustify Pay button, approve
                    with their face or fingerprint, and everything goes through in one seamless transaction.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative w-[280px] sm:w-[320px] md:w-[360px] aspect-[9/16]">
                {/* Phone Frame */}
                <div className="absolute inset-0 bg-gray-100 rounded-[32px] border-4 border-black overflow-hidden shadow-lg">
                  {/* Phone Screen Content */}
                  <div className="h-full flex flex-col">
                    {/* Top Half - Face Recognition */}
                    <div className="h-1/2 bg-gray-200 flex items-center justify-center relative">
                      <div className="w-24 h-24 bg-gray-300 rounded-full overflow-hidden">
                        <img
                          src="/placeholder.svg"
                          alt="User face"
                          className="w-24 h-24 object-cover"
                        />
                      </div>
                    </div>

                    {/* Middle Section - Teal Circle with Icon */}
                    <div className="h-16 flex justify-center relative -mt-8">
                      <div className="w-16 h-16 bg-[#00E5C7] rounded-full flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M12 3C7.032 3 3 7.032 3 12C3 16.968 7.032 21 12 21C16.968 21 21 16.968 21 12C21 7.032 16.968 3 12 3ZM10.5 16.06L6.44 12L7.5 10.94L10.5 13.94L16.5 7.94L17.56 9L10.5 16.06Z"
                            fill="black"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Text Section */}
                    <div className="text-center text-sm mt-2">
                      <p>Your face. Your password.</p>
                    </div>

                    {/* Bottom Half - Geometric Pattern */}
                    <div className="flex-grow mt-4 grid grid-cols-2 grid-rows-2">
                      <div className="bg-white border border-gray-200 relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg
                            width="40"
                            height="40"
                            viewBox="0 0 40 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M5 5L35 35" stroke="#0047FF" strokeWidth="4" />
                            <path d="M15 5L35 25" stroke="#0047FF" strokeWidth="4" />
                            <path d="M25 5L35 15" stroke="#0047FF" strokeWidth="4" />
                          </svg>
                        </div>
                      </div>
                      <div className="bg-[#00E5C7]"></div>
                      <div className="bg-[#0047FF]"></div>
                      <div className="bg-white border border-gray-200 relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg
                            width="40"
                            height="40"
                            viewBox="0 0 40 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M5 35L35 5" stroke="black" strokeWidth="2" strokeDasharray="4 4" />
                            <path d="M5 25L25 5" stroke="black" strokeWidth="2" strokeDasharray="4 4" />
                            <path d="M5 15L15 5" stroke="black" strokeWidth="2" strokeDasharray="4 4" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="w-full py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
          <div className="w-full md:w-1/2 pr-0 md:pr-12 mb-12 md:mb-0">
            <h2 className="text-lg font-light tracking-widest">About Trustify</h2>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-3 text-black">
              Revolutionizing Payment Verification
            </h1>
            <p className="text-slate-500 text-sm md:text-base mt-8">
              Trustify is an advanced platform that automates the verification process, making it faster, more reliable,
              and easily accessible to users. By combining AI/ML technologies, blockchain, and decentralized storage
              solutions, we ensure your payments are secure and efficient.
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-64 h-[400px]">
              <div className="absolute inset-0 bg-gray-100 rounded-[32px] border-4 border-black overflow-hidden shadow-lg">
                <div className="h-full flex flex-col items-center justify-center p-8">
                  <div className="w-16 h-16 bg-[#00E5C7] rounded-full flex items-center justify-center mb-6">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M16 4C9.383 4 4 9.383 4 16C4 22.617 9.383 28 16 28C22.617 28 28 22.617 28 16C28 9.383 22.617 4 16 4ZM14 21.414L8.586 16L10 14.586L14 18.586L22 10.586L23.414 12L14 21.414Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-center">Secure Verification</h3>
                  <p className="text-center text-gray-600">
                    Our advanced security protocols ensure your payment information is always protected.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full py-12 sm:py-16 md:py-24 lg:py-32 bg-gray-50 px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row justify-between items-center gap-8 md:gap-12">
          <div className="w-full md:w-1/2 flex justify-center mt-12 md:mt-0">
            <div className="relative w-64 h-[400px]">
              <div className="absolute inset-0 bg-gray-100 rounded-[32px] border-4 border-black overflow-hidden shadow-lg">
                <div className="h-full flex flex-col items-center justify-center p-8">
                  <div className="w-16 h-16 bg-[#0047FF] rounded-full flex items-center justify-center mb-6">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M24 8H8C6.89543 8 6 8.89543 6 10V22C6 23.1046 6.89543 24 8 24H24C25.1046 24 26 23.1046 26 22V10C26 8.89543 25.1046 8 24 8Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16 20C18.2091 20 20 18.2091 20 16C20 13.7909 18.2091 12 16 12C13.7909 12 12 13.7909 12 16C12 18.2091 13.7909 20 16 20Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-center">Fast Payments</h3>
                  <p className="text-center text-gray-600">
                    Process payments quickly and securely with our streamlined verification system.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 pl-0 md:pl-12">
            <h2 className="text-lg font-light tracking-widest">Secure Payment Verification Solution</h2>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-3 text-black">Why Choose Trustify?</h1>
            <p className="text-slate-500 text-sm md:text-base mt-8">
              Our platform employs advanced AI and machine learning for precise payment analysis, coupled with
              blockchain technology for tamper-proof security, guaranteeing the integrity of your sensitive information.
            </p>
            <p className="text-slate-500 text-sm md:text-base mt-4">
              With decentralized storage via IPFS, your payment data is always accessible and protected from data loss.
              Our user-friendly dashboard offers clear insights into your verification status, and robust authentication
              ensures that only authorized users can access their data.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-base sm:text-lg font-light tracking-widest text-[#00E5C7]">
            Ready to get started?
          </h2>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            Experience the future of payment verification
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Join thousands of businesses that trust Trustify for secure, efficient payment processing and verification.
          </p>
          <button className="w-full sm:w-auto mt-8 bg-[#00E5C7] text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium hover:bg-opacity-90 transition-colors">
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  )
}

