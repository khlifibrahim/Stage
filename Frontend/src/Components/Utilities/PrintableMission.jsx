import React from 'react';
import logo from '../../assets/logo.png'
import './PrintableMission.style.css'

function Printablemission({mission}) {
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
      <div  className="!w-[580px] max-md:!w-full ">
        
        {/* Header */}
        <div className="header flex flex-col justify-center w-full items-center mb-4">
          <div className=''>
            <img src={logo} className='!w-[580px] bg-cover mx-auto' alt="" />
          </div>
          <div className='big-title text-center text-lg'>
            <p className="delegation-ar font-bold ">مندوبية الصناعة والتجارة بوجدة</p>
            <p className="delegation text-base">Délégation de l'industrie et du Commerce d'Oujda</p>
          </div>
        </div>
  
        {/* Title */}
        <div className="order-mission-title text-center mb-20">
          <p className="order-mission-p font-bold text-2xl">ORDRE DE MISSION</p>
        </div>
  
        {/* Content */}
        <div className="mb-4 text-base">
          <p>Il est prescrit à M. {`${mission.cadre_nom || mission.nom} ${mission.cadre_prenom || mission.prenom}`}, {`${mission.grade_name || mission.grade}`}</p>
          <p>À {`${mission.delegation || 'Délégation de l\'industrie et du Commerce d\'Oujda'}`}.</p>
        </div>
        <div className="mb-4 text-base">
          <p>De se rendre en mission à : {`${mission.Destination || mission.destinationName}`}</p>
          <p>Pour: {`${mission.Object_type || mission.objectName || 'Pas definie'}`}</p>
        </div>
        <div className="mb-4 text-base">
          <p>Date de départ: {`${mission.depDate || dateFormat(mission.departure_date)}`}</p>
          <p>Durée probable de la mission: {`${mission.duration_days || mission.durationDays || 'Pas definie'}`} jour</p>
        </div>
        <div className="mb-4 text-base">
          <p>Heure départ: {` ${mission.depHour || mission.heure_de_depart || ""}`}</p>
          <p>Heure arrivée: {` ${mission.arrHour || mission.heure_arrive || ""}`}</p>
        </div>
        { mission.s_matricule || mission.plateNumber &&  
        (<div className="mb-4 text-base">
          <p>M. {`${mission.nom || mission.cadre_nom} ${mission.prenom || mission.cadre_prenom}`} est autorisé à utiliser :</p>
          <ul className="list-disc ml-6">
            {
              mission.s_matricule  || mission.plateNumber
              ? (<li>la voiture de service n°: {`${mission.s_matricule || mission.plateNumber || ""}`}</li>)
              
              : (<li>sa voiture personnelle n°: {`${mission.carPlate || ""}`}</li>)
            }
            { mission.companion && (<li>Sera accompagné de: {`${mission.companion || 'xxxxxxx'}`}</li>)}
          </ul>
        </div>)}
  
        {/* Footer */}
        <div className="footer flex justify-between items-center mt-20">
          <p className='footer-delege'>M. LE DELEGUE</p>
          <p className='footer-date'>Oujda, {`${currentMonth} / ${currentDay} / ${currentYear}`} </p>
        </div>
      </div>
    );
}

export default Printablemission;