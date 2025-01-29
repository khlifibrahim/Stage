import React, {useEffect, useState} from 'react'
import Instance from '../../Api/axios'

function ListMissions() {
  const [missionsList, setMissionsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4

  const totalPage = [(Math.ceil(missionsList.length / itemsPerPage))];
  // console.log(totalPage)
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage

  const nextPage = ()=> {
    if(currentPage < totalPage) {
      setCurrentPage(currentPage + 1)
      console.log(currentPage)
    }
  }

  const prevPage = () => {
    if(currentPage > 1) {
      setCurrentPage(currentPage - 1)
      console.log(currentPage)
    }
  }

  // const handleStatus = ()=> {

    
  // }


  useEffect(() => {
    const fetchMissionListData = async ()=> {
      try {
        const response = await Instance.get('/missions/getOrderMission')
        console.log(response.data)
        setMissionsList(response.data.missions)
      } catch (error) {
        console.log('Error fetching missions list: ',error)
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
      <div className="header">
        <h1 className='font-poppins font-bold text-3xl'>List des Order Missions</h1>
      </div>
      <div className="form flex items-start justify-center h-full">
        <div className="table">
          <div className="table-head flex items-center justify-evenly w-full border-[#E4E4E4] rounded-[4px]">
            <div className="table-base-header p-3 w-full bg-[#F9F9F9]"><p className='font-bold leading-[150%] text-[14px] text-[#727272] bg-transparent border-none'>Titre</p></div>
            <div className="table-base-header p-3 w-full bg-[#F9F9F9]"><p className='font-bold leading-[150%] text-[14px] text-[#727272] bg-transparent border-none'>Destination</p></div>
            <div className="table-base-header p-3 w-full bg-[#F9F9F9]"><p className='font-bold leading-[150%] text-[14px] text-[#727272] bg-transparent border-none'>Date de depart</p></div>
            <div className="table-base-header p-3 w-full bg-[#F9F9F9]"><p className='font-bold leading-[150%] text-[14px] text-[#727272] bg-transparent border-none'>Companion</p></div>
            <div className="table-base-header p-3 w-full bg-[#F9F9F9]"><p className='font-bold leading-[150%] text-[14px] text-[#727272] bg-transparent border-none'>Status</p></div>
            <div className="table-base-header p-3 w-full bg-[#F9F9F9]"><p className='font-bold leading-[150%] text-[14px] text-[#727272] bg-transparent border-none'>Voir plus</p></div>
          </div>


          {missionsList.slice(start, end).map((mission, i) => (
            <div key={i} className="table-rows flex items-center justify-evenly border-b border-b-[#E4E4E4] rounded-[4px]">
              <div className="table-base-row p-3 w-full"><p className="text-[#727272] rounded bg-transparent border-none">{mission.Titre || 'Mission name'}</p></div>
              <div className="table-base-row p-3 w-full"><p className="text-[#727272] rounded bg-transparent border-none">{mission.destination || 'Oujda angade'}</p></div>
              <div className="table-base-row p-3 w-full"><p className="text-[#727272] rounded bg-transparent border-none">{dateFormat(mission.departure_date) || 'August 1, 2024'}</p></div>
              <div className="table-base-row p-3 w-full"><p className="text-[#727272] rounded bg-transparent border-none">{mission.companion || 'Wireframing and Prototyping'}</p></div>
              <div className="table-base-row p-3 w-full">
                <div className={`flex items-center just gap-2 px-3 py-1 w-fit border-none rounded-full ${mission.statue === "en attend" ? "!bg-[rgba(255,156,156,0.44)]" : mission.statue === "encore" ? "!bg-[rgba(156,195,255,0.44)]" : "!bg-[rgba(183,255,159,0.44)]"}`}>
                  <span className={`w-3 h-3 rounded-full ${mission.statue === "en attend" ? "!bg-[#DC2626]" : mission.statue === "encore" ? "bg-[#3083FF] " : "bg-[#259800] "}`}></span>
                  <p className={`rounded bg-transparent border-none ${mission.statue === "en attend" ? " text-[#DC2626]" : mission.statue === "encore" ? " text-[#3083FF]" : " text-[#259800]"}`}>{mission.statue || 'En attend'}</p>
                </div>
              </div>
              <div className="table-base-row p-3 w-full border-[#E4E4E4] rounded-[4px] "><p className="text-[#727272] rounded bg-transparent border-none">{(<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="hover:stroke-blue cursor-pointer icon icon-tabler icons-tabler-outline icon-tabler-external-link"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" /><path d="M11 13l9 -9" /><path d="M15 4h5v5" /></svg>)}</p></div>
            </div>
          ))}
        </div>
      </div>

      <div className="navigation flex items-center justify-between ">
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
      </div>
    </div>
  )
}

export default ListMissions