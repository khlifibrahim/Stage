import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import Instance from "../../Api/axios";
// import selectBox from '../../Components/Utilities/'


function NewMission() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("")
  const [cadreList, setCadreList] = useState([]);
  const [selectedCadre, setSelectedCadre] = useState(null);
  const [serviceCars, setServiceCars] = useState([]);
  
  const [accompaniedSearch, setAccompaniedSearch] = useState("");
  const [accompaniedList, setAccompaniedList] = useState([]); // Liste des cadres accompagnateurs
  const [selectedAccompanied, setSelectedAccompanied] = useState(null);

  const [objectOptions, setObjectOptions] = useState([]);




  const [cadre, setCadre] = useState(
    {
      id: "",
      nom: "",
      prenom: "",
      delegation: "",
      carPlat: ""
    });


  const [mission, setMission] = useState({
    cadreId: cadre.id || "",
    title: "",
    destination: "",
    purpose: "",
    depDate: "",
    depHour: "",
    arrHour: "",
    durationDays: "",
    plateNumber: "" || null,
    companion: "",
    status: "" || "en attend",
  });

  const [selectCar, setSelectCar] = useState('personal')

  console.log('Cadre List(36):', cadreList);
  console.log('Car List(37):', serviceCars);
  console.log('Search(38):', search);

  console.log('useState - cadres(40)', cadre)
  console.log('useState - selected cadres(41)', selectedCadre)
  console.log('useState - cars(42)', serviceCars)

  //useEffect OBJET//
  useEffect(() => {
    const fetchObjectOptions = async () => {
      try {
        const response = await Instance.get('/missions/getObjectOptions'); 
        setObjectOptions(response.data || []);
      } catch (error) {
        console.error( error);
      }
    };
  
    fetchObjectOptions();
  }, []);
  
