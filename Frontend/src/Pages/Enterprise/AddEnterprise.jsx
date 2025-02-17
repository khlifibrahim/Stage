import React, { useEffect, useState } from 'react'
import Instance from '../../Api/axios'
import { useNavigate } from 'react-router-dom'
import { connect, useDispatch, useSelector } from 'react-redux'
// import { setEnterpriseDetails } from '../../Redux/Actions/enterprise.actions'

function AddEnterprise( {enterpriseDetails} ) {
  const navigate = useNavigate()
  const displatch = useDispatch()
  const {setEnterpriseDetails, loading, error} = useSelector(state => state.enterprise)
  const [editMode, setEditMode] = useState(false)
  const [Entreprise, setEntreprise] = useState({
    nom: "",
    telephone: "",
    adresse: "",
    RS: "",
    email: "",
    Activite: "",
    atp:"",
    ice: ""
  })
  
  useEffect(()=> {
    if(enterpriseDetails) {
      setEntreprise({
        nom: enterpriseDetails.nom_entreprise || '',
        telephone: enterpriseDetails.telephone || '',
        adresse: enterpriseDetails.adresse || '',
        RS: enterpriseDetails.raison_sociale || '',
        email: enterpriseDetails.email || '',
        Activite: enterpriseDetails.activite || '',
        atp: enterpriseDetails.numero_ATP || '',
        ice: enterpriseDetails.ICE || '',
      })
      setEditMode(true)
    }
  }, [enterpriseDetails])
  // console.log("enterpriseDetails: ",enterpriseDetails)

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
    navigate('/dashboard/entreprise/list')
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!editMode) {
      console.log("Enterprise state: ", Entreprise)
    }else {
      console.log("Edit mode on")
    }
  }

  // console.log("editing mode : " ,editMode)
  // console.log("Loading : " ,loading)

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
        {/* Groupe: Nom et Titre */}
        <div className="lg:flex lg:gap-2">
          <div className=" flex flex-wrap basis-[60%] gap-6 mb-4">
            <div className=" flex flex-col grow basis-auto">
              <label className="font-medium text-sm mb-1">Nom d'Entreprise *</label>
              <input
                type="text"
                name="nom"
                value={Entreprise.nom}
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
                name="RS"
                value={Entreprise.RS}
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
                name="Activite"
                value={Entreprise.Activite}
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
                name="atp"
                value={Entreprise.atp}
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
                name="ice"
                value={Entreprise.ice}
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

const mapStateToProps = (state) => ({
  enterpriseDetails: state.enterprise.enterpriseDetails,
})

export default connect(mapStateToProps)(AddEnterprise)