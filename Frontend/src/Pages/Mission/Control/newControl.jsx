import React, { useState } from 'react'
import AddEnterprise from '../../Enterprise/AddEnterprise'


export const NewControl = () => {

  const [step, setStep] = useState(1)

  const next = (e)=> {
    e.preventDefault()
    if(step < 4) {
      setStep(
        step + 1
      )
    }
  }
  
  const prev = (e)=> {
    e.preventDefault()
    if(step > 1) {
      setStep(
        step - 1
      )
    }
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{"Créer Control"}</h1>
      </div>

      <form action="" className='h-full'>
        <div className="steps w-full min-h-full flex items-stretch justify-center">
          <div className={`${step === 1 ? '' : 'hidden'} bg-bg-blue`}>step 1</div>
          <div className={`${step === 2 ? '' : 'hidden'} bg-bg-blue`}>step 2</div>
          <div className={`${step === 3 ? '' : 'hidden'} bg-bg-blue`}>step 3</div>
          <div className={`${step === 4 ? '' : 'hidden'} bg-bg-blue`}>step 4</div>
        </div>

        <div className='flex items-center justify-between'>
          <button onClick={prev} className='px-3 py-2  bg-[#E4E4E4]  font-medium font-poppins text-base rounded-[10px] hover:!bg-bg-blue hover:text-blue  transition-colors'>Avant</button>
          <button onClick={next} className='px-3 py-2  bg-[#E4E4E4]  font-medium font-poppins text-base rounded-[10px] hover:!bg-bg-blue hover:text-blue  transition-colors'>Suivant</button>
        </div>
      </form>
    </div>
  )
}


export default NewControl