//useEffect ACCOMPAGNE//
  useEffect(() => {
    const fetchAccompaniedCadres = async () => {
      if (accompaniedSearch.trim() === "") {
        setAccompaniedList([]);
        return;
      }
  
      try {
        const response = await Instance.post('/missions/searchCadre', { name: accompaniedSearch });
        setAccompaniedList(response.data.cadres || []);
      } catch (error) {
        console.error(error);
        setAccompaniedList([]);
      }
    };
  
    const timer = setTimeout(fetchAccompaniedCadres, 300);
    return () => clearTimeout(timer);
  }, [accompaniedSearch]);

  const handleAccompaniedChange = (selected) => {
    setSelectedAccompanied(selected);
    setAccompaniedSearch(`${selected.nom} ${selected.prenom}`);
  };

  //useEffect DESTINATION//

  useEffect(() => {
    const fetchDestinationList = async () => {
      try {
        const response = await Instance.get('/missions/getDestinations'); 
        setDestinationList(response.data || []);
      } catch (error) {
        console.error( error);
      }
    };
  
    fetchDestinationList();
  }, []);
  


  useEffect(() => {
    const fetchServiceCars = async () => {
      try {
        const response = await Instance.get('/missions/getServiceCars')
        setServiceCars(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchServiceCars()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      if (search.trim() === "") {
        setCadreList([])
        return
      }

      try {
        const response = await Instance.post('/missions/searchCadre', { name: search });
        if (response.data) {
          setCadreList(response.data.cadres || [])
          console.log('response from API: ', response.data)
        } else {
          console.error('no data r fetched from API!!')
        }
      } catch (error) {
        console.error('Error fetching data(cadres, cars): ', error)
        setCadreList([])
      }

    }
    // fetchData();
    const timer = setTimeout(fetchData, 300)
    return () => clearTimeout(timer)

  }, [search]);


  // handling inputs values
  const handleCadreChange = (selected) => {
    setSelectedCadre(selected);
    setSearch(`${selected.nome} ${selected.prenom}`);

    setCadre({
      id: selected.cadre_id,
      nom: selected.nom,
      prenom: selected.prenom,
      delegation: selected.delegation,
      carPlat: selected.p_matricule
    })
    setMission(prev => ({
      ...prev,
      cadreId: selected.cadre_id
    }))
  };

  const handleMissionChange = (e) => {
    const { name, value } = e.target
    setMission((prev) => ({ ...prev, [name]: value }))
  };

  // when submite the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('UseState of cadre: ', cadre);
    console.log('useState of mission: ', mission);

    try {
      const result = await Instance.post('/missions/createOrderMission', mission)
      console.log(result)
      if (result.status === 201) {
        navigate('/directeur/listMission')
      }
    } catch (error) {
      console.log('error submite the mission', error)
    }

  };

  return (
    <div className="p-6">
      {/* Header */}
      
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Créer Ordre Mission</h1>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg my-4"
          >
            {/* Groupe: Nom et Titre */}
            <div className="flex gap-6 mb-4">
              <div className=" flex flex-col flex-1">
                <label className="font-medium text-sm mb-1">Nom*</label>
                <div className="relative flex flex-col flex-1 ">
                  <input
                    type="text"
                    name="nom"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Nom..."
                    className="border rounded-lg px-4 py-2 focus:outline-blue"
                    required
                  />
                  <div className={`absolute top-11 left-0 w-full cadre-list ${cadreList.length > 0 ? 'border' : ''} rounded-lg  bg-white`}>
                    {cadreList.length > 0 &&
                      cadreList.map((cadre, i) => (
                        <div
                          key={i}
                          onClick={() => handleCadreChange(cadre)}
                          className="px-4 py-2 cursor-pointer hover:bg-bg-blue hover:text-blue">
                          {cadre.prenom} {cadre.nom}
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
              <div className="flex flex-col flex-1 ">
                <label className="">Titre*</label>
                <input
                  type="text"
                  name="title"
                  value={mission.title}
                  onChange={handleMissionChange}
                  placeholder="Titre..."
                  className="border rounded-lg px-4 py-2 focus:outline-blue"
                  required
                />
              </div>
            </div>

            {/* Groupe: Délégation et Destination */}
            <div className="flex gap-6 mb-4">
              <div className="flex flex-col flex-1">
                <label className="font-medium text-sm mb-1">Délégation*</label>
                <input
                  type="text"
                  name="delegation"
                  value={cadre.delegation}
                  onChange={handleCadreChange}
                  placeholder="Délégation..."
                  className="border rounded-lg px-4 py-2 focus:outline-blue"
                  required
                />
              </div>

              {/*  Destination */}
              <div className="flex flex-col flex-1">
                <label className="font-medium text-sm mb-1">Destination*</label>
                <select
                  name="destination"
                  value={mission.destination}
                  onChange={handleMissionChange}
                  className="border rounded-lg px-4 py-2 focus:outline-blue"
                  required
                >
                  <option value="" disabled>Sélectionnez une destination</option>
                  {destinationList.map((destination, i) => (
                    <option key={i} value={destination.name }> 
                      {destination.name || "Aucune destination"} 
                    </option>
                  ))}
                </select>
              </div>

            </div>

            
            {/* Objet */}
              <div className="flex flex-col mb-4">
                <label className="font-medium text-sm mb-1">Objet</label>
                <select
                  name="purpose"
                  value={mission.purpose}
                  onChange={handleMissionChange}
                  className="border rounded-lg px-4 py-2 focus:outline-blue"
                  required
                >
                  <option value="" disabled>Sélectionnez un objet...</option>
                  {objectOptions.map((object, index) => (
                    <option key={index} value={object.value || ""}>
                      {object.label || "Aucun objet"}  
                    </option>
                  ))}
                </select>
              </div>


            {/* Groupe: Date et Heure */}
            <div className="flex gap-6 mb-4">
              <div className="flex flex-col flex-1">
                <label className="font-medium text-sm mb-1">Date départ*</label>
                <input
                  type="date"
                  name="depDate"
                  value={mission.depDate}
                  onChange={handleMissionChange}
                  className="border rounded-lg px-4 py-2 focus:outline-blue"
                  required
                />
              </div>
              <div className="flex flex-col flex-1">
                <label className="font-medium text-sm mb-1">Heure départ*</label>
                <input
                  type="time"
                  name="depHour"
                  value={mission.depHour}
                  onChange={handleMissionChange}
                  className="border rounded-lg px-4 py-2 focus:outline-blue"
                  required
                />
              </div>
            </div>

            {/* Groupe: Heure arrivée et Durée */}
            <div className="flex gap-6 mb-4">
              <div className="flex flex-col flex-1">
                <label className="font-medium text-sm mb-1">Heure d'arrivée*</label>
                <input
                  type="time"
                  name="arrHour"
                  value={mission.arrHour}
                  onChange={handleMissionChange}
                  className="border rounded-lg px-4 py-2 focus:outline-blue"
                  required
                />
              </div>
              <div className="flex flex-col flex-1">
                <label className="font-medium text-sm mb-1">Durée de la mission*</label>
                <input
                  type="text"
                  name="durationDays"
                  value={mission.durationDays}
                  onChange={handleMissionChange}
                  placeholder="Durée (en heures)..."
                  className="border rounded-lg px-4 py-2 focus:outline-blue"
                  required
                />
              </div>
            </div>


            <div className="flex flex-col gap-6 mb-4">

              <div className="flex gap-4 items-center">
                <p className="font-medium text-sm mb-1 mr-4">Voiture: </p>
                <div className="flex items-center gap-3">
                  <div>
                    <label className="flex gap-2" htmlFor="personal">
                      <input
                        type="radio"
                        value="personal"
                        checked={selectCar === "personal"}
                        onChange={(e) => setSelectCar(e.target.value)}
                        name="personal" id="personal" />
                      Personel
                    </label>
                  </div>
                  <div>
                    <label className="flex gap-2" htmlFor="service">
                      <input
                        type="radio"
                        value="service"
                        checked={selectCar === "service"}
                        onChange={(e) => setSelectCar(e.target.value)}
                        name="service" id="service" />
                      Service
                    </label>
                  </div>
                </div>
              </div>

              <div className="">
                {
                  selectCar === 'personal' && (
                    <div className="flex flex-col flex-1">
                      <input
                        type="text"
                        name="carPlat"
                        value={cadre.carPlat}
                        onChange={handleCadreChange}
                        placeholder="Matricule de la voiture"
                        className="border rounded-lg px-4 py-2 focus:outline-blue"
                        required
                      />
                    </div>
                  )}

                {
                  selectCar === 'service' && (
                    <div className="flex flex-col">
                      <select
                        defaultValue={'default'}
                        name="plateNumber"
                        value={mission.plateNumber}
                        onChange={handleMissionChange}
                        className="border rounded-lg px-4 py-2 focus:outline-blue"
                      >
                        <option defaultValue={'default'} selected={true} >Sélectionnez une voiture</option>
                        {serviceCars.map((car, i) => (
                          <option key={i} value={car.s_matricule || ""}>
                            {car.model || "Aucun"} - ({car.s_matricule})
                          </option>
                        ))}
                      </select>
                    </div>
                  )
                }
              </div>
            </div>


            {/* Sera accompagné de */}
            <div className="flex flex-col">
              <label className="font-medium text-sm mb-1">Sera accompagné de</label>
              <div className="relative flex flex-col">
                <input
                  type="text"
                  value={accompaniedSearch}
                  onChange={(e) => setAccompaniedSearch(e.target.value)}
                  placeholder="Nom d'accompagnateur..."
                  className="border rounded-lg px-4 py-2 focus:outline-blue"
                />
                <div className={`absolute top-11 left-0 w-full bg-white border rounded-lg ${accompaniedList.length > 0 ? 'border' : ''}`}>
                  {accompaniedList.map((cadre, i) => (
                    <div
                      key={i}
                      onClick={() => handleAccompaniedChange(cadre)}
                      className="px-4 py-2 cursor-pointer hover:bg-bg-blue hover:text-blue"
                    >
                      {cadre.prenom} {cadre.nom}
                    </div>
                  ))}
                </div>
              </div>
            </div>


            
            {/* Groupe: Boutons */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                className="px-3 py-2 bg-[#E4E4E4] border-[#E4E4E4] font-medium font-poppins text-base rounded-[10px] hover:!bg-bg-blue hover:text-blue  transition-colors "
              >
                Imprimer
              </button>

              <button
                type="submit"
                className="px-3 py-2 bg-bg-blue text-blue font-medium font-poppins text-base rounded-[10px] hover:bg-blue hover:text-white transition-colors"
              >
                Sauvegarder
              </button>
            </div>
          </form>
        </div>
    
      );
}

export default NewMission;