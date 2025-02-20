import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { fetchEnterprise } from '../../../Redux/Actions/enterprise.actions';


export const NewControl = () => {
  const dispatch = useDispatch()
  const theNavigate = useNavigate()
  const {enterprises} = useSelector(state => state.enterprise)
  
  const [conform, setConform] = useState({
   id_ent: "",
   pratics: [
      {Affichage_des_prix: { status: "conform", observation: ''}},
      {Etiquetage: {status: "conform", observation: ''}},
      {Publicite: {status: "conform", observation: ''}},
      {Garantie: {status: "conform", observation: ''}},
      {Solde: {status: "conform", observation: ''}},
      {Facture: {status: "conform", observation: ''}}
   ]
   ,
   executed_at: {executed: true, at: getCurrentDate()},
   edited: ""

  })
  const handleControl = (e)=> {
    setConform(prev => ({
      ...prev,
      conform: !true,
      nonconform: !false
    }))
  }
  const handleRadioChange = (practice, status) => {
    setConform(prev => ({
      ...prev,
      pratics: prev.pratics.map(p => {
        const key = Object.keys(p)[0];
        if (key === practice) {
          return { [key]: { status, observation: status === 'nonconform' ? p[key].observation : '' } };
        }
        return p;
      })
    }));
  };
  const handleObservationChange = (practice, observation) => {
    setConform(prev => ({
      ...prev,
      pratics: prev.pratics.map(p => {
        const key = Object.keys(p)[0];
        if (key === practice) {
          return { [key]: { ...p[key], observation } };
        }
        return p;
      })
    }));
  };

  const [step, setStep] = useState(2)
  const steps = Array.from(document.getElementsByClassName('step'))

  useEffect( ()=> {
          dispatch(fetchEnterprise())
    }, [dispatch])

  const next = (e)=> {
    e.preventDefault()

    if(step < steps.length) {
      setStep(
        step + 1
      )
    }else {
      console.log('Control Created!!')
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
  const handleAddEntreprise = () => {
    theNavigate('/dashboard/entreprise/add')
  }

  function getCurrentDate () {
    const d = new Date()
    const year = d.getFullYear()
    const month = d.getMonth() + 1
    const day = d.getDate()
    const hour = d.getHours()
    const min = d.getMinutes()
    const sec = d.getSeconds()
    
  }
  console.log(getCurrentDate())

  return (
    <div className="px-6 fleex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{"Créer Control"}</h1>
      </div>

      <form onSubmit={next} action="" className='h-full flex flex-col justify-between'>
        <div className="steps w-full min-h-full flex items-stretch justify-center">
          <div className={`step ${step === 1 ? '' : 'hidden'} w-full`}>
            <p className='text-xl font-semibold mb-2'><span className=''>{step}</span> - Choisi un Entreprise</p>
            <div className='flex flex-col items-start justify-center'>
                {/* <label className="font-medium text-sm mb-1 gap-2">ICE *</label> */}
                <div className="flex gap-2 grow basis-auto max-md:w-full">
                  <Select 
                    classNames={{
                      control: (state) =>
                        `border !rounded-[10px] px-2 !min-w-[320px] !w-full focus:outline-blue ${state.isFocused ? 'ring-2 ring-blue-500 border-blue-500' : 'order-gray-300'}`,
                      menu: () => 'border !rounded-[10px]  !mt-1 !p-0 overflow-hidden',
                      option: () => 'hover:bg-bg-blue hover:text-blue px-4 py-0',
                      placeholder: () => 'text-gray-300',
                    }}
                    options={enterprises.map(ent => ({
                      value: ent.ICE,
                      label: `${ent.nom_entreprise} - ${ent.ICE}`
                    }))} 
                    // onChange={handleOptions}
                    placeholder="Recherche par ICE ou Nom..."
                    noOptionsMessage={()=> "Aucune entreprise trouvé"}
                    isSearchable/>
                  <button type='button' onClick={handleAddEntreprise} className="px-3 py-2 bg-bg-blue text-blue font-medium font-poppins text-base rounded-[10px] hover:bg-blue hover:text-white transition-colors">Ajouter</button>
                </div>

                
            </div>
          </div>
          <div className={`step ${step === 2 ? '' : 'hidden'} w-full mb-4`}>
            <p className='text-xl font-semibold mb-2'><span className=''>{step}</span> - Pratiques</p>
            <div>
              <div className='flex items-center justify-between gap-2'>
                <div className=''>
                  <p>Executer à:</p>
                  <input type="text" placeholder='2025-03-41' value={conform.executed} disabled/> 
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
                    {conform.pratics.map((p, i) => {
                      const key = Object.keys(p)[0]
                      const { status, observation} = p[key]
                      return (
                        <div key={i} className='flex items-center flex-wrap gap-6 px-2 py-3 my-1 '>
                          <p className='font-medium text-base flex-initial'>{key.replace(/_/g, ' ')}</p>

                          <div className="flex items-center gap-3">

                            <div className={`flex items-center cursor-pointer hover:text-blue`}>
                              <div className='grid place-items-center place-content-center mt-1'>
                                <input onChange={() => handleRadioChange(key, 'conform')} className='peer col-start-1 row-start-1 mr-2 appearance-none shrink-0 mt-1 w-4 h-4 border-2 border-blue rounded-full' type="radio" value="conform"
                                  name={`${key}-conform`}
                                  id={`${key}-conform`}
                                  checked={status === "conform"}/>
                                <div className={`col-start-1 row-start-1 w-2 h-2 rounded-full ${conform === 'conform' ? 'bg-blue' : 'bg-transparent'} mt-1 mr-2`}/>
                              </div>
                              <label htmlFor={`${key}-conform`} className='cursor-pointer'>Conform</label>
                            </div>

                            <div className={`flex items-center cursor-pointer hover:text-blue`} >
                              <div className='grid place-items-center place-content-center mt-1'>
                                <input onChange={() => handleRadioChange(key, 'nonconform')} className='peer col-start-1 row-start-1 mr-2 appearance-none shrink-0 mt-1 w-4 h-4 border-2 border-blue rounded-full' type="radio"
                                  value="nonconform"
                                  name={`${key}-conform`}
                                  id={`${key}-nonconform`}
                                  checked={status === "nonconform"}/>
                                <div className={`col-start-1 row-start-1 w-2 h-2 rounded-full ${conform === 'nonconform' ? 'bg-blue' : 'bg-transparent'} mt-1 mr-2`}/>
                              </div>
                              <label htmlFor={`${key}-nonconform`} className='cursor-pointer'>Non Conform</label>
                            </div>
                          </div>

                          {conform === 'nonconform' && (
                            <div>
                              <label htmlFor="">Observation: </label>
                              <textarea 
                                className='basis-full min-w-[314px] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue placeholder-gray-400'
                                placeholder='Observation'
                                rows={3}
                                value={observation}
                                onChange={(e) => handleObservationChange(key, e.target.value)}
                                />
                            </div>
                          )}
                        </div>
                      )
                    })}
                    {/* <div className='flex items-center flex-wrap gap-6 px-2 py-3 my-1 '>
                      <p className='font-medium text-base flex-initial'>Affichage des prix</p>

                      <div className="flex items-center gap-3">

                        <div onClick={(e) =>console.log("Value of radio :",handleConform) } className={`flex items-center cursor-pointer hover:text-blue`}>
                          <div className='grid place-items-center place-content-center mt-1'>
                            <input onChange={(e)=> setConform(e.target.value)} className='peer col-start-1 row-start-1 mr-2 appearance-none shrink-0 mt-1 w-4 h-4 border-2 border-blue rounded-full' type="radio" value="conform" name="conform" id="conform" checked={conform === "conform"}/>
                            <div className={`col-start-1 row-start-1 w-2 h-2 rounded-full ${conform === 'conform' ? 'bg-blue' : 'bg-transparent'} mt-1 mr-2`}/>
                          </div>
                          <label htmlFor="conform" className='cursor-pointer'>Conform</label>
                        </div>

                        <div onClick={(e) =>console.log("Value of radio :",e.target.value) }  className={`flex items-center cursor-pointer hover:text-blue`} >
                          <div className='grid place-items-center place-content-center mt-1'>
                            <input onChange={(e)=> setConform(e.target.value)} className='peer col-start-1 row-start-1 mr-2 appearance-none shrink-0 mt-1 w-4 h-4 border-2 border-blue rounded-full' type="radio" value="nonconform" name="conform" id="nonconform" checked={conform === "nonconform"}/>
                            <div className={`col-start-1 row-start-1 w-2 h-2 rounded-full ${conform === 'nonconform' ? 'bg-blue' : 'bg-transparent'} mt-1 mr-2`}/>
                          </div>
                          <label htmlFor="nonconform" className='cursor-pointer'>Non Conform</label>
                        </div>
                      </div>

                      {conform === 'nonconform' && (
                        <div>
                          <label htmlFor="">Observation: </label>
                          <textarea 
                            className='basis-full min-w-[314px] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue placeholder-gray-400'
                            placeholder='Observation'
                            rows={3}
                            />
                        </div>
                      )}
                    </div> */}



                    
                    {/* <div className='flex items-center flex-wrap gap-6 px-2 py-3 my-1 '>
                      <p className='font-medium text-base flex-initial'>Etiquetage</p>

                      <div className="flex items-center gap-3">

                        <div className={`flex items-center cursor-pointer hover:text-blue`}>
                          <div className='grid place-items-center place-content-center mt-1'>
                            <input onChange={(e)=> setConform(e.target.value)} className='peer col-start-1 row-start-1 mr-2 appearance-none shrink-0 mt-1 w-4 h-4 border-2 border-blue rounded-full' type="radio" value="conform" name="conform" id="conform" checked={conform === "conform"}/>
                            <div className={`col-start-1 row-start-1 w-2 h-2 rounded-full ${conform === 'conform' ? 'bg-blue' : 'bg-transparent'} mt-1 mr-2`}/>
                          </div>
                          <label htmlFor="conform" className='cursor-pointer'>Conform</label>
                        </div>

                        <div  className={`flex items-center cursor-pointer hover:text-blue`} >
                          <div className='grid place-items-center place-content-center mt-1'>
                            <input onChange={(e)=> setConform(e.target.value)} className='peer col-start-1 row-start-1 mr-2 appearance-none shrink-0 mt-1 w-4 h-4 border-2 border-blue rounded-full' type="radio" value="nonconform" name="conform" id="nonconform" checked={conform === "nonconform"}/>
                            <div className={`col-start-1 row-start-1 w-2 h-2 rounded-full ${conform === 'nonconform' ? 'bg-blue' : 'bg-transparent'} mt-1 mr-2`}/>
                          </div>
                          <label htmlFor="nonconform" className='cursor-pointer'>Non Conform</label>
                        </div>
                      </div>

                      {conform === 'nonconform' && (
                        <div>
                          <label htmlFor="">Observation: </label>
                          <textarea 
                          className='basis-full min-w-[314px] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue placeholder-gray-400'
                          placeholder='Observation'
                          rows={3}
                          />
                        </div>
                      )}
                    </div>

                    <div className='flex items-center flex-wrap gap-6 px-2 py-3 my-1 '>
                      <p className='font-medium text-base flex-initial'>Publicité</p>

                      <div className="flex items-center gap-3">

                        <div className={`flex items-center cursor-pointer hover:text-blue`}>
                          <div className='grid place-items-center place-content-center mt-1'>
                            <input onChange={(e)=> setConform(e.target.value)} className='peer col-start-1 row-start-1 mr-2 appearance-none shrink-0 mt-1 w-4 h-4 border-2 border-blue rounded-full' type="radio" value="conform" name="conform" id="conform" checked={conform === "conform"}/>
                            <div className={`col-start-1 row-start-1 w-2 h-2 rounded-full ${conform === 'conform' ? 'bg-blue' : 'bg-transparent'} mt-1 mr-2`}/>
                          </div>
                          <label htmlFor="conform" className='cursor-pointer'>Conform</label>
                        </div>

                        <div  className={`flex items-center cursor-pointer hover:text-blue`} >
                          <div className='grid place-items-center place-content-center mt-1'>
                            <input onChange={(e)=> setConform(e.target.value)} className='peer col-start-1 row-start-1 mr-2 appearance-none shrink-0 mt-1 w-4 h-4 border-2 border-blue rounded-full' type="radio" value="nonconform" name="conform" id="nonconform" checked={conform === "nonconform"}/>
                            <div className={`col-start-1 row-start-1 w-2 h-2 rounded-full ${conform === 'nonconform' ? 'bg-blue' : 'bg-transparent'} mt-1 mr-2`}/>
                          </div>
                          <label htmlFor="nonconform" className='cursor-pointer'>Non Conform</label>
                        </div>
                      </div>

                      {conform === 'nonconform' && (
                        <div>
                          <label htmlFor="">Observation: </label>
                          <textarea 
                          className='basis-full min-w-[314px] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue placeholder-gray-400'
                          placeholder='Observation'
                          rows={3}
                          />
                        </div>
                      )}
                    </div>

                    <div className='flex items-center flex-wrap gap-6 px-2 py-3 my-1 '>
                      <p className='font-medium text-base flex-initial'>Garantie</p>

                      <div className="flex items-center gap-3">

                        <div className={`flex items-center cursor-pointer hover:text-blue`}>
                          <div className='grid place-items-center place-content-center mt-1'>
                            <input onChange={(e)=> setConform(e.target.value)} className='peer col-start-1 row-start-1 mr-2 appearance-none shrink-0 mt-1 w-4 h-4 border-2 border-blue rounded-full' type="radio" value="conform" name="conform" id="conform" checked={conform === "conform"}/>
                            <div className={`col-start-1 row-start-1 w-2 h-2 rounded-full ${conform === 'conform' ? 'bg-blue' : 'bg-transparent'} mt-1 mr-2`}/>
                          </div>
                          <label htmlFor="conform" className='cursor-pointer'>Conform</label>
                        </div>

                        <div  className={`flex items-center cursor-pointer hover:text-blue`} >
                          <div className='grid place-items-center place-content-center mt-1'>
                            <input onChange={(e)=> setConform(e.target.value)} className='peer col-start-1 row-start-1 mr-2 appearance-none shrink-0 mt-1 w-4 h-4 border-2 border-blue rounded-full' type="radio" value="nonconform" name="conform" id="nonconform" checked={conform === "nonconform"}/>
                            <div className={`col-start-1 row-start-1 w-2 h-2 rounded-full ${conform === 'nonconform' ? 'bg-blue' : 'bg-transparent'} mt-1 mr-2`}/>
                          </div>
                          <label htmlFor="nonconform" className='cursor-pointer'>Non Conform</label>
                        </div>
                      </div>

                      {conform === 'nonconform' && (
                        <div>
                          <label htmlFor="">Observation: </label>
                          <textarea 
                          className='basis-full min-w-[314px] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue placeholder-gray-400'
                          placeholder='Observation'
                          rows={3}
                          />
                        </div>
                      )}
                    </div>

                    <div className='flex items-center flex-wrap gap-6 px-2 py-3 my-1 '>
                      <p className='font-medium text-base flex-initial'>Solde</p>

                      <div className="flex items-center gap-3">

                        <div className={`flex items-center cursor-pointer hover:text-blue`}>
                          <div className='grid place-items-center place-content-center mt-1'>
                            <input onChange={(e)=> setConform(e.target.value)} className='peer col-start-1 row-start-1 mr-2 appearance-none shrink-0 mt-1 w-4 h-4 border-2 border-blue rounded-full' type="radio" value="conform" name="conform" id="conform" checked={conform === "conform"}/>
                            <div className={`col-start-1 row-start-1 w-2 h-2 rounded-full ${conform === 'conform' ? 'bg-blue' : 'bg-transparent'} mt-1 mr-2`}/>
                          </div>
                          <label htmlFor="conform" className='cursor-pointer'>Conform</label>
                        </div>

                        <div  className={`flex items-center cursor-pointer hover:text-blue`} >
                          <div className='grid place-items-center place-content-center mt-1'>
                            <input onChange={(e)=> setConform(e.target.value)} className='peer col-start-1 row-start-1 mr-2 appearance-none shrink-0 mt-1 w-4 h-4 border-2 border-blue rounded-full' type="radio" value="nonconform" name="conform" id="nonconform" checked={conform === "nonconform"}/>
                            <div className={`col-start-1 row-start-1 w-2 h-2 rounded-full ${conform === 'nonconform' ? 'bg-blue' : 'bg-transparent'} mt-1 mr-2`}/>
                          </div>
                          <label htmlFor="nonconform" className='cursor-pointer'>Non Conform</label>
                        </div>
                      </div>

                      {conform === 'nonconform' && (
                        <div>
                          <label htmlFor="">Observation: </label>
                          <textarea 
                          className='basis-full min-w-[314px] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue placeholder-gray-400'
                          placeholder='Observation'
                          rows={3}
                          />
                        </div>
                      )}
                    </div>

                    <div className='flex items-center flex-wrap gap-6 px-2 py-3 my-1 '>
                      <p className='font-medium text-base flex-initial'>Facture</p>

                      <div className="flex items-center gap-3">

                        <div className={`flex items-center cursor-pointer hover:text-blue`}>
                          <div className='grid place-items-center place-content-center mt-1'>
                            <input onChange={(e)=> setConform(e.target.value)} className='peer col-start-1 row-start-1 mr-2 appearance-none shrink-0 mt-1 w-4 h-4 border-2 border-blue rounded-full' type="radio" value="conform" name="conform" id="conform" checked={conform === "conform"}/>
                            <div className={`col-start-1 row-start-1 w-2 h-2 rounded-full ${conform === 'conform' ? 'bg-blue' : 'bg-transparent'} mt-1 mr-2`}/>
                          </div>
                          <label htmlFor="conform" className='cursor-pointer'>Conform</label>
                        </div>

                        <div  className={`flex items-center cursor-pointer hover:text-blue`} >
                          <div className='grid place-items-center place-content-center mt-1'>
                            <input onChange={(e)=> setConform(e.target.value)} className='peer col-start-1 row-start-1 mr-2 appearance-none shrink-0 mt-1 w-4 h-4 border-2 border-blue rounded-full' type="radio" value="nonconform" name="conform" id="nonconform" checked={conform === "nonconform"}/>
                            <div className={`col-start-1 row-start-1 w-2 h-2 rounded-full ${conform === 'nonconform' ? 'bg-blue' : 'bg-transparent'} mt-1 mr-2`}/>
                          </div>
                          <label htmlFor="nonconform" className='cursor-pointer'>Non Conform</label>
                        </div>
                      </div>

                      {conform === 'nonconform' && (
                        <div>
                          <label htmlFor="">Observation: </label>
                          <textarea 
                          className='basis-full min-w-[314px] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue placeholder-gray-400'
                          placeholder='Observation'
                          rows={3}
                          />
                        </div>
                      )}
                    </div> */}


                </div>
              </div>
            </div>
          </div>
          
          <div className={`step ${step === 3 ? '' : 'hidden'} w-full mb-4`}>
            <p className='text-xl font-semibold mb-2'><span className=''>{step}</span> - Validation</p>

            <div>
              {/* {
                (conform.pratics.ap.status === 'conform' &&  conform.pratics.Etiquetage.status === 'conform' &&  conform.pratics.Publicite.status === 'conform' &&  conform.pratics.Garantie.status === 'conform' &&  conform.pratics.Solde.status === 'conform' && conform.pratics.Facture.status === 'conform') ?
                (
                  <p>valider</p>
                ) : (
                  <p>Non validé</p>
                )
              } */}
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


export default NewControl