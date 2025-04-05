import { NavLink } from 'react-router-dom';
import Home from '/public/icons/home.png'
import Upload from '/public/icons/upload.png'
import Gear from '/public/icons/setting.png'
import Exit from '/public/icons/exit.png'
import Logo from '../../../assets/images/illustration/logo.png'

import { useParams } from 'react-router-dom';
import { LogOut } from 'lucide-react';

function CompanyDashboardLayout() {
    const { companyId } = useParams();
    return (
        <>
            <main className='bg-white w-screen h-screen p-6'>
                <nav className="w-[125px] h-full flex flex-col justify-between items-center bg-[#6d69f7] rounded-full shadow-2xl py-10">
                    <div>
                        <img src={Logo} alt="Verified Logo" className='w-[75px] h-[75px] invert'/>
                    </div>

                    <div className='h-full flex flex-col items-center justify-center mt-10 gap-10'>
                        <NavLink 
                            to={`/company/dashboard/${companyId}`}
                            className={({ isActive }) => 
                                `p-5 rounded-full transition-all ease-in-out ${isActive ? 'bg-[#9392fb]' : 'hover:bg-[#9392fb]'}`
                            }
                        >
                            <img src={Home} alt="Dashboard" className='invert w-[30px] h-[30px]' />
                        </NavLink>

                        <NavLink 
                            to={`/company/upload/${companyId}`}
                            className={({ isActive }) => 
                                `p-5 rounded-full transition-all ease-in-out ${isActive ? 'bg-[#9392fb]' : 'hover:bg-[#9392fb]'}`
                            }
                        >
                            <img src={Upload} alt="Upload Link" className='invert w-[30px] h-[30px]' />
                        </NavLink>

                        <NavLink 
                            to={`/company/settings/${companyId}`}
                            className={({ isActive }) => 
                                `p-5 rounded-full transition-all ease-in-out ${isActive ? 'bg-[#9392fb]' : 'hover:bg-[#9392fb]'}`
                            }
                        >
                            <img src={Gear} alt="Settings Link" className='invert w-[30px] h-[30px]' />
                        </NavLink>
                    </div>

                    <NavLink to='/' className="group p-5 hover:bg-rose-100 rounded-full transition-all ease-in-out">
                        <LogOut className="w-[30px] h-[30px] text-white group-hover:text-rose-500 transition-colors duration-300" />
                    </NavLink>
                </nav>
            </main>
        </>
    );
}

export default CompanyDashboardLayout;