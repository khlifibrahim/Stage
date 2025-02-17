import React, {useState, useEffect, useRef} from 'react'
import { useOnClickOutside } from '../../Hooks/useOnClickOutside'
import { useNavigate } from 'react-router-dom';
import Instance from '../../Api/axios'
import PrintableMission from '../../Components/Utilities/PrintableMission'
import { useSelector } from 'react-redux';

function ListMissions({role, user}) {
  const navigate = useNavigate();
  const [mission, setMission] = useState({})
  const [missionsList, setMissionsList] = useState([])
  const [filter, setFilter] = useState(null)
  const [isFilterMenuOpen, setFilterMenuOpen] = useState(false)
  const [openMissionMenu, setOpenMissionMenu] = useState(null)
  const [modalPopUpPrint, setModalPopUpPrint] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4
  const totalPage = [(Math.ceil(missionsList.length / itemsPerPage))];
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage
  
  const statusList = [
    { id: 0, label: "Tous" },
    { id: 1, label: "En Attente" },
    { id: 2, label: "En Cours" },
    { id: 3, label: "Validé" }
  ];


  const toggleMissionMenu = (id)=> {
    setOpenMissionMenu(openMissionMenu === id ? null : id)
  }
  const missionMenuRef = useRef()
  const modalRef = useRef();
  useOnClickOutside(missionMenuRef, () => setOpenMissionMenu(null))
  useOnClickOutside(modalRef, () => setModalPopUpPrint(false))

  const handleFilterChange = missionsList.filter((mission) => {
    if (!filter || filter === 'Tous') return true;

    return mission.status === filter
  })
  let filterMenuRef = useRef()
  useOnClickOutside(filterMenuRef, () => setFilterMenuOpen(false) )

  
  const nextPage = ()=> {
    if(currentPage < totalPage) {
      setCurrentPage(currentPage + 1)
    }
  }
  
  console.log("Missions List: ",missionsList)
  const prevPage = () => {
    if(currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleDetails = (missionId) => {
    console.log("Mision id: ", missionId)
    const selectedMission = missionsList.find(item => {
      return missionsList.mission_id === item.missionId
    })
    setMission(selectedMission)
    console.log("Mission state after selecting: ",selectedMission)
      setModalPopUpPrint(!modalPopUpPrint)
  };

  const handleMissionStatus = async (missionId)=> {
    console.log("Update mission status: ",missionId)
    const roleOfStatus = {
      DIRECTEUR: "En Cours",
      CADRE: "Validé",
    }
    console.log("Check status role: ", roleOfStatus.CADRE)
    try {
      const response = await Instance.put(`/missions/updateOrderMissionStatus/${missionId}`, roleOfStatus)
      console.log("Checking response of status update: ", response)
    } catch (error) {
      
    }

  }
  const hendleEdit = (mission) => {
    navigate('/dashboard/orderMissions/addMissionOrders', { state : { missionData: mission}})
  }

  const handleDelete = async (id)=> {
    
    try {
      const response = await Instance.delete(`/missions/deleteOrderMission/${id}`);
      if(response.status === 200 ) {
        const updateMissionList = missionsList.filter(mission => mission.mission_id !== id);
        setMissionsList(updateMissionList)
      }else {
        console.error('Failed to delete the mission');
      }
    } catch (error) {
      console.error('Error deleting mission:', error);
    }
  }


  useEffect(() => {
    const fetchMissionListData = async ()=> {
      try {
        const response = await Instance.get('/missions/getOrderMission')
        console.log(response.data)
        if(role === "CADRE") {
          const filterMissionListFOrCadre = response.data.missions.filter(mission => (
            mission.status === "En Cours" && mission.cadre_nom === user.nom 
          ))
          console.log("Filtered mission list: ",filterMissionListFOrCadre)
          setMissionsList(filterMissionListFOrCadre)
        }else {
          setMissionsList(response.data.missions)
          console.log("user is: ", role)
        }
      } catch (error) {
        console.log('Error fetching missions list: ',error.response?.data)
      }
    }
    fetchMissionListData();
  }, [])
  
  function dateFormat(dateValue) {
    if(!dateValue) return 'N/A';
    const date = new Date(dateValue);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  };





  return (
    <div className='flex flex-col gap-8 mb-4'>
      <div className="header flex items-center justify-between">
        <h1 className='font-poppins font-bold text-3xl'>List des Order Missions</h1>
        {/* filter menu */}
        {role !== "CADRE" &&
        (<div className="filter flex items-center justify-between gap-4" >
          <p className='font-medium text-base'>Trier par: </p>

          <div className='flex items-center justify-between gap-2 relative' ref={filterMenuRef}>
            <span value="cadre" className='bg-[#E4E4E4] font-semibold rounded-[10px] py-2 px-3 hover:bg-bg-blue hover:text-blue cursor-pointer transition-colors'>Cadres</span>
            <span value="status" onClick={() => setFilterMenuOpen(!isFilterMenuOpen)} className={`relative bg-[#E4E4E4] font-semibold rounded-[10px] py-2 px-3 hover:bg-bg-blue hover:text-blue cursor-pointer transition-colors ${isFilterMenuOpen ? 'bg-bg-blue' : ''}`}>
                <div className={`flex items-center justify-center ${isFilterMenuOpen ? 'text-blue' : ''}`}>
                  <span>Statue: { filter || 'Tous'}</span>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`hover:text-blue ${isFilterMenuOpen ? 'rotate-90' : ''} cursor-pointer icon icon-tabler icons-tabler-outline icon-tabler-chevron-right`}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6l6 6l-6 6" /></svg>
                  </span>
                </div>
            </span>
              { isFilterMenuOpen &&
                (<div className='absolute top-12 right-0 z-50 bg-[#E4E4E4] rounded-[10px] overflow-hidden'>
                {
                  statusList.map(status => (
                        <div key={status.id} onClick={() => {
                                      setFilter(status.label)
                                      setFilterMenuOpen(false)
                                      console.log(filter)
                                      }} 
                              className='py-2 px-4 hover:bg-bg-blue hover:text-blue cursor-pointer'>
                            {status.label}
                        </div>
                  ))
                }
              </div>)
              }
          </div>
        </div>)}
      </div>
      <div className="form flex items-start justify-center h-full">
        <div className="table">
          <div className="table-head flex items-center justify-evenly w-full border-[#E4E4E4] rounded-[10px] overflow-hidden">
            <div className="table-base-header p-3 w-full bg-[#F9F9F9]"><p className='font-bold leading-[150%] text-[14px] text-[#727272] bg-transparent border-none'>Cadre</p></div>
            <div className="table-base-header p-3 w-full bg-[#F9F9F9]"><p className='font-bold leading-[150%] text-[14px] text-[#727272] bg-transparent border-none'>Grade</p></div>
            <div className="table-base-header p-3 w-full bg-[#F9F9F9]"><p className='font-bold leading-[150%] text-[14px] text-[#727272] bg-transparent border-none'>Destination</p></div>
            <div className="table-base-header p-3 w-full bg-[#F9F9F9]"><p className='font-bold leading-[150%] text-[14px] text-[#727272] bg-transparent border-none'>Date de depart</p></div>
            <div className="table-base-header p-3 w-full bg-[#F9F9F9]"><p className='font-bold leading-[150%] text-[14px] text-[#727272] bg-transparent border-none'>Statue</p></div>
            <div className="table-base-header p-3 w-1/4 bg-[#F9F9F9]"><p className='font-bold leading-[150%] text-[14px] text-[#727272] bg-transparent border-none text-end'>plus</p></div>
          </div>


          {missionsList.length > 0 ? handleFilterChange.slice(start, end).map((mission, i) => (
            <div key={i} className="table-rows flex items-center justify-evenly py-3 my-2 border border-[#E4E4E4] rounded-[10px] cursor-pointer transition-colors hover:bg-[#F9F9F9] hover:!border-[#E4E4E4]">
              <div onClick={() => handleDetails(mission.mission_id)} className="table-base-row px-3 w-full"><p className="text-[#727272] rounded bg-transparent border-none">{`${mission.cadre_nom} ${mission.cadre_prenom}` || 'Mission name'}</p></div>
              <div onClick={() => handleDetails(mission.mission_id)} className="table-base-row px-3 w-full"><p className="text-[#727272] rounded bg-transparent border-none">{mission.grade_name || 'Wireframing and Prototyping'}</p></div>
              <div onClick={() => handleDetails(mission.mission_id)} className="table-base-row px-3 w-full"><p className="text-[#727272] rounded bg-transparent border-none">{mission.Destination || 'Oujda angade'}</p></div>
              <div onClick={() => handleDetails(mission.mission_id)} className="table-base-row px-3 w-full"><p className="text-[#727272] rounded bg-transparent border-none">{dateFormat(mission.departure_date) || 'August 1, 2024'}</p></div>
              <div onClick={() => handleDetails(mission.mission_id)} className="table-base-row px-3 w-full">
                <div className={`flex items-center just gap-2 px-3 py-1 w-fit border-none rounded-full ${mission.status === "En Attente" ? "!bg-[rgba(255,156,156,0.44)]" : mission.status === "En Cours" ? "!bg-[rgba(156,195,255,0.44)]" : "!bg-[rgba(183,255,159,0.44)]"}`}>
                  <span className={`w-3 h-3 rounded-full ${mission.status === "En Attente" ? "!bg-[#DC2626]" : mission.status === "En Cours" ? "bg-[#3083FF] " : "bg-[#259800] "}`}></span>
                  <p className={`rounded bg-transparent border-none ${mission.status === "En Attente" ? " text-[#DC2626]" : mission.status === "En Cours" ? " text-[#3083FF]" : " text-[#259800]"}`}>{mission.status || 'En Attente'}</p>
                </div>
              </div>
              <div className="relative table-base-row flex justify-end  px-3 w-1/4 border-[#E4E4E4] rounded-[4px] ">
                <span className="text-[#727272] rounded bg-transparent border-none">
                {
                  (<svg onClick={() => toggleMissionMenu(mission.mission_id)}  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="hover:stroke-blue cursor-pointer icon icon-tabler icons-tabler-outline icon-tabler-dots-vertical"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>)
                  
                }</span>
                {
                  openMissionMenu === mission.mission_id && (
                  <div  className='absolute top-6 right-12 z-50 shadow-lg bg-[#E4E4E4] rounded-[12px] overflow-hidden' ref={missionMenuRef}>
                    {
                      role !== "CADRE" ? (
                        <div>
                          <p onClick={() => handleMissionStatus(mission.mission_id)} className='min-h-fit !py-2 !px-4 rounded-[10px] hover:bg-bg-blue hover:text-blue cursor-pointer'>Attribuer</p>
                          <p onClick={() => hendleEdit(mission)} className='min-h-fit !py-2 !px-4 rounded-[10px] hover:bg-bg-blue hover:text-blue cursor-pointer'>Modifier</p>
                          <p onClick={() => handleDelete(mission.mission_id)} className='min-h-fit !py-2 !px-4 rounded-[10px] hover:bg-[rgba(255,156,156,0.44)] hover:text-[#DC2626] cursor-pointer'>Supprimer</p>
                        </div>
                      )
                      : (
                        <p onClick={() => handleMissionStatus(mission.mission_id)} className='min-h-fit !py-2 !px-4 rounded-[10px] hover:bg-bg-blue hover:text-blue cursor-pointer'>Executer</p>
                      )
                    }
                  </div>
                )}
                </div>
            </div>
          )) : (
            <div className='flex flex-col items-center justify-center px-3 w-full text-center font-medium my-10'>
              <div>
                <svg  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="stroke-[#969696] w-24 h-24 border-none icon icon-tabler icons-tabler-outline icon-tabler-report-off"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5.576 5.595a2 2 0 0 0 -.576 1.405v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2m0 -4v-8a2 2 0 0 0 -2 -2h-2" /><path d="M9 5a2 2 0 0 1 2 -2h2a2 2 0 1 1 0 4h-2" /><path d="M3 3l18 18" /></svg>
              </div>
              <p className='text-[#969696]'>Vous n'avez aucune mission</p>
              </div>
          )}
        </div>
      </div>

      {(missionsList.length > 0) &&
        (<div className="navigation flex items-center justify-between ">
          <button 
            className='px-3 py-2  bg-[#E4E4E4]  font-medium font-poppins text-base rounded-[10px] hover:!bg-bg-blue hover:text-blue  transition-colors'
            onClick={prevPage}
          >Précédente</button>
  
          <div className='flex gap-2'>
  
            {
              Array.from({length: totalPage}).map((_, i) => (
                <span key={i} onClick={()=> setCurrentPage(i + 1)} className={`cursor-pointer px-3 py-2 transition-colors ${currentPage === (i+1) ? 'bg-bg-blue  text-blue' : 'bg-[#E4E4E4] '} font-medium font-poppins text-base rounded-[10px] hover:!bg-bg-blue hover:text-blue  transition-colors`}>{i + 1}</span>
              ))
            }
  
            </div>
  
          <button 
            className='px-3 py-2  bg-[#E4E4E4]  font-medium font-poppins text-base rounded-[10px] hover:!bg-bg-blue hover:text-blue  transition-colors'
            onClick={nextPage}
          >Suivante</button>
        </div>)
      }

      {modalPopUpPrint &&
            (
            <div className="fixed top-0 left-0 z-50 flex flex-col items-center justify-center  h-screen w-screen overflow-hidden bg-gray-600/55">
              <div className="relative w-fit bg-white m-12 p-8 rounded-[12px] shadow-md overflow-y-auto no-scrollbar" ref={modalRef}>
                <span onClick={handleDetails} className='absolute left-4 top-4 z-50 p-2 rounded-[10px] bg-bg-blue'>
                  <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="stroke-white hover:stroke-blue cursor-pointer icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                </span>
                <PrintableMission id="print-area"  cadre={mission} mission={mission} close={modalPopUpPrint}/>
              </div>
            </div>
            )
          }
    </div>
  )
}

export default ListMissions