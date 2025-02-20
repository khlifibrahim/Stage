import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { fetchEnterprise } from '../../../Redux/Actions/enterprise.actions';
import { createControl, updateControl } from '../../../Redux/Actions/control.actions';


export const Newcontrol = () => {
  const dispatch = useDispatch()
  const theNavigate = useNavigate()
  const {enterprises} = useSelector(state => state.enterprise)
  const { control } = useSelector( state => state)
  
  const [controlState, setcontrolState] = useState(control)
  // const [controlState, setcontrolState] = useState({
  //  entID: "",
  //  pratics: [
  //     {name: "Affichage des prix", status: "conform", observation: ''},
  //     {name: "Etiquetage", status: "conform", observation: ''},
  //     {name: "Publicite", status: "conform", observation: ''},
  //     {name: "Garantie", status: "conform", observation: ''},
  //     {name: "Solde", status: "conform", observation: ''},
  //     {name: "Facture", status: "conform", observation: ''}
  //  ],
  //  executedAt: {executed: false, at: getCurrentDate()},
  //  edited: ""

  // })
  const [error, setError] = useState('')

  const handleRadioChange = (index, status) => {
    setcontrolState((prev) => ({
      ...prev,
      pratics: prev.pratics.map((p, i) => 
        i === index 
        ? { ...p, status, observation: status === "conform" ? "" : p.observation} 
        : p
      )
    }));
  };
  
  const handleObservationChange = (index, observation) => {
    setcontrolState((prev) => ({
        ...prev,
        pratics: prev.pratics.map((p, i) => i === index ? {...p, observation } : p
      )
    }))
  };

  const [step, setStep] = useState(1)
  const steps = Array.from(document.getElementsByClassName('step'))

  useEffect( ()=> {
          dispatch(fetchEnterprise())
    }, [dispatch])

  function isValide () {
    switch (step) {
      case 1:
        if(!controlState.entID) {
          setError('Choisi un Entreprise!')
          return false
        }
        break;

      default:
        setError("")
        return true
    }
    setError("")
    return true
  }
  const next = (e)=> {
    e.preventDefault()
    if(!isValide()) return
    if(step < steps.length) {
      setStep(
        step + 1
      )
    }else {
      console.log('controlState Created!!')
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
  const handleEnterpriseSelect = (selectedEnt) => {
    console.log("Ent ID: ",selectedEnt.value)
    setcontrolState(prev => ({
      ...prev, 
      entID: selectedEnt.value
    }))
    setError('')
  }
  const handleAddEntreprise = () => {
    theNavigate('/dashboard/entreprise/add')
  }

  console.log('controlState State: ', controlState)

  function getCurrentDate () {
    const d = new Date()
    const year = d.getFullYear()
    const month = d.getMonth() + 1
    const day = d.getDate()
    const hour = d.getHours()
    const min = d.getMinutes()
    const sec = d.getSeconds()
    
  }
  

  return (
    <div className="px-6 fleex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{"Créer controlState"}</h1>
      </div>

      <form onSubmit={next} action="" className='h-full flex flex-col justify-between'>
        <div className="steps w-full min-h-full flex items-stretch justify-center">
          <div className={`step ${step === 1 ? '' : 'hidden'} w-full`}>
            <p className='text-xl font-semibold mb-2'><span className=''>{step}</span> - Choisi un Entreprise</p>
            <div className='flex flex-col items-start justify-center flex-wrap'>
                <label className="font-medium text-sm mb-1 gap-2">ICE *</label>
                <div className="flex gap-2 grow basis-auto max-md:w-full">
                  <Select 
                    classNames={{
                      controlState: (state) =>
                        `border !rounded-[10px] px-2 !min-w-[320px] !w-full focus:outline-blue ${state.isFocused ? 'ring-2 ring-blue-500 border-blue-500' : 'order-gray-300'}`,
                      menu: () => 'border !rounded-[10px]  !mt-1 !p-0 overflow-hidden',
                      option: () => 'hover:bg-bg-blue hover:text-blue px-4 py-0',
                      placeholder: () => 'text-gray-300',
                    }}
                    options={enterprises.map(ent => ({
                      value: ent.ICE,
                      label: `${ent.nom_entreprise} - ${ent.ICE}`
                    }))} 
                    onChange={handleEnterpriseSelect}
                    placeholder="Recherche par ICE ou Nom..."
                    noOptionsMessage={()=> "Aucune entreprise trouvé"}
                    isSearchable/>
                  <button type='button' onClick={handleAddEntreprise} className="px-3 py-2 bg-bg-blue text-blue font-medium font-poppins text-base rounded-[10px] hover:bg-blue hover:text-white transition-colors">Ajouter</button>
                </div>
                { error && <p className={`basis-full text-red-500 text-sm`}>{error} </p>}

                
            </div>
          </div>
          <div className={`step ${step === 2 ? '' : 'hidden'} w-full mb-4`}>
            <p className='text-xl font-semibold mb-2'><span className=''>{step}</span> - Pratiques</p>
            <div>
              <div className='flex items-center justify-between gap-2'>
                <div className=''>
                  <p>Executer à:</p>
                  <input type="text" placeholder='2025-03-41' value={controlState.executed} disabled/> 
                </div>
                {/* <div className=''>
                  <p>Commencer à:</p>
                  <input type="date" /> 
                </div> */}
                <div className=''>
                  <p>Modifier le:</p>
                  <input type="text" placeholder='2025-03-41' disabled/>
                </div>
              </div>

              <div className="pratics">
                <div className='my-2 flex flex-col items-start justify-start flex-wrap'>
                    {controlState.pratics && controlState.pratics.map((p, i) => {
                      return (
                        <div key={p.name || i} className='flex items-center flex-wrap gap-6 px-2 py-3 my-1 '>
                          <p className='font-medium text-base flex-initial'>{p.name}</p>

                          <div className="flex items-center gap-3">

                            <div className={`flex items-center cursor-pointer hover:text-blue`}>
                              <div className='grid place-items-center place-content-center mt-1'>
                                <input onChange={() => handleRadioChange(i, 'conform')} className='peer col-start-1 row-start-1 mr-2 appearance-none shrink-0 mt-1 w-4 h-4 border-2 border-blue rounded-full' type="radio" value="conform"
                                  name={`conform`}
                                  id={`${p.name}-conform`}
                                  checked={p.status === "conform"}/>
                                <div className={`col-start-1 row-start-1 w-2 h-2 rounded-full ${p.status === 'conform' ? 'bg-blue' : 'bg-transparent'} mt-1 mr-2`}/>
                              </div>
                              <label htmlFor={`${p.name}-conform`} className='cursor-pointer'>Conform</label>
                            </div>

                            <div className={`flex items-center cursor-pointer hover:text-blue`} >
                              <div className='grid place-items-center place-content-center mt-1'>
                                <input onChange={() => handleRadioChange(i, 'nonconform')} className='peer col-start-1 row-start-1 mr-2 appearance-none shrink-0 mt-1 w-4 h-4 border-2 border-blue rounded-full' type="radio"
                                  value="nonconform"
                                  name={`nonconform`}
                                  id={`${p.name}-nonconform`}
                                  checked={p.status === "nonconform"}/>
                                <div className={`col-start-1 row-start-1 w-2 h-2 rounded-full ${p.status === 'nonconform' ? 'bg-blue' : 'bg-transparent'} mt-1 mr-2`}/>
                              </div>
                              <label htmlFor={`${p.name}-nonconform`} className='cursor-pointer'>Non Conform</label>
                            </div>
                          </div>

                          {p.status === 'nonconform' && (
                            <div className='flex flex-col'>
                              <label htmlFor="">Observation: </label>
                              <textarea 
                                className='basis-full min-w-[314px] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue placeholder-gray-400 max-md:w-full'
                                placeholder='Observation'
                                rows={3}
                                value={p.observation}
                                onChange={(e) => handleObservationChange(i, e.target.value)}
                                />
                            </div>
                          )}
                        </div>
                      ) 
                      
                    })}


                </div>
              </div>
            </div>
          </div>
          
          <div className={`step ${step === 3 ? '' : 'hidden'} w-full mb-4`}>
            <p className='text-xl font-semibold mb-2'><span className=''>{step}</span> - Validation</p>

            <div>
            </div>
          </div>
        </div>

        <div className={`flex items-center ${step === 1 ? 'justify-end' : 'justify-between'}`}>
          <button onClick={prev} className={`${step === 1 ? 'hidden' : ''} px-3 py-2  bg-[#E4E4E4] font-medium font-poppins text-base rounded-[10px] hover:!bg-bg-blue hover:text-blue  transition-colors`} disabled={step === 1 ? true : false}>Avant</button>
          <button type='submit' onClick={next} className={`px-3 py-2  bg-[#E4E4E4]  font-medium font-poppins text-base rounded-[10px] hover:!bg-bg-blue hover:text-blue  transition-colors`} >{step === steps.length ? 'Validé': 'Suivant' } </button>
        </div>
      </form>
    </div>
  )
}


export default Newcontrol