import React, { useState, useRef } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { useOnClickOutside } from '../../../Hooks/useOnClickOutside'
import { fetchControls31 } from '../../../Redux/Actions/control31.actions'
import { fetchControls24 } from '../../../Redux/Actions/control24.actions'
import { fetchOrderMissions } from '../../../Redux/Actions/orderMission.actions'

export const ListControl = ({ role, user }) => {
  const dispatch = useDispatch()
  const theNavigation = useNavigate()
  const theLocation = useLocation()
  const { controls_31, loading: loading31, error: error31 } = useSelector(state => state.control31)
  const { controls_24, loading: loading24, error: error24 } = useSelector(state => state.control24)
  const { orderMissions, loading: orderMissionsLoading } = useSelector(state => state.orderMission)

  const [controls, setControls] = useState([])
  // console.log('List Control: ', controls)
  console.log('Control 31: ', controls_31)
  console.log('Control 24: ', controls_24)
  console.log('List Mission: ', orderMissions)

  const initialMessage = theLocation.state?.message || ""
  const [message, setMessage] = useState(initialMessage)
  const [collapse, setCollapse] = useState({})
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null)
    }, 2000);

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    dispatch(fetchOrderMissions(role, user.id_utilisateur))
    dispatch(fetchControls31())
    dispatch(fetchControls24())
  }, [dispatch])

  useEffect(() => {
    setControls([...controls_31, ...controls_24]);
  }, [controls_31, controls_24]);

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4
  const totalPage = (Math.ceil(orderMissions.length / itemsPerPage));
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage
  const showMaxBtn = totalPage >= 4 ? 3 : 2
  const handlenavigation = () => {
    if (totalPage <= showMaxBtn) {
      return Array.from({ length: totalPage }).map(i => i)
    } else {
      const pages = []
      if (currentPage - 1 >= 1) {
        pages.push(currentPage - 1)
      }
      pages.push(currentPage)
      if (currentPage + 1 <= totalPage) {
        pages.push(currentPage + 1)
      }
      console.log('Display: ', pages)
      return pages
    }
  }


  let filterMenuRef = useRef()
  useOnClickOutside(filterMenuRef, () => setFilterMenuOpen(false))

  // console.log("Control list: ",controls)
  const handleMissionControlsCollaps = (index) => {
    setCollapse(prev => ({
      ...prev,
      i: index,
      [index]: !prev[index]
    }))
  }


  const nextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1)
    }
  }
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const [searchInput, setSearchInput] = useState('');
  const [isLoiMenuOpen, setIsLoiMenuOpen] = useState(false);
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);

  const cadreMenuRef = useRef();
  const loiMenuRef = useRef();
  const statusMenuRef = useRef();

  useOnClickOutside(cadreMenuRef, () => setIsCadreMenuOpen(false));
  useOnClickOutside(loiMenuRef, () => setIsLoiMenuOpen(false));
  useOnClickOutside(statusMenuRef, () => setIsStatusMenuOpen(false));

  // Cadre filter options
  const [cadreSearch, setCadreSearch] = useState('');

  // Loi filter options
  const [loiFilter, setLoiFilter] = useState('all');
  const loiOptions = [
    { label: 'Tous', value: 'all' },
    { label: 'Loi 31.08', value: '31-08' },
    { label: 'Loi 24.09', value: '24-09' },
  ];

  // Status filter options
  const [statusFilter, setStatusFilter] = useState('all');
  const statusOptions = [
    { label: 'Tous', value: 'all' },
    { label: 'En Cours', value: 'en-cours' },
    { label: 'Validé', value: 'valide' },
    { label: 'Cloturé', value: 'cloture' },
  ];

  
  const handleFilterChange = () => {
    return orderMissions.filter((mission) => {
      
      if (cadreSearch.trim() !== '') {
        const searchValue = cadreSearch.toLowerCase();
        if (
          mission.cadre_nom &&
          !mission.cadre_nom.toLowerCase().includes(searchValue) &&
          !mission.cadre_prenom.toLowerCase().includes(searchValue) &&
          !mission.raison_sociale.toLowerCase().includes(searchValue)
        ) {
          return false;
        }
      }

      // Loi filter (dropdown)
      if (loiFilter !== 'all') {
        if (loiFilter === '31-08' && mission.Object_type !== 'Controle_Loi_3108') {
          return false;
        }
        if (loiFilter === '24-09' && !mission.Object_type.includes('2409')) {
          return false;
        }
      }

      // Status filter (dropdown)
      if (statusFilter !== 'all') {
        if (statusFilter === 'en-cours' && mission.status !== 'En Cours') {
          return false;
        }
        if (statusFilter === 'valide' && mission.status !== 'Validé') {
          return false;
        }
        if (statusFilter === 'cloture' && mission.closed !== 1) {
          return false;
        }
      }

      return true;
    });
  };

  const [filteredMissions, setFilteredMissions] = useState(orderMissions);

  useEffect(() => {
    setFilteredMissions(handleFilterChange());
  }, [cadreSearch, loiFilter, statusFilter, orderMissions]);
  useEffect(() => {
    setCurrentPage(1);
  }, [searchInput, loiFilter, statusFilter]);

  function dateFormat(dateValue) {
    if (!dateValue) return 'N/A';
    const date = new Date(dateValue);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  };

  const handleControlNavigation = (controlType, id, cadreID) => {
    switch (controlType) {
      case "Verification":
        theNavigation("/dashboard", { state: { id: id } });
        break;
      case "Reunion":
        theNavigation("/dashboard", { state: { id: id } });
        break;
      case "Controle_Loi_3108":
        theNavigation("/dashboard/orderMissions/control/add/31-08", { state: { id: id } });
        break;
      case "Controle_Loi_2409_Importation":
        theNavigation("/dashboard", { state: { id: id } });
        break;
      case "Controle_Loi_2409_Local":
        theNavigation("/dashboard/orderMissions/control/add/24-09", { state: { id: id, cadreId: cadreID } });
        break;
      case "Visite":
        theNavigation("/dashboard", { state: { id: id } });
        break;
      case "Commission mixte":
        theNavigation("/dashboard", { state: { id: id } });
        break;
      default:
        console.warn("Unknown control type:", controlType);
        break;
    }
  };


  return (
    <div className='text-left'>
      <h1>
        {
          message && (
            <div className='absolute top-10 left-1/4 z-50 transition-all'>
              <p className='text-green-500 font-medium text-lg bg-green-200 px-4 py-3 rounded-[10px] transition delay-150 duration-300 ease-in-out'>{message}</p>
            </div>
          )
        }
      </h1>

      <div className="header flex items-center justify-between flex-wrap">
        <h1 className='font-poppins font-bold text-3xl basis-full  mb-4'>List des Control</h1>
        {/* filter menu */}
        <div className="filter-group flex gap-4 items-center justify-between basis-full max-lg:flex-wrap lg:gap-2">
          {/* Cadre Filter Search */}
          <div className="relative flex items-center max-lg:basis-full max-lg:w-full">
            <span className="absolute left-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B6B6B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                <path d="M21 21l-6 -6" />
              </svg>
            </span>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setCadreSearch(e.target.value)}
              placeholder="Rechercher par Cadre..."
              className="w-[240px] max-lg:w-full h-[38px] px-10 py-2 border border-[#E4E4E4] rounded-[10px] focus:outline-none focus:border-blue"
            />
          </div>

          {/* Loi Filter */}
          <div className='flex gap-2'>
            <div ref={loiMenuRef} className="relative max-lg:basis-full">
              <button
                onClick={() => setIsLoiMenuOpen(!isLoiMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white border rounded-[10px] shadow-sm hover:bg-gray-50 max-lg:w-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />
                  <path d="M12 7v10" />
                  <path d="M7 12h10" />
                </svg>
                {loiFilter === 'all' ? 'Loi' : loiFilter === '31-08' ? 'Loi 31.08' : 'Loi 24.09'}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {isLoiMenuOpen && (
                <div className="absolute z-10 mt-1 w-[240px] bg-white border rounded-[10px] shadow-lg">
                  {loiOptions.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => {
                        setLoiFilter(option.value);
                        setIsLoiMenuOpen(false);
                      }}
                      className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
                    >
                      <span>{option.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Status Filter */}
            <div ref={statusMenuRef} className="relative max-lg:basis-full">
              <button
                onClick={() => setIsStatusMenuOpen(!isStatusMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white border rounded-[10px] shadow-sm hover:bg-gray-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="8.5" cy="7" r="1.5" />
                  <path d="M20 8l-1 5l-4-3" />
                </svg>
                {statusFilter === 'all' ? 'Status' : statusFilter === 'en-cours' ? 'En Cours' : statusFilter === 'valide' ? 'Validé' : 'Cloturé'}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {isStatusMenuOpen && (
                <div className="absolute z-10 mt-1 w-[240px] bg-white border rounded-[10px] shadow-lg">
                  {statusOptions.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => {
                        setStatusFilter(option.value);
                        setIsStatusMenuOpen(false);
                      }}
                      className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
                    >
                      <span>{option.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      {
        orderMissionsLoading || loading31 || loading24
          ? (
            <div className='flex items-center justify-center min-h-10'>
              <p className='font-bold leading-[150%] text-[18px] text-[#727272] bg-transparent border-none'>Chargement en cours...</p>
            </div>
          )
          : (
            filteredMissions.slice(start, end).map((orderMission, i) => (
              <div key={i} className='my-2'>
                <div className='table-head flex items-stretch justify-between w-full bg-[#F9F9F9] border-[#E4E4E4] rounded-[10px] overflow-hidden cursor-pointer max-lg:flex-wrap '>
                  <div onClick={() => handleMissionControlsCollaps(i)} className='table-base-header p-3 basis-9 w-full bg-[#F9F9F9] max-md:w-min max-lg:basis-7'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={`${!collapse[i] ? '-rotate-90' : ''} transition-transform`}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 9c.852 0 1.297 .986 .783 1.623l-.076 .084l-6 6a1 1 0 0 1 -1.32 .083l-.094 -.083l-6 -6l-.083 -.094l-.054 -.077l-.054 -.096l-.017 -.036l-.027 -.067l-.032 -.108l-.01 -.053l-.01 -.06l-.004 -.057v-.118l.005 -.058l.009 -.06l.01 -.052l.032 -.108l.027 -.067l.07 -.132l.065 -.09l.073 -.081l.094 -.083l.077 -.054l.096 -.054l.036 -.017l.067 -.027l.108 -.032l.053 -.01l.06 -.01l.057 -.004l12.059 -.002z" /></svg>
                  </div>
                  {role !== 'CADRE'
                    && (<div className='table-base-header p-3 w-full  bg-[#F9F9F9] max-md:basis-auto max-lg:hidden'>
                      <p className='font-bold leading-[150%] text-[14px] text-[#727272] text-left bg-transparent border-none'>{`${orderMission.cadre_nom} ${orderMission.cadre_prenom}`}</p>
                    </div>)}
                  <div className='table-base-header p-3 w-full bg-[#F9F9F9] max-lg:basis-1/2'>
                    <p className='font-bold leading-[150%] text-[14px] text-[#727272] bg-transparent border-none'>{orderMission.Destination}</p>
                  </div>
                  <div className='table-base-header p-3 w-full bg-[#F9F9F9] max-lg:basis-1/5'>
                    <p className='font-bold leading-[150%] text-[14px] text-[#727272] bg-transparent border-none'>{`${orderMission.duration_days} Jours`}</p>
                  </div>
                  <div className='table-base-header p-3 w-full bg-[#F9F9F9] max-lg:hidden'>
                    <p className='font-bold leading-[150%] text-[14px] text-[#727272] bg-transparent border-none'>{orderMission.closed === 0 ? (orderMission.status) : 'Cloturé'}</p>
                  </div>
                  <div className='table-base-header p-3 w-full bg-[#F9F9F9] max-lg:basis-full '>
                    {orderMission.closed === 0 &&
                      (<div className="flex items-center justify-end gap-4 bg-transparent border-none">
                        <button
                          onClick={() => handleControlNavigation(orderMission.Object_type, orderMission.mission_id, orderMission.cadre_id)}
                          className=" flex items-center justify-center gap-2 px-3 py-2 bg-bg-blue text-blue font-medium font-poppins text-base rounded-[10px] hover:bg-blue hover:text-white transition-colors  max-lg:w-full "
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-square-rounded-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" /><path d="M15 12h-6" /><path d="M12 9v6" /></svg>
                          Control
                        </button>
                      </div>)
                    }
                  </div>
                </div>

                {collapse[i] && (
                  <div key={orderMission.mission_id} className="form flex items-stretch justify-center h-full">
                    <div className="w-20 min-h-full bg-transparent border-none flex items-stretch justify-end basis-10">
                      <div className='border-l-[2px] w-[1px] h-[90.9%] py-6 flex justify-center items-center border-[#E4E4E4] rounded-sm max-lg:hidden'></div>
                    </div>
                    <div className="table">
                      {controls.length > 0 ? (
                        controls
                          .filter(control => orderMission.mission_id === control.mission_id || orderMission.mission_id === control.id_mission)
                          .map((control, i) => (
                            <div key={i} className='flex justify-between items-center max-md:flex-wrap'>
                              {
                                control.loi === '3108'
                                ? (
                                  Object.keys(control).length > 0 ? (
                                    <>
                                    <span className='w-8 h-[2px] bg-[#E4E4E4] max-lg:hidden'></span>
                                    <div className="table-rows flex items-center justify-evenly basis-full py-2 my-2 border border-[#E4E4E4] rounded-[10px] cursor-pointer transition-colors hover:bg-[#F9F9F9] hover:!border-[#E4E4E4]">
                                      <div className="table-base-row px-3 w-full bg-transparent border-none">
                                        <p className="text-[#727272] rounded bg-transparent border-none">
                                          {control.raison_sociale || 'Entreprise name'}
                                        </p>
                                      </div>
                                      <div className="table-base-row px-3 w-full bg-transparent border-none  max-lg:hidden">
                                        <p className="text-[#727272] rounded bg-transparent border-none">
                                          {dateFormat(control.date_visite) || 'control name'}
                                        </p>
                                      </div>
                                      <div className="table-base-row px-3 w-full bg-transparent border-none max-lg:hidden">
                                        <p className="text-[#727272] rounded bg-transparent border-none">
                                          {control.f_observation || 'Oujda angade'}
                                        </p>
                                      </div>
                                      <div className="table-base-row px-3 w-full bg-transparent border-none">
                                        <div className={`flex items-center gap-2 px-2 py-1 w-fit border-none rounded-full ${control.validation === "Non Validé" ? "!bg-[rgba(255,156,156,0.44)]" : "!bg-[rgba(183,255,159,0.44)]"}`}>
                                          <span className={`w-3 h-3 rounded-full ${control.validation === "Non Validé"  ? "!bg-[#DC2626]" : "bg-[#259800] "}`}></span>
                                          <p className={`rounded bg-transparent border-none ${control.validation === "Non Validé" ? " text-[#DC2626]" : " text-[#259800]"}`}>
                                            {control.validation || 'Non Confomre'}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                  ) : (
                                    <div className="flex items-center justify-center w-full p-4">
                                      <p className="!text-[#727272] bg-transparent border-0">Aucun contrôle trouvé</p>
                                    </div>
                                  )
                                ) :  control.loi === '2409' ?  
                                (
                                  Object.keys(control).length > 0 ? (
                                    <>
                                      <span className='w-8 h-[2px] bg-[#E4E4E4] max-lg:hidden'></span>
                                      <div className="table-rows flex items-center justify-evenly basis-full py-2 my-2 border border-[#E4E4E4] rounded-[10px] cursor-pointer transition-colors hover:bg-[#F9F9F9] hover:!border-[#E4E4E4]">
                                        <div className="table-base-row px-3 w-full bg-transparent border-none">
                                          <p className="text-[#727272] rounded bg-transparent border-none">
                                            {control.raison_sociale || 'Entreprise name'}
                                          </p>
                                        </div>
                                        <div className="table-base-row px-3 w-full bg-transparent border-none  max-lg:hidden">
                                          <p className="text-[#727272] rounded bg-transparent border-none">
                                            {dateFormat(control.date_visite) || 'control name'}
                                          </p>
                                        </div>
                                        <div className="table-base-row px-3 w-full max-lg:hidden bg-transparent border-none">
                                          <p className="text-[#727272] rounded bg-transparent border-none">
                                            {control.f_observation || 'Oujda angade'}
                                          </p>
                                        </div>
                                        <div className="table-base-row px-3 w-full bg-transparent border-none">
                                          <div className={`flex items-center gap-2 px-2 py-1 w-fit border-none rounded-full ${control.status !== "Validé" ? "!bg-[rgba(255,156,156,0.44)]" : "!bg-[rgba(183,255,159,0.44)]"}`}>
                                            <span className={`w-3 h-3 rounded-full ${control.status !== "Validé" ? "!bg-[#DC2626]" : "bg-[#259800] "}`}></span>
                                            <p className={`rounded bg-transparent border-none ${control.status !== "Validé" ? " text-[#DC2626]" : " text-[#259800]"}`}>
                                              {control.status || "Non Validé"}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </>) : (
                                      <div className="flex items-center justify-center w-full p-4">
                                        <p className="!text-[#727272] bg-transparent border-0">Aucun contrôle trouvé</p>
                                      </div>
                                    )
                                  ) : (
                                    <div className="flex items-center justify-center w-full p-4">
                                      <p className="!text-[#727272] bg-transparent border-0">Aucun ordre mission</p>
                                    </div>
                                  )
                              }
                            </div>
                          ))
                      ) : (
                        <div className="flex items-center justify-center p-4">
                          <p className="text-[#727272]">Aucun contrôle trouvé</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))
          )
      }

      {(orderMissions.length > 0 && totalPage > 1) &&
        (<div className="navigation flex items-center justify-between my-2">
          <button
            className='px-3 py-2 flex  bg-[#E4E4E4]  font-medium font-poppins text-base rounded-[10px] hover:!bg-bg-blue hover:text-blue  transition-colors'
            onClick={prevPage}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 6l-6 6l6 6" /></svg>
            <p className='max-md:hidden'>Précédente</p>
          </button>

          <div className='flex gap-2'>

            {
              handlenavigation().map(page => (
                <span key={page} onClick={() => setCurrentPage(page)} className={`cursor-pointer px-3 py-2 transition-colors ${currentPage === page ? 'bg-bg-blue  text-blue' : 'bg-[#E4E4E4] '} font-medium font-poppins text-base rounded-[10px] hover:!bg-bg-blue hover:text-blue  transition-colors`}>{page}</span>
              ))
            }

          </div>

          <button
            className='px-3 py-2 flex bg-[#E4E4E4]  font-medium font-poppins text-base rounded-[10px] hover:!bg-bg-blue hover:text-blue  transition-colors'
            onClick={nextPage}
          >
            <p className="max-md:hidden">Suivante</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6l6 6l-6 6" /></svg>
          </button>
        </div>)
      }
    </div>
  )
}

export default ListControl