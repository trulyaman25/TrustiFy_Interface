"use client"
import { useState } from "react"
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
          <header
            className={`w-full h-full px-6 md:px-14 transition-all duration-300 flex flex-row justify-between items-center border-b border-gray-100 z-50`}
          >
            <div className="cursor-pointer flex flex-row justify-center items-center gap-20">
              <span className="flex justify-center items-center gap-4" style={{ color: "#6536ff" }}>
                <img src={Logo || "/placeholder.svg"} alt="" className="w-[65px] h-[65px]" />
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
              <button
                onClick={handleStudentLogin}
                className="px-6 py-2 transition-all duration-100 rounded-full bg-white text-black hover:bg-gray-100 flex flex-row justify-center items-center font-albulaLight"
              >
                Student Login
              </button>

              <button
                onClick={handleCompanyLogin}
                className="px-6 py-2 bg-gray-800 hover:bg-gray-950 text-white transition-all border border-black duration-100 rounded-full  flex flex-row justify-center items-center font-albulaLight"
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
        </div>

        <div
          id="home"
          className="w-full h-[calc(100%-110px)] bg-gradient-to-b from-[#dcecf9] to-[#fcfeff] rounded-3xl overflow-auto hide-scrollbar p-10"
        >
          <div className="w-full h-full flex flex-col justify-center items-center gap-5">
            <div>
              <div className="text-5xl text-center font-googleSansBold capitalize mb-5">your digital dateway to</div>
              <div className="text-5xl text-center font-googleSansBold capitalize">verified documents & profile</div>
            </div>

            <div className="text-center text-xl font-googleSansLight capitalize mb-5">
              from academic credentials to professional profiles, streamline verification using AI and secure
              infrastructure
            </div>

            <div className="flex flex-row justify-center items-center gap-1 p-1 border border-gray-300 rounded-full">
              <button className="rounded-full font-googleSansBlack text-xl bg-gray-950 hover:bg-slate-950 text-white transition-all ease-in-out duration-100 flex flex-row justify-center items-center gap-3 p-1 pr-7 py-1">
                <span className="w-[44px] h-[44px] bg-white text-gray-950 rounded-full flex items-center justify-center">
                  {" "}
                  ➔{" "}
                </span>
                <span className="font-googleSansMedium">Get Started</span>
              </button>

              <button className="px-7 py-3 rounded-full font-googleSansMedium text-xl transition-all ease-in-out duration-100">
                learn more
              </button>
            </div>
			<div className="w-full mt-32"> {/* Changed from mt-auto pt-20 to mt-32 */}
  <p className="text-center text-gray-500 mb-4">Tech Stack Used</p>
  <div className="w-full overflow-hidden">
    <div className="flex justify-center items-center gap-16 animate-[marquee_20s_linear_infinite]">
      <div className="flex gap-16 shrink-0">
        {techStackImages.map((tech, index) => (
          <div key={index} className="relative group">
            <img 
              src={tech.src} 
              alt={tech.alt} 
              className="w-16 h-16 object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            />
          </div>
        ))}
      </div>
      {/* Duplicate set for seamless loop with same styles */}
      <div className="flex gap-8 shrink-0">
        {/* Duplicate the above images with same classes */}
        {/* ... */}
      </div>
    </div>
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

