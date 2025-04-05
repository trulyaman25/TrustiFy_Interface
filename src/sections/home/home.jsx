"use client"
import { useState } from "react"
import { NavLink, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useTypewriter } from "react-simple-typewriter"
import mosaicDesign from '../../assets/images/illustration/mosaicDesign.png'

export default function Home() {
  const [typeEffect] = useTypewriter({
    words: ["Reliability", "Security"],
    loop: true,
    typeSpeed: 30,
    deleteSpeed: 10,
  })

  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div
        id="home"
        className="max-h-[calc(100% - 112px)] w-full flex flex-col lg:flex-row justify-center gap-28 items-center relative p-4 sm:p-6 md:p-12 lg:px-24 lg:py-16"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={mosaicDesign}
            alt="Mosaic Design"
            className="w-full h-fit object-cover opacity-20"
          />
        </div>

        {/* Left column */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-start space-y-6 md:space-y-8 z-10 ">
          <div className="font-bold text-black w-full break-words">
            <div className="text-xs font-noirProRedular sm:text-sm uppercase tracking-[2px] mt-4 text-green-700">
              Streamlining Document Verification Process with Unmatched Efficiency
            </div>

            <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-noirProBold tracking-tight leading-tight">
              Empowering You to Verify Your Document with <span className="text-green-600">{typeEffect}</span>|
            </h1>
          </div>

          {/* Buttons */}
          <div className="w-full sm:w-auto mt-6 sm:mt-8 md:mt-12 font-noirProRedular">
            {isAuthenticated ? (
              <div className="flex flex-row justify-center items-center gap-x-4">
                <Link
                  to="/student/dashboard"
                  className="px-6 py-3 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition-colors"
                >
                  Jump To Dashboard
                </Link>
                <button
                  className="px-6 py-3 border border-green-600 text-green-600 rounded-full font-medium hover:bg-green-50 transition-colors ml-4"
                  onClick={() => logout()}
                >
                  Log Out
                </button>
              </div>
            ) : (
              <button
                className="px-8 py-4 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition-colors"
                onClick={() => loginWithRedirect()}
              >
                Get Started
              </button>
            )}
          </div>
        </div>

        {/* Right column - Phone mockup */}
        <div className="w-[300px] flex justify-center mt-4 lg:mt-0 z-10">
          <div className="relative w-[200px] sm:w-[240px] md:w-[280px] lg:w-[320px] aspect-[9/16]">
            {/* Phone Frame */}
            <div className="absolute inset-0 bg-white rounded-[24px] border-3 border-black overflow-hidden shadow-lg">
              {/* Phone Screen Content */}
              <div className="h-full flex flex-col">
                {/* Top Half - Face Recognition */}
                <div className="h-1/2 bg-gray-100 flex items-center justify-center relative">
                  <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
                    <img src="/placeholder.svg?height=64&width=64" alt="User face" className="w-16 h-16 object-cover" />
                  </div>
                </div>

                {/* Middle Section - Green Circle with Icon */}
                <div className="h-12 flex justify-center relative -mt-6">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
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
                        <path d="M5 5L35 35" stroke="#00A86B" strokeWidth="4" />
                        <path d="M15 5L35 25" stroke="#00A86B" strokeWidth="4" />
                        <path d="M25 5L35 15" stroke="#00A86B" strokeWidth="4" />
                      </svg>
                    </div>
                  </div>
                  <div className="bg-green-600"></div>
                  <div className="bg-green-700"></div>
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

      {/* About Section */}
      <section id="about" className="w-full py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
          <div className="w-full md:w-1/2 pr-0 md:pr-12 mb-12 md:mb-0">
            <h2 className="text-lg font-light tracking-widest text-green-700">About Trustify</h2>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-3 text-black">
              Revolutionizing Document Verification
            </h1>
            <p className="text-slate-500 text-sm md:text-base mt-8">
              Trustify is an advanced platform that automates the verification process, making it faster, more reliable,
              and easily accessible to users. By combining AI/ML technologies, blockchain, and decentralized storage
              solutions, we ensure your Document are secure and efficient.
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-64 h-[400px]">
              <div className="absolute inset-0 bg-white rounded-[32px] border-4 border-black overflow-hidden shadow-lg">
                <div className="h-full flex flex-col items-center justify-center p-8">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-6">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M16 4C9.383 4 4 9.383 4 16C4 22.617 9.383 28 16 28C22.617 28 28 22.617 28 16C28 9.383 22.617 4 16 4ZM14 21.414L8.586 16L10 14.586L14 18.586L22 10.586L23.414 12L14 21.414Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-center">Secure Verification</h3>
                  <p className="text-center text-gray-600">
                    Our advanced security protocols ensure your Document information is always protected.
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
              <div className="absolute inset-0 bg-white rounded-[32px] border-4 border-black overflow-hidden shadow-lg">
                <div className="h-full flex flex-col items-center justify-center p-8">
                  <div className="w-16 h-16 bg-green-700 rounded-full flex items-center justify-center mb-6">
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
                    Process Document quickly and securely with our streamlined verification system.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 pl-0 md:pl-12">
            <h2 className="text-lg font-light tracking-widest text-green-700">Secure Payment Verification Solution</h2>
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
          <h2 className="text-base sm:text-lg font-light tracking-widest text-green-600">Ready to get started?</h2>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            Experience the future of payment verification
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Join thousands of businesses that trust Trustify for secure, efficient payment processing and verification.
          </p>
          <button className="w-full sm:w-auto mt-8 bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium hover:bg-green-700 transition-colors">
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  )
}

