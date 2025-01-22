import React from 'react'

function ListMissions({ name, delegation, destination, startDate, status, more }) {
  return (
    <div className='flex flex-col gap-8 '>
      <div className="header">
        <h1 className='font-poppins font-bold text-[36px]'>List des Order Missions</h1>
      </div>
      <div className="form flex items-start justify-center h-full">
        <div className="table">
          <div className="table-head flex items-center justify-evenly w-full ">
            <div className="table-base-header p-3 w-full bg-[#F9F9F9] border-[#E4E4E4] rounded-[4px]"><p className='font-bold leading-[150%] text-[14px] text-[#727272] bg-transparent border-none'>Nome de la massion</p></div>
            <div className="table-base-header p-3 w-full bg-[#F9F9F9] border-[#E4E4E4] rounded-[4px]"><p className='font-bold leading-[150%] text-[14px] text-[#727272] bg-transparent border-none'>Délégation</p></div>
            <div className="table-base-header p-3 w-full bg-[#F9F9F9] border-[#E4E4E4] rounded-[4px]"><p className='font-bold leading-[150%] text-[14px] text-[#727272] bg-transparent border-none'>Destination</p></div>
            <div className="table-base-header p-3 w-full bg-[#F9F9F9] border-[#E4E4E4] rounded-[4px]"><p className='font-bold leading-[150%] text-[14px] text-[#727272] bg-transparent border-none'>Date de depart</p></div>
            <div className="table-base-header p-3 w-full bg-[#F9F9F9] border-[#E4E4E4] rounded-[4px]"><p className='font-bold leading-[150%] text-[14px] text-[#727272] bg-transparent border-none'>Status</p></div>
            <div className="table-base-header p-3 w-full bg-[#F9F9F9] border-[#E4E4E4] rounded-[4px]"><p className='font-bold leading-[150%] text-[14px] text-[#727272] bg-transparent border-none'>Voir plus</p></div>
          </div>
          <div className="table-rows flex items-center justify-evenly">
            <div className="table-base-row p-3 w-full border-[#E4E4E4] rounded-[4px] "><p className="text-[#727272] rounded bg-transparent border-none">{name || 'Creating Wireframes'}</p></div>
            <div className="table-base-row p-3 w-full border-[#E4E4E4] rounded-[4px] "><p className="text-[#727272] rounded bg-transparent border-none">{delegation || 'Wireframing and Prototyping'}</p></div>
            <div className="table-base-row p-3 w-full border-[#E4E4E4] rounded-[4px] "><p className="text-[#727272] rounded bg-transparent border-none">{destination || 'Oujda angade'}</p></div>
            <div className="table-base-row p-3 w-full border-[#E4E4E4] rounded-[4px] "><p className="text-[#727272] rounded bg-transparent border-none">{startDate || 'August 1, 2024'}</p></div>
            <div className="table-base-row p-3 w-full border-[#E4E4E4] rounded-[4px] ">
              <div className="flex items-center gap-2 px-2 py-1 bg-[#FEEDED] border-none rounded-full">
                <span className='w-3 h-3 rounded-full bg-[#DC2626]'></span>
                <p className="text-[#DC2626] rounded bg-transparent border-none">{status || 'En attend'}</p>
              </div>
            </div>
            <div className="table-base-row p-3 w-full border-[#E4E4E4] rounded-[4px] "><p className="text-[#727272] rounded bg-transparent border-none">{more || (<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="cursor-pointer icon icon-tabler icons-tabler-outline icon-tabler-external-link"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" /><path d="M11 13l9 -9" /><path d="M15 4h5v5" /></svg>)}</p></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListMissions