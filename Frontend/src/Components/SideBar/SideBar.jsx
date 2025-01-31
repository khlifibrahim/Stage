import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import MenuBtn from '../Utilities/MenuBtn';
import logo from '../../assets/small-logo.png';

function SideBar({ role }) {
    const [isSubMenuOpen, setIsSubMenuOpen] = useState({})
    // console.log("menu status: ", isSubMenuOpen)
    const toggleSubMenu = (menuContent) => {
    if(menuContent.subMenu) {
        setIsSubMenuOpen(prevState => ({
            ...prevState,
            [menuContent]: !prevState[menuContent.content]
        }));
    }    
    }

    // console.log(role)
    const permissions = JSON.parse(localStorage.getItem('permissions'))
    // console.log("Permissions from localstorage - dashboard: ", permissions.dashboard)
    // console.log("Permissions from localstorage - orderMission: ", permissions.orderMission)
    // console.log("Permissions from localstorage - profile: ", permissions.userProfile)
    
    const rolePermissions = {
        "DIRECTEUR": ["Dashboard", "Missions", "Voitures"],
        "CHEFSERVICE": ["Dashboard", "Missions"],
        "CADRE": ["Missions"],
        "SECRÉTAIRE": ["Missions"]
    }

    const menuListLink = [
        {
            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:stroke-blue icon icon-tabler icons-tabler-outline icon-tabler-layout-dashboard"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 4h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" /><path d="M5 16h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" /><path d="M15 12h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" /><path d="M15 4h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" /></svg>),
            content: 'Dashboard',
            path: "/dashboard",
            
        },
        {
            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:stroke-blue icon icon-tabler icons-tabler-outline icon-tabler-clipboard-data"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" /><path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" /><path d="M9 17v-4" /><path d="M12 17v-1" /><path d="M15 17v-2" /><path d="M12 17v-1" /></svg>),
            content: 'Mission',
            subMenu: [
                {
                    icon: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="hover:stroke-blue icon icon-tabler icons-tabler-outline icon-tabler-clipboard-text"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" /><path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" /><path d="M9 12h6" /><path d="M9 16h6" /></svg>),
                    content: 'Liste Mission',
                    path: 'listMission'
                },
                {
                    icon: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:stroke-blue icon icon-tabler icons-tabler-outline icon-tabler-clipboard-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" /><path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" /><path d="M10 14h4" /><path d="M12 12v4" /></svg>),
                    content: 'Nouv. Mission',
                    path: 'addMission'
                },

            ],
        },
        {
            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:stroke-blue icon icon-tabler icons-tabler-outline icon-tabler-user"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>),
            content: 'Cadres',
            subMenu: [
                {
                    icon: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:stroke-blue icon icon-tabler icons-tabler-outline icon-tabler-users-group"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" /><path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M17 10h2a2 2 0 0 1 2 2v1" /><path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M3 13v-1a2 2 0 0 1 2 -2h2" /></svg>),
                    content: 'Ajouter Cadre'
                }
            ]
        },
        {
            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:stroke-blue icon icon-tabler icons-tabler-outline icon-tabler-car"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M5 17h-2v-6l2 -5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5" /></svg>),
            content: 'Voitures'
        },
    ];

    const filteredMenu = menuListLink.filter(item => 
        rolePermissions[role]?.includes(item.content)
    );

  return (
    <div className='min-w-[280px] w-[280px] h-screen overflow-y-hidden flex flex-col gap-6 border-r border-r-[#B6B6B6] '>
        <div className="head flex items-center gap-3 p-6">
            <img src={logo} className='!w-[47px] ' alt="MCINET.GOV.MA" />
            <p className='font-poppins font-semibold leading-[140%] text-[20px] '>MCINET</p>
        </div>
          <div className="menu px-6 flex flex-col gap-2">
              {
               menuListLink.map((menuContent, i) => {
                if( rolePermissions[role] && rolePermissions[role].includes(menuContent.content)) {
                    return (
                        <MenuBtn key={i} icon={menuContent.icon} content={menuContent.content} />
                    )
                }
               })
              }
          </div>
    </div>
  )
}

export default SideBar;