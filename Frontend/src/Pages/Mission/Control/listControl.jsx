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

  const [collapse, setCollapse] = useState(true)
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
  const handleMissionControlsCollaps = () => {
    setCollapse(!collapse)
  }
  return (
    <div>
      <h1>{message} </h1>
      {
        loading ? 'Loading' : 
        (
          <div >
            <div className='table-head flex items-stretch justify-between w-full border-[#E4E4E4] rounded-[10px] overflow-hidden cursor-pointer'>
              <div onClick={handleMissionControlsCollaps} className='table-base-header p-3 w-full bg-[#F9F9F9]'>
                <span className='font-bold leading-[150%] text-[14px] text-[#727272] bg-transparent border-none'>Icon</span>
              </div>
              <div className='table-base-header p-3 w-full bg-[#F9F9F9]'>
                <p className='font-bold leading-[150%] text-[14px] text-[#727272] bg-transparent border-none'>Driouech</p>
              </div>
              <div className='table-base-header p-3 w-full bg-[#F9F9F9]'>
                <p className='font-bold leading-[150%] text-[14px] text-[#727272] bg-transparent border-none'>3 Jours</p>
              </div>
              <div className='table-base-header p-3 w-full bg-[#F9F9F9]'>
                <p className='font-bold leading-[150%] text-[14px] text-[#727272] bg-transparent border-none'>En Cours</p>
              </div>
            </div>
            
            {
              collapse && (
                <div className="form flex items-stretch justify-center h-full">
                  <div  className="w-20 min-h-full bg-transparent border-none flex items-stretch justify-end basis-10"><div className='w-[2px] h-[90%] flex justify-center items-center bg-[#E4E4E4] '></div></div>
                  <div className="table">
                    {controls.slice(start, end).map((control, i) => (
                      <div className='flex justify-between items-center'>
                        <span className='w-8 h-[2px] bg-[#E4E4E4]'></span>
                        <div key={i} className="table-rows flex items-center justify-evenly basis-full py-2 my-2 border border-[#E4E4E4] rounded-[10px] cursor-pointer transition-colors hover:bg-[#F9F9F9] hover:!border-[#E4E4E4]">
                          <div  className="table-base-row px-3 w-full bg-transparent border-none"><p className="text-[#727272] rounded bg-transparent border-none">{`` || 'Entreprise name'}</p></div>
                          <div  className="table-base-row px-3 w-full bg-transparent border-none"><p className="text-[#727272] rounded bg-transparent border-none">{`${control.date_visite}` || 'control name'}</p></div>
                          <div  className="table-base-row px-3 w-full max-lg:hidden bg-transparent border-none"><p className="text-[#727272] rounded bg-transparent border-none">{control.f_observation || 'Oujda angade'}</p></div>
                          <div  className="table-base-row px-3 w-full bg-transparent border-none">
                            <div className={`flex items-center just gap-2 px-2 py-1 w-fit border-none rounded-full ${controls.validation !== "Non Validé" ? "!bg-[rgba(255,156,156,0.44)]" : "!bg-[rgba(183,255,159,0.44)]"}`}>
                              <span className={`w-3 h-3 rounded-full ${controls.validation !== "Non Validé" ? "!bg-[#DC2626]" : "bg-[#259800] "}`}></span>
                              <p className={`rounded bg-transparent border-none ${controls.validation !== "Non Validé" ? " text-[#DC2626]" : " text-[#259800]"}`}>{controls.validation || 'Non Validé'}</p>
                            </div>
                          </div>
                          
                        </div>
                      </div>
                    )) }
                  </div>
                </div>
              )
            }
          </div>
            )
          }
    </div>
  )
}

export default ListControl