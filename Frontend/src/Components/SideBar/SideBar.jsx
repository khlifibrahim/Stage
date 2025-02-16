import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SIDEBAR_MENU } from '../Utilities/role.permissions'
import logo from '../../assets/small-logo.png';

function SideBar({ role }) {
    const [submenuState, setSubmenuState] = useState({});
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSubMenu = (item) => {
    setSubmenuState((prevState) => ({
        ...prevState,
        [item.content]: !prevState[item.content],
    }));
    };


    const menuListLink = [
        {
            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:stroke-blue icon icon-tabler icons-tabler-outline icon-tabler-layout-dashboard"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 4h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" /><path d="M5 16h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" /><path d="M15 12h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" /><path d="M15 4h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" /></svg>),
            content: 'Dashboard',
            path: "/dashboard",
            
        },
        {
            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:stroke-blue icon icon-tabler icons-tabler-outline icon-tabler-clipboard-data"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" /><path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" /><path d="M9 17v-4" /><path d="M12 17v-1" /><path d="M15 17v-2" /><path d="M12 17v-1" /></svg>),
            content: 'Missions',
            subMenu: [
                {
                    icon: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="hover:stroke-blue icon icon-tabler icons-tabler-outline icon-tabler-clipboard-text"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" /><path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" /><path d="M9 12h6" /><path d="M9 16h6" /></svg>),
                    content: 'List Mission',
                    path: "/dashboard/orderMissions/listMissionOrders"
                },
                {
                    icon: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:stroke-blue icon icon-tabler icons-tabler-outline icon-tabler-clipboard-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" /><path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" /><path d="M10 14h4" /><path d="M12 12v4" /></svg>),
                    content: 'Nouv. Mission',
                    path: '/dashboard/orderMissions/addMissionOrders'
                },

            ],
        },
        {
            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:stroke-blue icon icon-tabler icons-tabler-outline icon-tabler-user"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>),
            content: 'Cadres',
            subMenu: [
                {
                    icon: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:stroke-blue icon icon-tabler icons-tabler-outline icon-tabler-users-group"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" /><path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M17 10h2a2 2 0 0 1 2 2v1" /><path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M3 13v-1a2 2 0 0 1 2 -2h2" /></svg>),
                    content: 'List Cadres',
                    path:'/dashboard/ListCadre'
                }
            ],
        },
        {
            icon: (<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:stroke-blue icon icon-tabler icons-tabler-outline icon-tabler-building-store"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 21l18 0" /><path d="M9 8l1 0" /><path d="M9 12l1 0" /><path d="M9 16l1 0" /><path d="M14 8l1 0" /><path d="M14 12l1 0" /><path d="M14 16l1 0" /><path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16" /></svg>),
            content: 'Entreprise',
            subMenu: [
                {
                    icon: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:stroke-blue icon icon-tabler icons-tabler-outline icon-tabler-users-group"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 21v-15c0 -1 1 -2 2 -2h5c1 0 2 1 2 2v15" /><path d="M16 8h2c1 0 2 1 2 2v11" /><path d="M3 21h18" /><path d="M10 12v0" /><path d="M10 16v0" /><path d="M10 8v0" /><path d="M7 12v0" /><path d="M7 16v0" /><path d="M7 8v0" /><path d="M17 12v0" /><path d="M17 16v0" /></svg>),
                    content: 'List Entreprises',
                    path:'/dashboard/entreprise/list'
                },
                {
                    icon: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:stroke-blue icon icon-tabler icons-tabler-outline icon-tabler-users-group"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 21h9" /><path d="M9 8h1" /><path d="M9 12h1" /><path d="M9 16h1" /><path d="M14 8h1" /><path d="M14 12h1" /><path d="M5 21v-16c0 -.53 .211 -1.039 .586 -1.414c.375 -.375 .884 -.586 1.414 -.586h10c.53 0 1.039 .211 1.414 .586c.375 .375 .586 .884 .586 1.414v7" /><path d="M16 19h6" /><path d="M19 16v6" /></svg>),
                    content: 'Nouv. Entreprise',
                    path:'/dashboard/entreprise/add'
                }
            ],
        },
        {
            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:stroke-blue icon icon-tabler icons-tabler-outline icon-tabler-car"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M5 17h-2v-6l2 -5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5" /></svg>),
            content: 'Voitures',
            path: '/dashboard/voitures',
        },
    ];
    
    const filterMenu = (menu, role) => {
        const permissionsByRole = SIDEBAR_MENU[role];
        
        return menu .map(
            (item, i) => {
                const allowedMenu = permissionsByRole?.find(permission => permission[item.content])
                if(allowedMenu) {
                    const allowedSubMenu = allowedMenu[item.content]
                    if(item.subMenu) {
                        const filterSubMenu = item.subMenu.filter(subMenuItem => allowedSubMenu.includes(subMenuItem.content))
                        return {
                            ...item,
                            subMenu: filterSubMenu.length ? filterSubMenu : undefined
                        }
                    }
                return item;
                }
                return null
            })
            .filter(item => item !== null);

    }
    const filteredMenu = filterMenu(menuListLink, role)


  return (
    <div className={`min-w-[280px] w-[280px] sm:w-[200px] h-screen overflow-y-hidden flex flex-col gap-6 border-r border-r-[#B6B6B6] `}>
          
          
          
          <div className="head flex items-center gap-3 p-10 ">
              <img src={logo} className='!w-[47px] sm:w-[35px]' alt="MCINET.GOV.MA" />
              <p className='font-poppins font-semibold leading-[140%] text-[20px] '>MCINET</p>
          </div>

          <div className="menu px-6 sm:px-3 flex flex-col gap-2">
                {
                    filteredMenu.map((link, i) => {
                        return (
                            <div>
                                <Link to={link.path}>
                                    <div className='flex flex-col items-start justify-start gap-3 px-3'>
                                        <div onClick={() => toggleSubMenu(link)} className='flex items-center justify-between w-full gap-3 px-8 h-11 rounded-[10px] transition-colors hover:bg-bg-blue hover:text-blue cursor-pointer'>
                                            <div className='flex items-center justify-start gap-2'>
                                                <span className="icon hover:svg>stroke-blue">{link.icon}</span>
                                                <p className='font-poppins font-medium sm:text-sm text-[14px] leading-5'>{link.content}</p>
                                                </div>

                                            {link.subMenu && (
                                                <div className={`transition-transform ${submenuState[link.content] ? 'rotate-90' : 'rotate-0'} sm:rotate-0`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:text-blue cursor-pointer icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6l6 6l-6 6" /></svg>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Link>

                                {submenuState[link.content] && link.subMenu &&  (
                                    <div className="px-2">{
                                        link.subMenu.map((sub, i) => (
                                            <Link key={i} to={sub.path} >
                                                <div className='flex items-center justify-start gap-3 px-8 h-11 rounded-[10px] transition-colors hover:bg-bg-blue hover:text-blue cursor-pointer'>
                                                    <span className="icon hover:stroke-blue">{sub.icon}</span>
                                                    <p className='font-poppins font-medium text-[14px] leading-5 '> {sub.content} </p>
                                                </div>
                                            </Link>)
                                        )}
                                    </div>
                                )}
                            </div>
                        )
                    })
                }
          </div>
      </div>
  )
}

export default SideBar;