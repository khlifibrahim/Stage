import React from 'react';
import logo from '../../assets/logo.png'

function PrintableMission({ cadre, mission}) {
    
    const currentYear = new Date().getUTCFullYear();
    const currentMonth = String(new Date().getUTCMonth() + 1).padStart(2, '0');
    const currentDay = String(new Date().getUTCDate()).padStart(2, '0');
    function dateFormat(dateValue) {
      if(!dateValue) return 'N/A';
      const date = new Date(dateValue);
      return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    };

    return (
        <div id='print-area' className="!w-[580px]"> {/* Adjust width as needed */}
          
          {/* Header */}
          <div className="flex flex-col justify-center w-full items-center mb-4">
            <div className=''>
              <img src={logo} className='!w-[580px] bg-cover mx-auto' alt="" />
            </div>
            <div className='text-center text-lg'>
              <p className="font-bold ">مندوبية الصناعة والتجارة بوجدة</p>
              <p className="text-base">Délégation de l'industrie et du Comerce d'Oujda</p>
            </div>
          </div>
    
          {/* Title */}
          <div className="text-center mb-20">
            <p className="font-bold text-2xl">ORDRE DE MISSION</p>
          </div>
    
          {/* Content */}
          <div className="mb-4 text-base">
            <p>Il est prescrit à M. {`${cadre.nom ||cadre.cadre_nom} ${cadre.prenom || cadre.cadre_prenom}`}, {`${cadre.grade || cadre.grade_name}`}</p>
            <p>À {`${cadre.delegation}`}.</p>
          </div>
          <div className="mb-4 text-base">
            <p>De se rendre en mission à : {`${mission.destinationName || mission.Destination}`}</p>
            <p>Pour: {`${mission.objectName || mission.Object_type}`}</p>
          </div>
          <div className="mb-4 text-base">
            <p>Date de départ: {`${mission.depDate || dateFormat(mission.departure_date)}`}</p>
            <p>Durée probable de la mission: {`${mission.durationDays || mission.duration_days}`} jour</p>
          </div>
          <div className="mb-4 text-base">
            <p>Heure départ: {` ${mission.depHour || mission.heure_de_depart || ""}`}</p>
            <p>Heure arrivée: {` ${mission.arrHour || mission.heure_arrive || ""}`}</p>
          </div>
          <div className="mb-4 text-base">
            <p>M. {`${cadre.nom ||cadre.cadre_nom} ${cadre.prenom || cadre.cadre_prenom}`} est autorisé à utiliser :</p>
            <ul className="list-disc ml-6">
              <li>la voiture de service n°: {`${mission.plateNumber || mission.s_matricule || ""}`}</li>
              <li>sa voiture personnelle n°: {`${cadre.carPlat || cadre.carPlate || ""}`}</li>
              <li>Sera accompagné de: {`${mission.companion || 'xxxxxxx'}`}</li>
            </ul>
          </div>
    
          {/* Footer */}
          <div className="flex justify-between items-center mt-20">
            <p>M. LE DELEGUE</p>
            <p>Oujda, {`${currentMonth} / ${currentDay} / ${currentYear}`} </p>
          </div>
        </div>
      );
}

export default PrintableMission;