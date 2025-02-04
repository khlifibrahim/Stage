import React, { useState } from 'react';
import logo from '../../assets/logo.png'

function PrintableMission({ cadre, mission}) {
    
    const currentYear = new Date().getUTCFullYear();
    const currentMonth = String(new Date().getUTCMonth() + 1).padStart(2, '0');
    const currentDay = String(new Date().getUTCDate()).padStart(2, '0');
    // console.log(`${currentYear} - ${currentMonth} - ${currentDay}`)

    return (
        <div id='print-area' className="w-[580px] m-12 bg-gray-100 p-8 rounded-lg shadow-md overflow-y-auto no-scrollbar"> {/* Adjust width as needed */}
          
          {/* Header */}
          <div className="flex flex-col justify-center w-full items-center mb-4">
            <div className=''>
              <img src={logo} className=' mx-auto' alt="" />
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
            <p>Il est prescrit à M. {`${cadre.nom} ${cadre.prenom}`}, {`${cadre.grade}`}</p>
            <p>À {`${cadre.delegation}`}.</p>
          </div>
          <div className="mb-4 text-base">
            <p>De se rendre en mission à : {`${mission.destinationName}`}</p>
            <p>Pour: {`${mission.objectName}`}</p>
          </div>
          <div className="mb-4 text-base">
            <p>Date de départ: {`${mission.depDate}`}</p>
            <p>Durée probable de la mission: {`${mission.durationDays}`} jour</p>
          </div>
          <div className="mb-4 text-base">
            <p>Heure départ: {` ${mission.depHour || ""}`}</p>
            <p>Heure arrivée: {` ${mission.arrHour || ""}`}</p>
          </div>
          <div className="mb-4 text-base">
            <p>M. {`${cadre.nom} ${cadre.prenom}`} est autorisé à utiliser :</p>
            <ul className="list-disc ml-6">
              <li>la voiture de service n°: {`${mission.plateNumber || ""}`}</li>
              <li>sa voiture personnelle n°: {`${cadre.carPlat || ""}`}</li>
              <li>Sera accompagné de: xxxxXXXX</li>
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