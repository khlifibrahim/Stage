import React from 'react';
import { Link } from 'react-router-dom';
import MenuBtn from '../Utilities/MenuBtn';
import logo from '../../assets/small-logo.png';

function SideBar({menuListLink}) {

      

  return (
    <div className='min-w-[280px] w-[280px] h-screen flex flex-col gap-6 border-r border-r-[#B6B6B6] '>
        <div className="head flex items-center gap-3 p-6">
            <img src={logo} className='!w-[47px] ' alt="MCINET.GOV.MA" />
            <p className='font-poppins font-semibold leading-[140%] text-[20px] '>MCINET</p>
        </div>
        <div className="menu px-6 flex flex-col gap-2">
            {
                menuListLink.map((element, index) => (
                    <div>
                        <MenuBtn key={index} icon={element.icon} content={element.content} subMenu={element.subMenu}/>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default SideBar;