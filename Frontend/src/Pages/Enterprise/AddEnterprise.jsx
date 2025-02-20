import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addEnterprise, updateEntreprise } from '../../Redux/Actions/enterprise.actions'

function AddEnterprise() {
  const theLocation = useLocation();
  const theNavigate = useNavigate()
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [Entreprise, setEntreprise] = useState({
    nom_entreprise: "",
    telephone: "",
    adresse: "",
    raison_sociale: "",
    email: "",
    activite: "",
    numero_ATP:"",
    ICE: ""
  })
  
  useEffect(() => {
    if (theLocation.state?.data) {
      setEditMode(true);
      setEntreprise(theLocation.state.data)
      console.log("the location: ",theLocation.state.data)
    }
  }, [theLocation.data])

  const handleEntrepriseChange = (e) => {
    const {name, value} = e.target
    setEntreprise(prev => ({
      ...prev,
      [name]: value
    }))
  }
  const handleIgnore = (e) => {
    e.preventDefault()

    setEntreprise({})
    setEditMode(false);
    theNavigate('/dashboard/entreprise/list')
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if(editMode) {
      const success = await dispatch(updateEntreprise(Entreprise.ICE, Entreprise))
      if(success) theNavigate('/dashboard/entreprise/list')
      
    } else {
      const success = await dispatch(addEnterprise(Entreprise));
      if(success) theNavigate('/dashboard/entreprise/list')
    }
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{editMode ? "Modifier l'Entreprise" : "Créer Nouveau Entreprise"}</h1>
      </div>


      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg my-4"
      >
        
        <div className="lg:flex lg:gap-2">
          <div className=" flex flex-wrap basis-[60%] gap-6 mb-4">
            <div className=" flex flex-col grow basis-auto">
              <label className="font-medium text-sm mb-1">Nom d'Entreprise *</label>
              <input
                type="text"
                name="nom_entreprise"
                value={Entreprise.nom_entreprise}
                onChange={handleEntrepriseChange}
                placeholder="Nom..."
                className="border rounded-lg px-4 py-2 focus:outline-blue"
                required
              />
            </div>
            <div className=" flex flex-col grow basis-auto">
              <label className="font-medium text-sm mb-1">Telephone *</label>
              <input
                type="text"
                name="telephone"
                value={Entreprise.telephone}
                onChange={handleEntrepriseChange}
                placeholder="Telephone..."
                className="border rounded-lg px-4 py-2 focus:outline-blue"
                required
              />
            </div>
            <div className=" flex flex-col grow basis-auto">
              <label className="font-medium text-sm mb-1">Adresse*</label>
              <input
                type="text"
                name="adresse"
                value={Entreprise.adresse}
                onChange={handleEntrepriseChange}
                placeholder="Adresse..."
                className="border rounded-lg px-4 py-2 focus:outline-blue"
                required
              />
            </div>
            <div className=" flex flex-col grow basis-auto">
              <label className="font-medium text-sm mb-1">Raison Social*</label>
              <input
                type="text"
                name="raison_sociale"
                value={Entreprise.raison_sociale}
                onChange={handleEntrepriseChange}
                placeholder="RS..."
                className="border rounded-lg px-4 py-2 focus:outline-blue"
                required
              />
            </div>
            
            <div className=" flex flex-col grow basis-auto">
              <label className="font-medium text-sm mb-1">Email *</label>
              <input
                type="text"
                name="email"
                value={Entreprise.email}
                onChange={handleEntrepriseChange}
                placeholder="Email..."
                className="border rounded-lg px-4 py-2 focus:outline-blue"
                required
              />
            </div>
            <div className=" flex flex-col grow basis-auto">
              <label className="font-medium text-sm mb-1">Activité*</label>
              <input
                type="text"
                name="activite"
                value={Entreprise.activite}
                onChange={handleEntrepriseChange}
                placeholder="Activité..."
                className="border rounded-lg px-4 py-2 focus:outline-blue"
                required
              />
            </div>
            <div className=" flex flex-col grow basis-auto">
              <label className="font-medium text-sm mb-1">Num ATP *</label>
              <input
                type="text"
                name="numero_ATP"
                value={Entreprise.numero_ATP}
                onChange={handleEntrepriseChange}
                placeholder="ATP..."
                className="border rounded-lg px-4 py-2 focus:outline-blue"
                required
              />
            </div>
            <div className=" flex flex-col grow basis-auto">
              <label className="font-medium text-sm mb-1">ICE *</label>
              <input
                type="text"
                name="ICE"
                value={Entreprise.ICE}
                onChange={handleEntrepriseChange}
                placeholder="ICE..."
                className="border rounded-lg px-4 py-2 focus:outline-blue"
                required
              />
            </div>
            
          </div>

          <div className="flex items-center justify-center basis-[40%] shrink-1 grow w-full h-vh bg-bg-blue rounded-[10px]">
            map is here
          </div>
        </div>



        {/* Groupe: Boutons */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handleIgnore}
            className="px-3 py-2  font-medium font-poppins text-base rounded-[10px] hover:!bg-[rgba(255,156,156,0.44)] hover:text-[#DC2626] transition-colors "
          >
            Annuler
          </button>
          <div className="flex justify-end gap-4">


            <button
              type="submit"
              className="px-3 py-2 bg-bg-blue text-blue font-medium font-poppins text-base rounded-[10px] hover:bg-blue hover:text-white transition-colors"
            >
              {editMode ? "Mettre à jour" : "Enregistrer"}
            </button>
          </div>
        </div>
      </form>


    </div>

  );
}


export default AddEnterprise;