import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { fetchControls } from '../../../Redux/Actions/control.actions'

export const ListControl = () => {
  const dispatch = useDispatch()
  const theLocation = useLocation()
  const { controls, loading, error} = useSelector(state => state.control)
  const initialMessage = theLocation.state?.message || ""
  const [message, setMessage] = useState(initialMessage)
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null)
    }, 2000);

    return ()=> clearTimeout(timer)
  }, [])
  useEffect(() => {
    dispatch(fetchControls())
  }, [dispatch])

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4
  const totalPage = [(Math.ceil(controls.length / itemsPerPage))];
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage
  
  console.log("Control list: ",controls)
  return (
    <div>
      <h1>{message} </h1>
      {
        loading ? 'Loading' : 
        (
          <div className="form flex items-start justify-center h-full">
        <div className="table">
          <div className="table-head flex items-center justify-evenly w-full border-[#E4E4E4] rounded-[10px] overflow-hidden">
            <div className="table-base-header p-3 w-full bg-[#F9F9F9]"><p className='font-bold leading-[150%] text-[14px] text-[#727272] bg-transparent border-none'>Date de visite</p></div>
            <div className="table-base-header p-3 w-full bg-[#F9F9F9] max-lg:hidden"><p className='font-bold leading-[150%] text-[14px] text-[#727272] bg-transparent border-none'>Periode</p></div>
            <div className="table-base-header p-3 w-full bg-[#F9F9F9] max-lg:hidden"><p className='font-bold leading-[150%] text-[14px] text-[#727272] bg-transparent border-none'>Observation</p></div>
            <div className="table-base-header p-3 w-full bg-[#F9F9F9]"><p className='font-bold leading-[150%] text-[14px] text-[#727272] bg-transparent border-none'>Date de depart</p></div>
            <div className="table-base-header p-3 w-full bg-[#F9F9F9]"><p className='font-bold leading-[150%] text-[14px] text-[#727272] bg-transparent border-none'>Statue</p></div>
            <div className="table-base-header p-3 w-1/4 bg-[#F9F9F9]"><p className='font-bold leading-[150%] text-[14px] text-[#727272] bg-transparent border-none text-end'>plus</p></div>
          </div>


          {controls.length > 0 ? controls.slice(start, end).map((control, i) => (
            <div key={i} className="table-rows flex items-center justify-evenly py-3 my-2 border border-[#E4E4E4] rounded-[10px] cursor-pointer transition-colors hover:bg-[#F9F9F9] hover:!border-[#E4E4E4]">
              <div  className="table-base-row px-3 w-full"><p className="text-[#727272] rounded bg-transparent border-none">{`${control.date_visite}` || 'control name'}</p></div>
              <div  className="table-base-row px-3 w-full max-lg:hidden"><p className="text-[#727272] rounded bg-transparent border-none">{control.periode || 'Aucune periode'}</p></div>
              <div  className="table-base-row px-3 w-full max-lg:hidden"><p className="text-[#727272] rounded bg-transparent border-none">{control.f_observation || 'Oujda angade'}</p></div>
              <div  className="table-base-row px-3 w-full"><p className="text-[#727272] rounded bg-transparent border-none">{control.departure_date || 'August 1, 2024'}</p></div>
              <div  className="table-base-row px-3 w-full">
                
              </div>
              <div className="relative table-base-row flex justify-end  px-3 w-1/4 border-[#E4E4E4] rounded-[4px] ">
                <span className="text-[#727272] rounded bg-transparent border-none">
                {
                  (<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="hover:stroke-blue cursor-pointer icon icon-tabler icons-tabler-outline icon-tabler-dots-vertical"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>)
                  
                }</span>
                
                </div>
            </div>
          )) : (
            <div className='flex flex-col items-center justify-center px-3 w-full text-center font-medium my-10'>
              <div>
                <svg  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="stroke-[#969696] w-24 h-24 border-none icon icon-tabler icons-tabler-outline icon-tabler-report-off"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5.576 5.595a2 2 0 0 0 -.576 1.405v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2m0 -4v-8a2 2 0 0 0 -2 -2h-2" /><path d="M9 5a2 2 0 0 1 2 -2h2a2 2 0 1 1 0 4h-2" /><path d="M3 3l18 18" /></svg>
              </div>
              <p className='text-[#969696]'>Vous n'avez aucune control</p>
              </div>
          )}
        </div>
      </div>
        )
      }
    </div>
  )
}

export default ListControl