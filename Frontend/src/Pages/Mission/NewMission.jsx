import React from 'react'

function NewMission() {
  return (
    <div className='flex flex-col gap-8'>
      <div className="header">
        <h1 className='font-poppins font-bold text-[36px]'>Crée Ordre de Mission</h1>
      </div>
      <div className="form flex items-start justify-center h-full">
        <form action="">

          <div className='groop flex items-center justify-between'>
              <div className='title flex justify-center items-center w-[334px] h-[38px] px-3 rounded-[10px] border-border border focus-within:border-blue overflow-hidden'>
                  
                  <input type="text" placeholder='Chercher....' className='w-full h-full bg-transparent outline-none '/>
              </div>
              
              <div className='name flex justify-center items-center w-[334px] h-[38px] px-3 rounded-[10px] border-border border focus-within:border-blue overflow-hidden'>
                  
                  <input type="text" placeholder='Chercher....' className='w-full h-full bg-transparent outline-none '/>
              </div>
          </div>

        </form>
        <div className="live w-1/2 h-full bg-blue">
          preview
        </div>
      </div>
    </div>
  )
}

export default NewMission