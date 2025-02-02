import React from 'react';

function PrintableMission({ cadre, mission }) {
  return (
    <div
      id="print-area"
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "30px",
        maxWidth: "700px",
        margin: "auto",
        border: "1px solid #000",
        lineHeight: "1.6"
      }}
    >
      {/* En-tête */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        {/* {logo} */}
        <h4 style={{ margin: "0" }}>
          المندوبية الجهوية للصناعة و التجارة بوجدة
        </h4>
        <h4 style={{ margin: "0" }}>
            Déléguation de l'industrie et du Commerce Oujda
        </h4>
      </div>

      {/* Titre */}
      <h2 style={{ textAlign: "center", marginBottom: "20px", textDecoration: "underline" }}>
        ORDRE DE MISSION
      </h2>

      {/* Corps du texte */}
      <p>
        Il est prescrit à M. <strong>{cadre.nom} {cadre.prenom}</strong>, 
        <strong> {cadre.grade}</strong>, à la Délégation du Commerce et de l’Industrie à Oujda.
      </p>

      <p>
        De se rendre en mission à : <strong>{mission.destination}</strong>.
      </p>

      <p>
        Pour : <strong>{mission.purpose}</strong>.
      </p>

      <p>
        Date de départ : <strong>{mission.depDate}</strong><br />
        Durée probable de la mission : <strong>{mission.duration}</strong><br />
        Heure de départ : <strong>{mission.depHour || "_"}</strong><br />
        Heure d’arrivée : <strong>{mission.arrHour || "_"}</strong>.
      </p>

      <p>
        M. <strong>{cadre.nom} {cadre.prenom}</strong> est autorisé à utiliser :
      </p>
      <ul>
        <li>La voiture de service n° : <strong>{mission.plateNumber || "_"}</strong>.</li>
        <li>Sa voiture personnelle : <strong>{cadre.carPlat || "_"}</strong>.</li>
        <li>Sera accompagné de : <strong>{mission.companion || "_"}</strong>.</li>
      </ul>

      {/* Signature */}
      <div style={{ marginTop: "40px", textAlign: "right" }}>
        <p>
          Oujda, le <strong>{new Date().toLocaleDateString()}</strong>.
        </p>
        <p>
          <strong>M. Le Délégué</strong>
        </p>
        <p></p>
      </div>
    </div>
  );
}

export default PrintableMission;