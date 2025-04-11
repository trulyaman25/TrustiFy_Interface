"use client"
import { useState, useEffect, useRef } from "react"
import Lottie from "lottie-react";
import { NavLink } from "react-router-dom"
import logo from "../../assets/images/illustration/logo.png"
import linkedInIcon from '../../assets/icons/linkedinLogoSVG.svg'
import instagramIcon from '../../assets/icons/instagramLogoSVG.svg'
import teamData from '../../data/teamMembers.json';
const teamMembers = teamData; // Add this line after imports if needed
import { motion } from "framer-motion";
import Logo from "../../assets/images/illustration/logo.png"
import AuthPanel from "../../sections/auth/AuthPanel"
import DownArrow from "../../assets/animations/downArrow.json" // Add this import

// Add these animation variants before the Home component
const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const slideAnimation = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const techStackImages = [
  { src: "https://cdn.worldvectorlogo.com/logos/react-2.svg", alt: "React" },
  { src: "https://cdn.worldvectorlogo.com/logos/tailwind-css-2.svg", alt: "Tailwind CSS" },
  { src: "https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg", alt: "MongoDB" },
  { src: "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg", alt: "Node.js" },
  { src: "https://cdn.worldvectorlogo.com/logos/flask.svg", alt: "Flask" },
  { src: "https://cdn.worldvectorlogo.com/logos/html-1.svg", alt: "HTML5" },
  { src: "https://opencv.org/wp-content/uploads/2020/07/OpenCV_logo_no_text-1.png", alt: "OpenCV" },
  { src: "https://cdn.worldvectorlogo.com/logos/github-icon-1.svg", alt: "GitHub" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/7/78/Tesseract_OCR_logo_%28Google%29.png", alt: "Tesseract" }
];

function Home() {
  const [isAuthPanelOpen, setIsAuthPanelOpen] = useState(false)
  const [authMode, setAuthMode] = useState("login")
  const [userType, setUserType] = useState("student")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const marqueeRef = useRef(null);

  useEffect(() => {
    const updateScale = () => {
      if (!marqueeRef.current) return;
      
      const items = marqueeRef.current.getElementsByClassName('tech-item');
      const containerCenter = marqueeRef.current.offsetWidth / 2;
      
      Array.from(items).forEach(item => {
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.left + (rect.width / 2);
        const distanceFromCenter = Math.abs(containerCenter - itemCenter) / containerCenter;
        item.style.setProperty('--distance-from-center', distanceFromCenter.toString());
      });
    };

    updateScale();
    const interval = setInterval(updateScale, 100); // Update regularly during animation

    return () => clearInterval(interval);
  }, []);

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
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-50 flex flex-col p-4">
          <div className="flex justify-end">
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col items-center gap-6 mt-10">
            <NavLink to="" className="px-4 py-2 w-full text-center text-lg font-googleSansLight hover:text-[#6536ff]" 
              onClick={() => {
                window.scrollTo({ top: document.getElementById("home").offsetTop, behavior: "smooth" });
                setIsMobileMenuOpen(false);
              }}>
              Home
            </NavLink>
            <NavLink to="" className="px-4 py-2 w-full text-center text-lg font-googleSansLight hover:text-[#6536ff]"
              onClick={() => {
                window.scrollTo({ top: document.getElementById("about").offsetTop, behavior: "smooth" });
                setIsMobileMenuOpen(false);
              }}>
              About
            </NavLink>
            <NavLink to="" className="px-4 py-2 w-full text-center text-lg font-googleSansLight hover:text-[#6536ff]"
              onClick={() => {
                window.scrollTo({ top: document.getElementById("team").offsetTop, behavior: "smooth" });
                setIsMobileMenuOpen(false);
              }}>
              Team
            </NavLink>
            <NavLink to="" className="px-4 py-2 w-full text-center text-lg font-googleSansLight hover:text-[#6536ff]"
              onClick={() => {
                window.scrollTo({ top: document.getElementById("contact").offsetTop, behavior: "smooth" });
                setIsMobileMenuOpen(false);
              }}>
              Contact Us
            </NavLink>
          </div>
        </div>
      )}

      <div className="fixed h-screen w-screen px-2 md:px-4">
        <div className="w-full h-[90px]">
          <header className="w-full h-full px-4 md:px-14 transition-all duration-300 flex flex-col md:flex-row justify-between items-center border-b border-gray-100 z-50 bg-white">
            {/* Logo Section */}
            <div className="flex items-center justify-between w-full md:w-auto py-4 md:py-0">
              <div className="flex items-center gap-2 md:gap-4" style={{ color: "#6536ff" }}>
                <img src={Logo || "/placeholder.svg"} alt="" className="w-[40px] h-[40px] md:w-[65px] md:h-[65px]" />
                <span className="font-googleSansBold text-xl md:text-4xl capitalize text-gray-900">verified</span>
              </div>
              
              {/* Mobile Menu Toggle */}
              <button 
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <NavLink to="" className="px-4 py-2 transition-all duration-300 font-googleSansLight text-black hover:text-[#6536ff]" 
                onClick={() => window.scrollTo({ top: document.getElementById("home").offsetTop, behavior: "smooth" })}>
                Home
              </NavLink>
              <NavLink to="" className="px-4 py-2 transition-all duration-300 font-googleSansLight text-black hover:text-[#6536ff]"
                onClick={() => window.scrollTo({ top: document.getElementById("about").offsetTop, behavior: "smooth" })}>
                About
              </NavLink>
              <NavLink to="" className="px-4 py-2 transition-all duration-300 font-googleSansLight text-black hover:text-[#6536ff]"
                onClick={() => window.scrollTo({ top: document.getElementById("team").offsetTop, behavior: "smooth" })}>
                Team
              </NavLink>
              <NavLink to="" className="px-4 py-2 transition-all duration-300 font-googleSansLight text-black hover:text-[#6536ff]"
                onClick={() => window.scrollTo({ top: document.getElementById("contact").offsetTop, behavior: "smooth" })}>
                Contact
              </NavLink>
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={handleStudentLogin}
                className="px-6 py-2 transition-all duration-300 rounded-full bg-white text-black hover:bg-gray-100 border border-gray-300 text-sm font-googleSansRegular"
              >
                Student Login
              </button>
              <button
                onClick={handleCompanyLogin}
                className="px-6 py-2 transition-all duration-300 rounded-full bg-gray-900 text-white hover:bg-gray-800 text-sm font-googleSansRegular"
              >
                Company Login
              </button>
            </div>
          </header>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="fixed inset-0 bg-white z-50 md:hidden">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-4 border-b">
                  <div className="flex items-center gap-2" style={{ color: "#6536ff" }}>
                    <img src={Logo || "/placeholder.svg"} alt="" className="w-[40px] h-[40px]" />
                    <span className="font-googleSansBold text-xl capitalize text-gray-900">verified</span>
                  </div>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <nav className="flex flex-col p-4 gap-4">
                  <NavLink to="" className="px-4 py-3 text-lg font-googleSansLight hover:text-[#6536ff] hover:bg-gray-50 rounded-lg"
                    onClick={() => { window.scrollTo({ top: document.getElementById("home").offsetTop, behavior: "smooth" }); setIsMobileMenuOpen(false); }}>
                    Home
                  </NavLink>
                  <NavLink to="" className="px-4 py-3 text-lg font-googleSansLight hover:text-[#6536ff] hover:bg-gray-50 rounded-lg"
                    onClick={() => { window.scrollTo({ top: document.getElementById("about").offsetTop, behavior: "smooth" }); setIsMobileMenuOpen(false); }}>
                    About
                  </NavLink>
                  <NavLink to="" className="px-4 py-3 text-lg font-googleSansLight hover:text-[#6536ff] hover:bg-gray-50 rounded-lg"
                    onClick={() => { window.scrollTo({ top: document.getElementById("team").offsetTop, behavior: "smooth" }); setIsMobileMenuOpen(false); }}>
                    Team
                  </NavLink>
                  <NavLink to="" className="px-4 py-3 text-lg font-googleSansLight hover:text-[#6536ff] hover:bg-gray-50 rounded-lg"
                    onClick={() => { window.scrollTo({ top: document.getElementById("contact").offsetTop, behavior: "smooth" }); setIsMobileMenuOpen(false); }}>
                    Contact
                  </NavLink>
                </nav>

                <div className="mt-auto p-4 space-y-4">
                  <button
                    onClick={() => { handleStudentLogin(); setIsMobileMenuOpen(false); }}
                    className="w-full py-3 transition-all duration-300 rounded-full bg-white text-black hover:bg-gray-100 border border-gray-300 text-sm font-googleSansRegular"
                  >
                    Student Login
                  </button>
                  <button
                    onClick={() => { handleCompanyLogin(); setIsMobileMenuOpen(false); }}
                    className="w-full py-3 transition-all duration-300 rounded-full bg-gray-900 text-white hover:bg-gray-800 text-sm font-googleSansRegular"
                  >
                    Company Login
                  </button>
                </div>
              </div>
            </div>
          )}
          <AuthPanel
            isOpen={isAuthPanelOpen}
            onClose={() => setIsAuthPanelOpen(false)}
            initialMode={authMode}
            userType={userType}
          />
        </div>

        <div id="home" className="w-full h-[calc(100%-110px)] bg-gradient-to-b from-[#dcecf9] to-[#fcfeff] rounded-3xl overflow-auto hide-scrollbar p-3 sm:p-5 lg:p-10" >
          <div className="w-full h-full flex flex-col justify-center items-center gap-5">
            <div>
              <div className="text-3xl md:text-5xl text-center font-googleSansBold capitalize mb-3 mt-32">
                Artificial Intelligence - Powered Resume
              </div>
              <div className="text-3xl md:text-5xl text-center font-googleSansBold capitalize">
                Verification Platform
              </div>
            </div>

            <div className="text-base md:text-xl text-center font-googleSansLight capitalize mb-5 mt-2">
              Automatically validate candidate profiles by cross-checking GitHub, LeetCode, CodeForces, and CodeChef activities.
              <br className="hidden md:block" />
              Detect resume fraud and get trustworthiness scores instantly.
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-1 p-1 md:border border-gray-300 rounded-full">
              <button className="w-full md:w-auto rounded-full font-googleSansBlack text-base md:text-xl bg-gray-950 hover:bg-slate-950 text-white transition-all ease-in-out duration-100 flex flex-row justify-center items-center gap-3 p-1 pr-4 md:pr-7 py-1">
                <span className="w-[35px] h-[35px] md:w-[44px] md:h-[44px] bg-white text-gray-950 rounded-full flex items-center justify-center">
                  ➔
                </span>
                <span className="font-googleSansMedium">Get Started</span>
              </button>

              <button className="w-full md:w-auto px-4 md:px-7 py-2 md:py-3 rounded-full font-googleSansMedium text-base md:text-xl transition-all ease-in-out duration-100">
                learn more
              </button>
            </div>

            <div className="w-full mt-32">
              <p className="text-center font-googleSansLight text-lg text-gray-500 mb-7">Tech Stack Used</p>
              <div className="w-full overflow-hidden relative">
                <div ref={marqueeRef} className="tech-marquee-wrapper flex items-center justify-center py-12">
                  <div className="tech-marquee flex items-center gap-16 animate-marquee">
                    {/* First set of images */}
                    {[...techStackImages, ...techStackImages].map((tech, index) => (
                      <div key={index} className="tech-item shrink-0">
                        <img 
                          src={tech.src} 
                          alt={tech.alt} 
                          className="w-16 h-16 cursor-pointer object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                {/* Add gradient overlays for smooth fade effect */}
              </div>
            </div>
            </div>
		  
          <section id="about" className="w-full py-16 flex flex-col md:flex-row items-center gap-8 px-4 md:px-10 mt-32">
            <div className="w-full md:w-1/3 flex justify-center">
              <img src={logo} alt="About Us" className="rounded-2xl w-full max-w-[300px]" />
            </div>
            <div className="w-full md:w-2/3 space-y-6">
              <h2 className="text-4xl md:text-5xl font-googleSansBold">
			  Verified is an AI-based platform that automates document and resume verification with speed and accuracy.
              </h2>
              <p className="text-xl font-googleSansLight">
			  Our platform is built for students, recruiters, and institutions
                <span className="text-gray-500">
                  {" "}
				  to streamline document verification.
                </span>
              </p>
              <div className="flex flex-col md:flex-row gap-10 pt-6">
                <div className="space-y-2">
                  <h3 className="text-6xl font-googleSansBold text-[#FF5733]">92%</h3>
                  <p className="text-sm font-googleSansLight">Clients Report High Satisfaction with Projects.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-6xl font-googleSansBold text-[#FF5733]">80%</h3>
                  <p className="text-sm font-googleSansLight">Designers Have Seen Increased Job Opportunities.</p>
                </div>
              </div>
            </div>
          </section>
		  

          <section id="features" className="w-full flex flex-col px-4 md:px-8 lg:px-24 py-16 mt-32 overflow-x-hidden">
            <div className="space-y-2 mb-10">
              <div className="flex items-center gap-2">
                <h2 className="text-4xl md:text-5xl font-googleSansBold">Explore</h2>
                <div className="bg-orange-300 rounded-full p-2 flex items-center justify-center">
                  <span className="text-white">💡</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-googleSansBold">Our Services</h2>
              </div>
            </div>

            <motion.div 
  className="grid grid-cols-1 md:grid-cols-5 gap-6"
  variants={staggerChildren}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  {[
    {
      icon: "📄",
      title: "Document Upload & Format Classification",
      description: "Accepts various document types (e.g. LORs, resumes) and detects format for processing."
    },
    {
      icon: "🔍",
      title: "OCR, NLP & Regex-Based Data Extraction",
      description: "Extracts key information like CGPA, name, and roll number from documents intelligently."
    },
    {
      icon: "✅",
      title: "Verification via Fuzzy Matching",
      description: "Matches extracted data with institutional records or dummy database to confirm authenticity."
    },
    {
      icon: "🔗",
      title: "Resume Link Parsing & Validation",
      description: "Automatically checks GitHub, LinkedIn, and project links using APIs and web scraping."
    },
    {
      icon: "🔐",
      title: "Digital Signature & IPFS Storage",
      description: "Digitally signs verified documents and stores them securely on IPFS for tamper-proof access."
    }
  ].map((feature, index) => (
    <motion.div
      key={index}
      variants={slideAnimation}
      whileHover={{ scale: 1.02 }} // Reduced scale to prevent overflow
      className={`p-6 rounded-3xl transition-all duration-300 ${
        index === 0 ? 'bg-black text-white' : 'bg-gray-100 text-black'
      }`}
    >
      <div className={`${
        index === 0 ? 'bg-white text-black' : 'bg-purple-400 text-white'
      } w-10 h-10 rounded-full flex items-center justify-center mb-4`}>
        <span>{feature.icon}</span>
      </div>
      <h3 className="text-2xl font-googleSansMedium mb-4">{feature.title}</h3>
      <p className="text-sm mb-6">{feature.description}</p>
    </motion.div>
  ))}
</motion.div>
          </section>

          <section id="team" className="w-full min-h-screen flex flex-col justify-center items-center px-4 md:px-8 lg:px-24 py-16 mt-32"> {/* Added mt-32 */}
                <h1 className="font-albulaLight tracking-widest uppercase text-gray-500 text-sm text-center">
                    Website Developed by <span className="text-[#227176] font-albulaBold hover:cursor-pointer">Team Binary Bots</span> for HackByte (3.0), IIITDM - Jabalpur, Crafted with Love ❤️
                </h1>

                <h1 className="font-albulaHeavy text-5xl mt-6 text-gray-800 text-center">Meet the team</h1>
                <div className="flex flex-col items-center mt-6">
                    <Lottie animationData={DownArrow} loop={true} className="w-[100px] h-[100px] hover:cursor-pointer"/>
                </div>
                
                <motion.div variants={staggerChildren}initial="hidden"whileInView="visible"viewport={{ once: true }}className="grid grid-cols-1 md:grid-cols-2 gap-32 mt-64 px-5 w-full xl:max-w-4xl 2xl:max-w-5xl" >
                    {teamMembers.map((member, index) => (
                        <motion.div key={index}variants={fadeInUp}whileHover={{ y: -8 }}className="bg-gradient-to-br from-white cursor-pointer to-gray-50 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 relative group" >
                            <div className="relative w-full h-[280px] lg:h-[220px] xl:h-[280px] 2xl:h-[400px] overflow-hidden">
                                <img src={member.img} alt={member.name} className="w-full h-full object-cover object-center transition-transform duration-500 ease-out transform group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-6">
                                    <div className="flex space-x-6">
                                        <a href={member.socialLinks[1].url} target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-all duration-200">
                                            <img src={linkedInIcon} alt="LinkedIn" className="w-8 h-8 filter brightness-0 invert"/>
                                        </a>
                                        <a href={member.socialLinks[0].url} target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-all duration-200">
                                            <img src={instagramIcon} alt="Instagram" className="w-8 h-8 filter brightness-0 invert"/>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="px-6 py-8 text-center bg-white">
                                <h2 className="text-xl font-semibold text-gray-800 uppercase font-albulaBold tracking-wider mb-2">
                                    {member.name}
                                </h2>
                                <h3 className="text-sm text-emerald-700 font-albulaLight inline-block px-4 py-1 rounded-full bg-purple-50 mb-3">
                                    {member.role}
                                </h3>

                                <p className="text-gray-500 font-albulaRegular text-sm leading-relaxed line-clamp-3">
                                    {member.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>
        </div>
      </div>
    </>
  )
}

export default Home

