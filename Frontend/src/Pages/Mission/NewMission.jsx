import React, { useEffect, useState } from "react";
import Instance from "../../Api/axios";


function NewMission() {
  const [values, setValues] = useState({
    titre: "",
    nom: "",
    delegation: "",
    destination: "",
    objet: "",
    dateD: "",
    heureD: "",
    heureA: "",
    duree: "",
    service: "",
    voiture: "",
    personnelV: "",
    accompagne: "",
    
  });
  const [cars, setCars] = useState([]);

  


  useEffect(() => {
  const fetchCars = async () => {
    try {
      const response = await Instance.get('http://localhost:3000/api'); // Adaptez le chemin selon votre API
      setCars(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des voitures:', error);
    }
  };
  fetchCars();
}, []);
  

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Créer Ordre Mission</h1>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 space-y-6"
      >
        {/* Groupe: Nom et Titre */}
        <div className="flex gap-6">
          <div className="flex flex-col flex-1">
            <label className="text-gray-600">Nom*</label>
            <input
              type="text"
              name="nom"
              value={values.nom}
              onChange={handleChange}
              placeholder="Nom..."
              className="border rounded-lg px-4 py-2 focus:outline-blue-500"
              required
            />
          </div>
          <div className="flex flex-col flex-1">
            <label className="text-gray-600">Titre*</label>
            <input
              type="text"
              name="titre"
              value={values.titre}
              onChange={handleChange}
              placeholder="Titre..."
              className="border rounded-lg px-4 py-2 focus:outline-blue-500"
              required
            />
          </div>
        </div>

        {/* Groupe: Délégation et Destination */}
        <div className="flex gap-6">
          <div className="flex flex-col flex-1">
            <label className="text-gray-600">Délégation*</label>
            <input
              type="text"
              name="delegation"
              value={values.delegation}
              onChange={handleChange}
              placeholder="Délégation..."
              className="border rounded-lg px-4 py-2 focus:outline-blue-500"
              required
            />
          </div>
          <div className="flex flex-col flex-1">
            <label className="text-gray-600">Destination*</label>
            <input
              type="text"
              name="destination"
              value={values.destination}
              onChange={handleChange}
              placeholder="Destination..."
              className="border rounded-lg px-4 py-2 focus:outline-blue-500"
              required
            />
          </div>
        </div>

        {/* Objet */}
        <div className="flex flex-col">
          <label className="text-gray-600">Objet</label>
          <textarea
            name="objet"
            value={values.objet}
            onChange={handleChange}
            placeholder="Objet..."
            className="border rounded-lg px-4 py-2 focus:outline-blue-500"
          />
        </div>

        {/* Groupe: Date et Heure */}
        <div className="flex gap-6">
          <div className="flex flex-col flex-1">
            <label className="text-gray-600">Date départ*</label>
            <input
              type="date"
              name="dateD"
              value={values.dateD}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 focus:outline-blue-500"
              required
            />
          </div>
          <div className="flex flex-col flex-1">
            <label className="text-gray-600">Heure départ*</label>
            <input
              type="time"
              name="heureD"
              value={values.heureD}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 focus:outline-blue-500"
              required
            />
          </div>
        </div>

        {/* Groupe: Heure arrivée et Durée */}
        <div className="flex gap-6">
          <div className="flex flex-col flex-1">
            <label className="text-gray-600">Heure d'arrivée*</label>
            <input
              type="time"
              name="heureA"
              value={values.heureA}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 focus:outline-blue-500"
              required
            />
          </div>
          <div className="flex flex-col flex-1">
            <label className="text-gray-600">Durée de la mission*</label>
            <input
              type="number"
              name="duree"
              value={values.duree}
              onChange={handleChange}
              placeholder="Durée (en heures)..."
              className="border rounded-lg px-4 py-2 focus:outline-blue-500"
              required
            />
          </div>
        </div>

        {/* Groupe: Voiture de service et Voiture */}
        <div className="flex items-center gap-6">
          {/* Voiture de service */}
          <div className="flex items-center">
            <label className="text-gray-600 mr-4">Voiture de service</label>
            <label className="flex items-center mr-4">
              <input
                type="radio"
                name="service"
                value="oui"
                checked={values.service === "oui"}
                onChange={handleChange}
                className="mr-2"
              />
              Oui
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="service"
                value="non"
                checked={values.service === "non"}
                onChange={handleChange}
                className="mr-2"
              />
              Non
            </label>
          </div>

          {/* Voiture */}
          <div className="flex flex-col">
            <label className="text-gray-600">Voiture</label>
            <select
              name="voiture"
              value={values.voiture}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 focus:outline-blue-500"
            >
              <option value="">Sélectionnez une option</option>
              {cars.map(car => (
              <option key={car.id} value={car.id}>
                {car.nom} 
                </option>
                ))}
            </select>
          </div>
        </div>

        {/* Voiture de personnel */}
        <div className="flex items-center">
            <label className="text-gray-600 mr-4">Voiture de personnel</label>
            <label className="flex items-center mr-4">
              <input
                type="radio"
                name="personnelV"
                value="oui"
                checked={values.personnelV === "oui"}
                onChange={handleChange}
                className="mr-2"
              />
              Oui
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="personnelV"
                value="non"
                checked={values.personnelV === "non"}
                onChange={handleChange}
                className="mr-2"
              />
              Non
            </label>
          </div>
        

        {/* Sera accompagné de */}
        <div className="flex flex-col">
          <label className="text-gray-600">Sera accompagné de</label>
          <input
            type="text"
            name="accompagne"
            value={values.accompagne}
            onChange={handleChange}
            placeholder="Indiquez les noms..."
            className="border rounded-lg px-4 py-2 focus:outline-blue-500"
          />
        </div>

        {/* Groupe: Boutons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            className="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Imprimer
          </button>

          <button
            type="submit"
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Sauvegarder
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewMission;