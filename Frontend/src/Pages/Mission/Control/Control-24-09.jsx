import React, { useState, useEffect } from 'react'
import Instance from '../../../Api/axios';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { fetchEnterprise, getEnterpriseById } from '../../../Redux/Actions/enterprise.actions';
import { createControl24 } from '../../../Redux/Actions/control24.actions';
import Select from 'react-select';
import DQSM301bis from './forms-to-print/DQSM301bis'

function NewControl24() {
  const dispatch = useDispatch()
  const theNavigate = useNavigate()
  const theLocation = useLocation();
  const {enterprises} = useSelector(state => state.enterprise)
  
  const [control, setControl] = useState({})
  const [Enterprise, setEnterprise] = useState({})
  const [famillies, setFamillies] = useState({})
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [DispalyError, setDispalyError] = useState(null)
  const [step, setStep] = useState(5)
  const steps = Array.from(document.getElementsByClassName('step'))
  const [stepValid, setStepVaid] = useState()

  const missionID = theLocation.state?.id
  const cadreid = theLocation.state?.cadreId

  console.log('Mission Id :' , missionID)
  console.log('Cadre id: ', cadreid)
  
  useEffect( ()=> {
    setControl(prev => ({
      ...prev,
      cadreId: cadreid,
      missionID: missionID
    }))
  }, [theLocation.state])
  useEffect( ()=> {
      dispatch(fetchEnterprise())
    }, [dispatch])
  useEffect(()=> {
    if(control.entID) {
      dispatch(getEnterpriseById(control.entID))
    }
  }, [dispatch, control.entID])
  const handleEnterpriseSelect = (selectedEnt) => {
    setControl(prev => ({
      ...prev, 
      entID: selectedEnt.value.ICE
    }))
    setEnterprise(selectedEnt.value)
    setDispalyError(null)
  }
  
  useEffect(()=> {
    const fetchFAmillyProdAndProducts = async () => {
        try {
          const famillyResponse = await Instance.get('/products/familly/list')
          const famillies = famillyResponse.data.familly || []

          const productsResponse = await Instance.get('/products/product/list')
          const products = productsResponse.data.products || []
          
          const famillyAndProducts = famillies.reduce((acc, familly) => {
            acc[familly.id_familleproduit] = {
              ...familly,
              product: products.filter(product => product.id_familleproduit === familly.id_familleproduit)
            }
            return acc
          }, {})
          setFamillies(famillyAndProducts)
        } catch (error) {
          console.error('Error fetshing data: ', error)
        }
    }
    fetchFAmillyProdAndProducts()
  }, [])

  const handleFamilleProduct = (selected) => {
    setControl(prev => ({
      ...prev,
      familleProductId: selected.value,
      familleProductname: selected.label
    }))

    // 
  }
  const handleProduct = (selected) => {
    setControl(prev => ({
      ...prev,
      productId: selected.value,
      productname: selected.label
    }))
    setSelectedProduct(selected);
  }

const handleControl = (field, value) => {
  setControl(prev => {
    const newState = {
      ...prev,
      [field]: value
    }

    if(field === 'controlDoc' && value === true) {
      setStepVaid(true)
    }else if(field === 'controlPh' && value === true) {
      setStepVaid(true)
    }else {
      setStepVaid(false)
    }

    return newState
  });
};

const handleStatus = (status) => {
  setControl(prev => ({
    ...prev,
    status: status
  }))
}


// console.log('Check step is valid: ', stepValid)

  function isValide () {
    switch (step) {
      case 1:
        if(!control.entID) {
          setDispalyError((
              <div className='absolute top-10 left-1/4 z-50 transition-all'>
              <p className='text-red-500 font-medium text-lg bg-red-200 px-4 py-2.5 rounded-[10px] '>Choisi un Entreprise!</p>
            </div>))
            setTimeout(() => {
              setDispalyError(null)
            }, 1500);
          return false
        }
        break;
      case 2:
        if(!control.familleProductId || !control.productId) {
          setDispalyError((
            <div className='absolute top-10 left-1/4 z-50 transition-all'>
              <p className='text-red-500 font-medium text-lg bg-red-200 px-4 py-2.5 rounded-[10px] '>Choisi un famille de produit!</p>
            </div>))
            setTimeout(() => {
              setDispalyError(null)
            }, 1500);
          return false
        }
        break;

      default:
        setDispalyError(null)
        return true
    }
    setDispalyError(null)
    return true
  }

  const next = (e)=> {
      e.preventDefault()
      if(!isValide()) return
      if(step < steps.length ) {
        setStep(
          step + 1
        )
      if(stepValid) {return setStep(steps.length)}
      }else {
        dispatch(createControl24(control));
        theNavigate('/dashboard/orderMissions/control/list', {state: {message: "Controle Créé avec succée!"}})
        console.log('Produit Crée Avec Succée')
        console.log(control)
      }
    }
    
    const prev = (e)=> {
      e.preventDefault()
      if(step > 1) {
        setStep(
          step - 1
        )
      }
      if(stepValid === true) {
        setStep(2) 
        setStepVaid(false)}
    }
  const handleAddEntreprise = () => {
    theNavigate('/dashboard/entreprise/add')
  }

  const handleNewProduct = () => {
    dispatch(createControl24(control));
    setStep(2)
  }

  return (
    <div className='px-6 flex flex-col max-md:px-0'>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{"Créer Control"}</h1>
      </div>

      <form action="" onSubmit={next} className='h-full w-full flex flex-col justify-between'>
        <div className={`step ${step === 1 ? '' : 'hidden'} w-full`}>
          <p className='text-xl font-semibold mb-2'><span className=''>{step}</span> - Choisi une Entreprise</p>
          <div className='flex flex-col items-start justify-center flex-wrap'>
              <label className="font-medium text-sm mb-1 gap-2">Raison Social/ICE *</label>
              <div className="flex gap-2 grow flex-wrap basis-full w-full max-md:w-full">
                <Select 
                  classNames={{
                    control: (state) =>
                      `border !rounded-[10px] px-2 !min-w-full !w-full !basis-full focus:outline-blue ${state.isFocused ? 'ring-2 ring-blue-500 border-blue-500' : 'order-gray-300'} max-md:w-full`,
                    menu: () => 'border !rounded-[10px]  !mt-1 !p-0 overflow-hidden',
                    option: () => 'hover:bg-bg-blue hover:text-blue px-4 py-0',
                    placeholder: () => 'text-gray-300',
                  }}
                  options={enterprises.map(ent => ({
                    value: ent,
                    label: `${ent.raison_sociale} - ${ent.ICE}`
                  }))} 
                  onChange={handleEnterpriseSelect}
                  placeholder="Nom d'Entreprise ..."
                  noOptionsMessage={()=> "Aucune entreprise trouvé"}
                  isSearchable
                  />
              {  !control?.entID &&
                (<button type='button' onClick={handleAddEntreprise} className={`px-3 py-2 bg-bg-blue text-blue font-medium font-poppins text-base rounded-[10px] hover:bg-blue hover:text-white transition-colors max-md:basis-full`}>Ajouter</button>)
              }
              </div>
              {Object.entries(Enterprise).length > 0  && (<div className='py-4 flex flex-col gap-4 w-full'>
                <h1 className='text-xl font-semibold'>{Enterprise.raison_sociale}</h1>
                <div className='flex flex-wrap items-center justify-between py-2 border-t-2 border-gray-200'>
                  <div className=''>
                    <p className='font-semibold text-lg'>ICE:</p>
                    <p>{Enterprise.ICE}</p>
                  </div>
                  <div className=''>
                    <p className='font-medium text-lg'>Numero RC:</p>
                    <p>{Enterprise.numero_rc} </p>
                  </div>
                  <div className=''>
                    <p className='font-medium text-lg'>Identidiant Fiscal:</p>
                    <p>{Enterprise.identifiant_fiscal} </p>
                  </div>
                  <div className=''>
                    <p className='font-medium text-lg'>Numero CNSS:</p>
                    <p>{Enterprise.numero_cnss}</p>
                  </div>
                </div>
                <div className='flex flex-wrap items-center justify-between py-2 border-t-2 border-gray-200'>
                  <div className=''>
                    <p className='font-medium text-lg'>Region:</p>
                    <p>{Enterprise.region}</p>
                  </div>
                  <div className=''>
                    <p className='font-medium text-lg'>Province/Prefecture:</p>
                    <p>{Enterprise.province_prefecture}</p>
                  </div>
                  <div className=''>
                    <p className='font-medium text-lg'>Zone Industrielle:</p>
                    <p>{Enterprise.zone_industrielle} </p>
                  </div>
                  <div className=''>
                    <p className='font-medium text-lg'>Adresse Siege:</p>
                    <p>{Enterprise.adresse_siege}</p>
                  </div>
                 {Enterprise.point_contact_nom && ( <div className=''>
                    <p className='font-medium text-lg'>Point Contact Nom:</p>
                    <p>{Enterprise.point_contact_nom}</p>
                  </div>)}
                </div>
                <div className='flex flex-wrap items-center justify-between py-2 border-t-2 border-gray-200'>
                  <div className=''>
                    <p className='font-medium text-lg'>Taille Entreprise:</p>
                    <p>{Enterprise.taille_entreprise}</p>
                  </div>
                  <div className=''>
                    <p className='font-medium text-lg'>Forme Juridique:</p>
                    <p>{Enterprise.forme_juridique} </p>
                  </div>
                  <div className=''>
                    <p className='font-medium text-lg'>Secteur Entreprise:</p>
                    <p>{Enterprise.secteur_entreprise} </p>
                  </div>
                  {Enterprise.telephone && (<div className=''>
                    <p className='font-medium text-lg'>Telephone:</p>
                    <p>{Enterprise.telephone}</p>
                  </div>)}

                  {Enterprise.email && (<div className=''>
                    <p className='font-medium text-lg'>Email:</p>
                    <p>{Enterprise.email}</p>
                  </div>)}
                </div>
                
              </div>)}
              { DispalyError && <p className={`basis-full text-red-500 text-sm`}>{DispalyError} </p>}
          </div>
        </div>
        <div className={`step ${step === 2 ? '' : 'hidden'} w-full`}>
          <p className='text-xl font-semibold mb-2'><span className=''>{step}</span> - Choisi du Produit</p>
          <div className="flex gap-4 max-md:flex-col max-md:w-full">
            <div className='flex flex-col items-start justify-center flex-wrap'>
                <div className="flex flex-col gap-1 grow flex-wrap basis-full w-full max-md:w-full">
                  <label className="font-medium text-sm mb-1 gap-2">Famille du Produit *</label>
                  <Select 
                    classNames={{
                      control: (state) =>
                        `border !rounded-[10px] px-2 w-[343px] !basis-full focus:outline-blue ${state.isFocused ? 'ring-2 ring-blue-500 border-blue-500' : 'order-gray-300'} max-md:w-full`,
                      menu: () => 'border !rounded-[10px]  !mt-1 !p-0 overflow-hidden',
                      option: () => 'hover:bg-bg-blue hover:text-blue px-4 py-0',
                      placeholder: () => 'text-gray-300',
                    }}
                    options={Object.values(famillies).map(fp => ({
                      value: fp.id_familleproduit,
                      label: fp.libelle
                    }))} 
                    onChange={handleFamilleProduct}
                    placeholder="Choisie famille de Produit ..."
                    noOptionsMessage={()=> "Aucune famille produit trouvé"}
                    isSearchable
                    />
                </div>
                { DispalyError && <p className={`basis-full text-red-500 text-sm`}>{DispalyError} </p>}
            </div>
            { ('familleProductId' in control) &&
            (<div className='flex flex-col items-start justify-center flex-wrap'>
                <div className="flex flex-col gap-1 grow flex-wrap basis-1/2 w-full max-md:w-full">
                  <label className="font-medium text-sm mb-1 gap-2"> Produit *</label>
                  <Select 
                    classNames={{
                      control: (state) =>
                        `border !rounded-[10px] px-2 w-[343px] !basis-full focus:outline-blue ${state.isFocused ? 'ring-2 ring-blue-500 border-blue-500' : 'order-gray-300'} max-md:w-full`,
                      menu: () => 'border !rounded-[10px]  !mt-1 !p-0 overflow-hidden',
                      option: () => 'hover:bg-bg-blue hover:text-blue px-4 py-0',
                      placeholder: () => 'text-gray-300',
                    }}
                    // value={selectedProduct}
                    options={famillies[control.familleProductId]?.product.map(product => ({
                      value: product.id_produit,
                      label: product.nom_produit || ''
                    }))} 
                    onChange={handleProduct}
                    placeholder="Choisie produit ..."
                    noOptionsMessage={()=> "Aucune produit trouvé"}
                    isSearchable
                    />
                </div>
                { DispalyError && <p className={`basis-full text-red-500 text-sm`}>{DispalyError} </p>}
            </div>)}
          </div>
        </div>
        <div className={`step ${step === 3 ? '' : 'hidden'} w-full`}>
          <p className='text-xl font-semibold mb-2'><span className=''>{step}</span> - Control Documentaire</p>
          <div className="flex items-center gap-3">
            <div className={`flex items-center cursor-pointer hover:text-blue`}>
              <label htmlFor={`doc-conforme`} className={`${control.controlDoc === true ? 'bg-blue text-white' : ''} relative cursor-pointer px-3 py-1 rounded-[10px] bg-[#E4E4E4]`}>
                <input onChange={() => handleControl('controlDoc', true)} 
                  className={`appearance-none shrink-0 mt-1 absolute top-0 left-0 w-full h-full cursor-pointer`} type="radio" 
                  value="conforme"
                  name={`conforme`}
                  id={`doc-conforme`}
                  checked={control.controlDoc === true}/>
                  <p>Conforme</p>
                </label>
            </div>
            

            <div className={`flex items-center cursor-pointer hover:text-blue`} >
              <label htmlFor={`doc-non-conforme`} className={`${control.controlDoc === false ? 'bg-blue text-white' : ''} relative cursor-pointer px-3 py-1 rounded-[10px] bg-[#E4E4E4]`}>
                <input onChange={() => handleControl('controlDoc', false)} className={`cursor-pointer appearance-none shrink-0 mt-1 absolute top-0 left-0 w-full h-full`} type="radio"
                  value="non-conforme"
                  name={`non-conforme`}
                  id={`doc-non-conforme`}
                  checked={control.controlDoc === false}/>
                  Non Conforme
                </label>
            </div>
          </div>
        </div>
        <div className={`step ${step === 4 ? '' : 'hidden'} w-full`}>
          <p className='text-xl font-semibold mb-2'><span className=''>{step}</span> - Control Physique</p>
          <div className="flex items-center gap-3">
            <div className={`flex items-center cursor-pointer hover:text-blue`}>
              <label htmlFor={`ph-conforme`} className={`${control.controlPh === true ? 'bg-blue text-white' : ''} relative cursor-pointer px-3 py-1 rounded-[10px] bg-[#E4E4E4]`}>
                <input onChange={() => handleControl('controlPh', true)} 
                  className={`appearance-none shrink-0 mt-1 absolute top-0 left-0 w-full h-full cursor-pointer`} type="radio" 
                  value="conforme"
                  name={`conforme`}
                  id={`ph-conforme`}
                  checked={control.controlPh === true}/>
                  <p>Conforme</p>
                </label>
            </div>
            

            <div className={`flex items-center cursor-pointer hover:text-blue`} >
              <label htmlFor={`ph-non-conforme`} className={`${control.controlPh === false ? 'bg-blue text-white' : ''} relative cursor-pointer px-3 py-1 rounded-[10px] bg-[#E4E4E4]`}>
                <input onChange={() => handleControl('controlPh', false)} className={`cursor-pointer appearance-none shrink-0 mt-1 absolute top-0 left-0 w-full h-full`} type="radio"
                  value="non-conforme"
                  name={`ph-conforme`}
                  id={`ph-non-conforme`}
                  checked={control.controlPh === false}/>
                  Non Conforme
                </label>
            </div>
          </div>
        </div>
        <div className={`step ${step === 5 ? '' : 'hidden'} w-full`}>
          <p className='text-xl font-semibold mb-2'><span className=''>{step}</span> - Prelevement</p>
          <div>
              <DQSM301bis data={control} />
          </div>
        </div>
        <div className={`step ${step === 6 ? '' : 'hidden'} w-full max-md:text-sm`}>
          <p className='text-xl font-semibold mb-2'><span className=''>{step}</span> - Validation</p>
          {
            control.controlDoc || control.controlPh 
            ? (<div onChange={()=> handleStatus('Validé')} className='flex flex-col items-start my-4'>
                <div className="mb-4 text-green-500 flex gap-2 justify-center items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2 max-md:!text-base">Contrôle Validé avec Succès</h3>
                </div>
                <p className="text-gray-600 max-w-md">
                  Le produit <b>{control?.productname || ''}</b> de l'entreprise <b>{Enterprise?.raison_sociale || ''} </b> 
                  a passé avec succès l'ensemble des contrôles requis et est conforme aux réglementations en vigueur.
                </p>
              </div>)
            : (<div onChange={()=> handleStatus('Non Validé')} className='flex flex-col items-start my-4'>
              <div className="mb-4 text-green-500 flex gap-2 justify-center items-center">
              <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="stroke-red-400 icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                <h3 className="text-2xl font-bold text-gray-800 mb-2 ax-md:!text-sm">Contrôle N'est pas Validé</h3>
              </div>
              <p className="text-gray-600 max-w-md">
                Le produit de L'entreprise <b>{Enterprise?.raison_sociale || ''} </b> 
                n'est pas passé avec l'ensemble des contrôles requis.
              </p>
              <div className='w-full'>
                <p className='mt-2 text-lg font-semibold'>Observation</p>
                <textarea 
                  value={control.observation}  
                  onChange={(e) => handleControl('observation', e.target.value)} 
                  name="" 
                  id=""
                  className='p-2 row-span-full col-span-10 w-full focus:outline-blue rounded-[10px] border-2 border-gray-300'
                ></textarea>
              </div>
            </div>)
          }
        </div>
      </form>
      <div className={`flex flex-wrap gap-4 items-center ${step === 1 ? 'justify-end' : 'justify-between'} my-4  max-md:justify-between`}>
      {
            step === steps.length && 
            (<button type='submit' onClick={handleNewProduct} className={`px-3 py-2  bg-[#E4E4E4]  font-medium font-poppins text-base rounded-[10px] hover:!bg-bg-blue hover:text-blue  transition-colors hidden max-md:block max-md:basis-full`} >Ajouter un Produit</button>)
          }
        
        <button onClick={prev} className={`${step === 1 ? 'hidden' : ''} px-3 py-2  bg-[#E4E4E4] font-medium font-poppins text-base rounded-[10px] hover:!bg-bg-blue hover:text-blue  transition-colors `} disabled={step === 1 ? true : false}>Avant</button>
        <div className=''>
          {
            step === steps.length && 
            (<button type='submit' onClick={handleNewProduct} className={`px-3 py-2  bg-[#E4E4E4]  font-medium font-poppins text-base rounded-[10px] hover:!bg-bg-blue hover:text-blue  transition-colors max-md:hidden`} >Ajouter un Produit</button>)
          }
          <button type='submit' onClick={next} className={`ml-2 px-3 py-2  bg-[#E4E4E4]  font-medium font-poppins text-base rounded-[10px] hover:!bg-bg-blue hover:text-blue  transition-colors `} >{step === steps.length ? 'Terminer': 'Suivant' } </button>
        </div>
      </div>
    </div>
  )
}

export default NewControl24