import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Bar, Pie, Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import { fetchStatistics } from '../../Redux/Actions/statistics.actions.jsx';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

function Statisctic() {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);
  const { data, loading, error } = useSelector((state) => state.statistics);
  const [dateRange, setDateRange] = useState({
    dateDebut: '2021-01-01',
    dateFin: new Date().toISOString().split('T')[0]
  });
  const [isFiltering, setIsFiltering] = useState(false);
  const [activeTab, setActiveTab] = useState('missions');
  // Pagination state for projects table
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  console.log("Rôle de l'utilisateur:", role);
  console.log("Données statistiques:", data);
  console.log("État de chargement:", loading);
  console.log("Erreur:", error);

  useEffect(() => {
    dispatch(fetchStatistics(role, dateRange.dateDebut, dateRange.dateFin));
  }, [dispatch, role]);

  const handleFilterByDateRange = () => {
    console.log('Filtering with date range:', dateRange);
    setIsFiltering(true);
    dispatch(fetchStatistics(role, dateRange.dateDebut, dateRange.dateFin))
      .then(() => {
        console.log('Filter completed, new data:', data);
        if (data?.indh) {
          console.log('INDH data after filtering:', data.indh);
          console.log('Contribution period value:', data.indh.contributionIndhPeriode);
        }
      })
      .finally(() => setIsFiltering(false));
  };

  if (loading && !isFiltering) {
    return <div className="p-6 flex justify-center items-center h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-3 text-gray-600">Chargement des statistiques...</p>
      </div>
    </div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Erreur : {error}</div>;
  }

  // Données pour les missions par mois
  const missionsByMonthData = {
    labels: data?.missionsByMonth?.map((item) => `${item.year}-${item.month}`) || [],
    datasets: [
      {
        label: 'Missions par mois',
        data: data?.missionsByMonth?.map((item) => item.missions_count) || [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Données pour les contrôles non conformes
  const nonConformesData = {
    labels: ['Affichage Prix', 'Solde', 'Publicité', 'Tickets Caisses', 'Vente avec Prime'],
    datasets: [
      {
        label: 'Contrôles non conformes',
        data: [
          data?.nonConformes?.affichage_prix_non_conforme || 0,
          data?.nonConformes?.solde_non_conforme || 0,
          data?.nonConformes?.publicité_non_conforme || 0,
          data?.nonConformes?.NBR_tickets_caisses_non_conforme || 0,
          data?.nonConformes?.NBr_vente_avec_prime_non_conforme || 0,
        ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0'],
      },
    ],
  };

  // Données pour les contrôles totaux
  const controlsData = {
    labels: ['Contrôles Totaux'],
    datasets: [
      {
        label: 'Nombre de contrôles',
        data: [data?.controls || 0],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Données pour les contrôles conformes vs non conformes
  const controlsComplianceData = {
    labels: ['Conformes', 'Non Conformes'],
    datasets: [
      {
        label: 'Contrôles',
        data: [
          data?.controls - data?.nonConformes?.total_non_conformes || 0, // Contrôles conformes
          data?.nonConformes?.total_non_conformes || 0, // Contrôles non conformes
        ],
        backgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  // NOUVELLES DONNÉES POUR LES STATISTIQUES INDH

  // KPI 1: Nombre de projets objet d'une convention
  const nombreProjetsIndhData = {
    labels: ['Projets avec convention'],
    datasets: [
      {
        label: 'Nombre de projets',
        data: [data?.indh?.nombreProjetsIndh || 0],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // KPI 2: Montant global de la contribution de l'INDH par année
  const contributionIndhParAnneeData = {
    labels: data?.indh?.contributionIndhParAnnee?.map(item => item.annee) || [],
    datasets: [
      {
        label: 'Contribution INDH (MAD)',
        data: data?.indh?.contributionIndhParAnnee?.map(item => item.montant_total) || [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        fill: false,
      },
    ],
  };

  // KPI 3: Montant global de la contribution de l'INDH par province
  const contributionIndhParProvinceData = {
    labels: data?.indh?.contributionIndhParProvince?.map(item => item.province) || [],
    datasets: [
      {
        label: 'Contribution INDH par province (MAD)',
        data: data?.indh?.contributionIndhParProvince?.map(item => item.montant_total) || [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
          'rgba(199, 199, 199, 0.7)',
          'rgba(83, 102, 255, 0.7)',
          'rgba(40, 159, 64, 0.7)',
          'rgba(210, 199, 199, 0.7)',
        ],
        borderWidth: 0,
      },
    ],
  };

  // KPI 4: Nombre de projets traités par province
  const nombreProjetParProvinceData = {
    labels: data?.indh?.nombreProjetParProvince?.map(item => item.province) || [],
    datasets: [
      {
        label: 'Nombre de projets par province',
        data: data?.indh?.nombreProjetParProvince?.map(item => item.nombre_projets) || [],
        backgroundColor: 'rgba(153, 102, 255, 0.7)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 0,
      },
    ],
  };

  // KPI 5: Montant global de la contribution de l'INDH sur une période donnée
  const contributionIndhPeriodeData = {
    labels: ['Contribution INDH sur la période'],
    datasets: [
      {
        label: `Contribution (${dateRange.dateDebut} à ${dateRange.dateFin})`,
        data: [data?.indh?.contributionIndhPeriode || 0],
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Composants pour les différents onglets
  const MissionsControlsTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-lg">
        <h3 className="text-lg font-medium mb-4 text-gray-700">Missions par mois</h3>
        <Bar data={missionsByMonthData} />
      </div>

      <div className="bg-white p-6 rounded-lg">
        <h3 className="text-lg font-medium mb-4 text-gray-700">Contrôles non conformes</h3>
        <Pie data={nonConformesData} />
      </div>

      <div className="bg-white p-6 rounded-lg">
        <h3 className="text-lg font-medium mb-4 text-gray-700">Contrôles totaux</h3>
        <Bar data={controlsData} />
      </div>

      <div className="bg-white p-6 rounded-lg">
        <h3 className="text-lg font-medium mb-4 text-gray-700">Contrôles conformes vs non conformes</h3>
        <Pie data={controlsComplianceData} />
      </div>
    </div>
  );

  const IndhOverviewTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-lg">
        <h3 className="text-lg font-medium mb-4 text-gray-700">Nombre de projets avec convention</h3>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-6xl font-bold text-blue-600">{data.indh.nombreProjetsIndh || 0}</div>
            <div className="text-gray-500 mt-2 text-lg">Projets</div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg">
        <h3 className="text-lg font-medium mb-4 text-gray-700">Contribution INDH par année</h3>
        <Line data={contributionIndhParAnneeData} options={{
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Montant (MAD)'
              }
            }
          }
        }} />
      </div>

      <div className="bg-white p-6 rounded-lg">
        <h3 className="text-lg font-medium mb-4 text-gray-700">Contribution INDH par province</h3>
        <Doughnut data={contributionIndhParProvinceData} options={{
          plugins: {
            legend: {
              position: 'right',
            }
          }
        }} />
      </div>

      <div className="bg-white p-6 rounded-lg">
        <h3 className="text-lg font-medium mb-4 text-gray-700">Nombre de projets par province</h3>
        <Bar data={nombreProjetParProvinceData} options={{
          indexAxis: 'y',
          scales: {
            x: {
              beginAtZero: true,
            }
          }
        }} />
      </div>
    </div>
  );

  const IndhProjectsTab = () => {
    // Calculate pagination indexes
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.indh.etatAvancementProjets ? 
      data.indh.etatAvancementProjets.slice(indexOfFirstItem, indexOfLastItem) : [];
    
    // Calculate total pages
    const totalPages = data.indh.etatAvancementProjets ? 
      Math.ceil(data.indh.etatAvancementProjets.length / itemsPerPage) : 0;
    
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
    // Go to previous page
    const goToPreviousPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
    
    // Go to next page
    const goToNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };
    
    return (
      <div className="bg-white p-6 rounded-lg">
        <h3 className="text-lg font-medium mb-4 text-gray-700">État d'avancement des projets</h3>
        <div className="overflow-x-auto max-w-full">
          <table className="w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom du projet</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type d'activité</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dernière mise à jour</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">État d'avancement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentItems && currentItems.length > 0 ? (
                currentItems.map((projet) => (
                  <tr key={projet.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 whitespace-nowrap">{projet.id}</td>
                    <td className="py-3 px-4 max-w-xs truncate">{projet.nom}</td>
                    <td className="py-3 px-4 max-w-xs truncate">{projet.type_activite}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{new Date(projet.derniere_mise_a_jour).toLocaleDateString()}</td>
                    <td className="py-3 px-4 max-w-xs truncate">{projet.etat_avancement || 'Non spécifié'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-4 text-center text-gray-500">Aucun projet trouvé</td>
                </tr>
              )}
            </tbody>
          </table>
          
          {/* Pagination controls */}
          {totalPages > 0 && (
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4">
              <div className="flex flex-1 justify-between sm:hidden">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
                    currentPage === 1 ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Précédent
                </button>
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
                    currentPage === totalPages ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Suivant
                </button>
              </div>
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Affichage de <span className="font-medium">{indexOfFirstItem + 1}</span> à{' '}
                    <span className="font-medium">
                      {indexOfLastItem > data.indh.etatAvancementProjets.length
                        ? data.indh.etatAvancementProjets.length
                        : indexOfLastItem}
                    </span>{' '}
                    sur <span className="font-medium">{data.indh.etatAvancementProjets.length}</span> projets
                  </p>
                </div>
                <div>
                  <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <button
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center rounded-l-md px-2 py-2 ${
                        currentPage === 1
                          ? 'text-gray-300'
                          : 'text-gray-400 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                      }`}
                    >
                      <span className="sr-only">Précédent</span>
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    {/* Page numbers */}
                    {[...Array(Math.min(totalPages, 5)).keys()].map((number) => {
                      // Calculate page number to display based on current page
                      let pageNum;
                      if (totalPages <= 5) {
                        // If total pages is 5 or less, show all pages
                        pageNum = number + 1;
                      } else if (currentPage <= 3) {
                        // If current page is near the beginning
                        pageNum = number + 1;
                      } else if (currentPage >= totalPages - 2) {
                        // If current page is near the end
                        pageNum = totalPages - 4 + number;
                      } else {
                        // If current page is in the middle
                        pageNum = currentPage - 2 + number;
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => paginate(pageNum)}
                          className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                            currentPage === pageNum
                              ? 'z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                              : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className={`relative inline-flex items-center rounded-r-md px-2 py-2 ${
                        currentPage === totalPages
                          ? 'text-gray-300'
                          : 'text-gray-400 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                      }`}
                    >
                      <span className="sr-only">Suivant</span>
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
              
              {/* Items per page selector */}
              <div className="mt-2 sm:mt-0 ml-4">
                <label htmlFor="itemsPerPage" className="mr-2 text-sm text-gray-700">
                  Projets par page:
                </label>
                <select
                  id="itemsPerPage"
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1); // Reset to first page when changing items per page
                  }}
                  className="rounded border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const IndhContributionPeriodTab = () => (
    <div className="bg-white p-6 rounded-lg">
      <h3 className="text-lg font-medium mb-4 text-gray-700">Contribution INDH sur une période</h3>
      <div className="mb-6 flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Date de début</label>
          <input
            type="date"
            value={dateRange.dateDebut}
            onChange={(e) => setDateRange({...dateRange, dateDebut: e.target.value})}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Date de fin</label>
          <input
            type="date"
            value={dateRange.dateFin}
            onChange={(e) => setDateRange({...dateRange, dateFin: e.target.value})}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="self-end">
          <button
            onClick={handleFilterByDateRange}
            disabled={isFiltering}
            className={`${isFiltering ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white px-4 py-2 rounded-md flex items-center transition-colors duration-200`}
          >
            {isFiltering ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Chargement...
              </>
            ) : 'Filtrer'}
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center h-40">
        {isFiltering ? (
          <div className="text-center">
            <div className="text-gray-500">Calcul en cours...</div>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-5xl font-bold text-green-600">
              {data.indh.contributionIndhPeriode !== null && data.indh.contributionIndhPeriode !== undefined 
                ? `${Number(data.indh.contributionIndhPeriode).toLocaleString()} MAD` 
                : 'Non disponible'}
            </div>
            <div className="text-gray-500 mt-2">
              Contribution totale du {new Date(dateRange.dateDebut).toLocaleDateString()} au {new Date(dateRange.dateFin).toLocaleDateString()}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Fonction pour rendre le contenu de l'onglet actif
  const renderTabContent = () => {
    if (role === 'DIRECTEUR') {
      switch (activeTab) {
        case 'missions':
          return <MissionsControlsTab />;
        case 'indhOverview':
          return data.indh ? <IndhOverviewTab /> : null;
        case 'indhProjects':
          return data.indh ? <IndhProjectsTab /> : null;
        case 'indhContribution':
          return data.indh ? <IndhContributionPeriodTab /> : null;
        default:
          return <MissionsControlsTab />;
      }
    } else if (role === 'CADRE') {
      switch (activeTab) {
        case 'missions':
          return (
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-4 text-gray-700">Missions du contrôleur</h3>
              <Bar data={missionsByMonthData} />
            </div>
          );
        case 'indhOverview':
          return data.indh ? (
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-4 text-gray-700">Nombre de projets avec convention</h3>
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="text-6xl font-bold text-blue-600">{data.indh.nombreProjetsIndh || 0}</div>
                  <div className="text-gray-500 mt-2 text-lg">Projets</div>
                </div>
              </div>
            </div>
          ) : null;
        case 'indhProjects':
          return data.indh ? <IndhProjectsTab /> : null;
        default:
          return (
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-4 text-gray-700">Missions du contrôleur</h3>
              <Bar data={missionsByMonthData} />
            </div>
          );
      }
    }
    return null;
  };

  return (
    <div className="p-6 bg-gray-50 max-w-full">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Tableau de bord des statistiques</h1>

      {role === 'DIRECTEUR' && data && (
        <>
          <div className="mb-6 border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                className={`py-4 px-6 font-medium text-sm border-b-2 ${activeTab === 'missions' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                onClick={() => setActiveTab('missions')}
              >
                Missions & Contrôles
              </button>
              {data.indh && (
                <>
                  <button
                    className={`py-4 px-6 font-medium text-sm border-b-2 ${activeTab === 'indhOverview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    onClick={() => setActiveTab('indhOverview')}
                  >
                    Aperçu INDH
                  </button>
                  <button
                    className={`py-4 px-6 font-medium text-sm border-b-2 ${activeTab === 'indhProjects' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    onClick={() => setActiveTab('indhProjects')}
                  >
                    Projets INDH
                  </button>
                  <button
                    className={`py-4 px-6 font-medium text-sm border-b-2 ${activeTab === 'indhContribution' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    onClick={() => setActiveTab('indhContribution')}
                  >
                    Contribution par période
                  </button>
                </>
              )}
            </nav>
          </div>

          <div className="mt-8">
            {renderTabContent()}
          </div>
        </>
      )}

      {role === 'CADRE' && data && (
        <>
          <div className="mb-6 border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                className={`py-4 px-6 font-medium text-sm border-b-2 ${activeTab === 'missions' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                onClick={() => setActiveTab('missions')}
              >
                Missions
              </button>
              {data.indh && (
                <>
                  <button
                    className={`py-4 px-6 font-medium text-sm border-b-2 ${activeTab === 'indhOverview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    onClick={() => setActiveTab('indhOverview')}
                  >
                    Aperçu INDH
                  </button>
                  <button
                    className={`py-4 px-6 font-medium text-sm border-b-2 ${activeTab === 'indhProjects' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    onClick={() => setActiveTab('indhProjects')}
                  >
                    Projets INDH
                  </button>
                </>
              )}
            </nav>
          </div>

          <div className="mt-8">
            {renderTabContent()}
          </div>
        </>
      )}
    </div>
  );
}

export default Statisctic;