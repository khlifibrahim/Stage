import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchIndh, deleteIndh, searchIndh } from '../../Redux/Actions/indh.actions';
import Loader from '../Common/Loader';
import { Container } from 'reactstrap';
import HeadeContent from '../Utilities/HeadeContent';
import { toast } from 'react-toastify';

const IndhList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { indhs, loading, error } = useSelector((state) => state.indh);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeMenu, setActiveMenu] = useState(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  
  // Load initial data
  useEffect(() => {
    dispatch(fetchIndh());
  }, [dispatch]);

  // Debounce search term to avoid too many API calls
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  // Fetch search results when debounced search term changes
  useEffect(() => {
    if (debouncedSearchTerm.trim() !== '') {
      dispatch(searchIndh(debouncedSearchTerm));
    } else {
      dispatch(fetchIndh());
    }
    setCurrentPage(1);
  }, [debouncedSearchTerm, dispatch]);
  
  // Calculate pagination
  const totalItems = indhs?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentItems = indhs.slice(startIndex, endIndex);
  
  // Generate pagination buttons
  const getPaginationButtons = () => {
    const buttons = [];
    const maxButtons = 3;
    
    if (totalPages <= maxButtons) {
      // Show all pages if total pages are less than or equal to maxButtons
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(i);
      }
    } else {
      // Always include current page
      buttons.push(currentPage);
      
      // Add page before current if it exists
      if (currentPage > 1) {
        buttons.unshift(currentPage - 1);
      }
      
      // Add page after current if it exists
      if (currentPage < totalPages) {
        buttons.push(currentPage + 1);
      }
      
      // If we still have room and there are more pages before, add previous page
      if (buttons.length < maxButtons && buttons[0] > 1) {
        buttons.unshift(buttons[0] - 1);
      }
      
      // If we still have room and there are more pages after, add next page
      if (buttons.length < maxButtons && buttons[buttons.length - 1] < totalPages) {
        buttons.push(buttons[buttons.length - 1] + 1);
      }
    }
    
    return buttons;
  };
  
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const handleView = (id, e) => {
    e.stopPropagation();
    navigate(`/dashboard/indh/view/${id}`);
  };
  
  const handleEdit = (id, e) => {
    e.stopPropagation();
    navigate(`/dashboard/indh/edit/${id}`);
  };

  const handleAdd = () => {
    navigate('/dashboard/indh/add');
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      const result = await dispatch(deleteIndh(id));
      if (result.success) {
        toast.success('Projet supprimé avec succès');
      } else {
        toast.error(result.message || 'Erreur lors de la suppression du projet');
      }
    }
    setActiveMenu(null);
  };

  const toggleMenu = (id, e) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === id ? null : id);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <div className='flex flex-col gap-8 mb-4'>
            <HeadeContent 
              dateObject={indhs || []} 
              currentPage={'INDH'} 
              to={''}
              filter={false}
              onSearch={handleSearch}
              searchTerm={searchTerm}
              role="CADRE"
            />
            
            <div className="form flex items-start justify-center h-full">
              <div className="table">
                <div className="table-head flex items-center justify-evenly w-full border-[#E4E4E4] rounded-[10px] overflow-hidden">
                  <div className="table-base-header p-3 w-full bg-[#F9F9F9]">
                    <p className='font-bold leading-[150%] text-[14px] text-[#727272] bg-transparent border-none'>Nom</p>
                  </div>
                  <div className="table-base-header p-3 w-full bg-[#F9F9F9] max-md:hidden">
                    <p className='font-bold leading-[150%] text-[14px] text-[#727272] bg-transparent border-none'>Type d'activité</p>
                  </div>
                  <div className="table-base-header p-3 w-full bg-[#F9F9F9]">
                    <p className='font-bold leading-[150%] text-[14px] text-[#727272] bg-transparent border-none'>Forme juridique</p>
                  </div>
                  <div className="table-base-header p-3 w-full bg-[#F9F9F9] max-md:hidden">
                    <p className='font-bold leading-[150%] text-[14px] text-[#727272] bg-transparent border-none'>Montant total</p>
                  </div>
                  <div className="table-base-header p-3 w-full bg-[#F9F9F9]">
                    <p className='font-bold leading-[150%] text-[14px] text-[#727272] bg-transparent border-none'>Contribution INDH</p>
                  </div>
                  <div className="table-base-header p-3 w-[80px] bg-[#F9F9F9]">
                    <p className='font-bold leading-[150%] text-[14px] text-[#727272] bg-transparent border-none'>Actions</p>
                  </div>
                </div>

                {loading ? (
                  <div className="text-center py-4">
                    <Loader />
                  </div>
                ) : error ? (
                  <div className="text-center py-4 text-red-500">{error}</div>
                ) : indhs.length > 0 ? (
                  currentItems.map((project) => (
                    <div 
                      key={project.id} 
                      onClick={(e) => handleView(project.id, e)}
                      className="table-rows flex items-center justify-evenly py-3 my-2 border border-[#E4E4E4] rounded-[10px] cursor-pointer transition-colors hover:bg-[#F9F9F9] hover:!border-[#E4E4E4]"
                    >
                      <div className="table-base-row px-3 w-full">
                        <p className="text-[#727272] rounded bg-transparent border-none">{project.nom || 'N/A'}</p>
                      </div>
                      <div className="table-base-row px-3 w-full max-md:hidden">
                        <p className="text-[#727272] rounded bg-transparent border-none">{project.type_activite || 'N/A'}</p>
                      </div>
                      <div className="table-base-row px-3 w-full">
                        <p className="text-[#727272] rounded bg-transparent border-none">{project.forme_juridique || 'N/A'}</p>
                      </div>
                      <div className="table-base-row px-3 w-full max-md:hidden">
                        <p className="text-[#727272] rounded bg-transparent border-none">
                          {project.montant_total 
                            ? `${typeof project.montant_total === 'number' 
                                ? project.montant_total.toLocaleString('fr-FR') 
                                : project.montant_total} DH` 
                            : 'N/A'}
                        </p>
                      </div>
                      <div className="table-base-row px-3 w-full">
                        <p className="text-[#727272] rounded bg-transparent border-none">
                          {project.contribution_indh 
                            ? `${typeof project.contribution_indh === 'number' 
                                ? project.contribution_indh.toLocaleString('fr-FR') 
                                : project.contribution_indh} DH` 
                            : 'N/A'}
                        </p>
                      </div>
                      <div className="table-base-row px-3 w-[80px] relative">
                        <button 
                          onClick={(e) => toggleMenu(project.id, e)} 
                          className="text-[#727272] rounded bg-transparent border-none focus:outline-none"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-dots-vertical">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                            <path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                            <path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                          </svg>
                        </button>
                        {activeMenu === project.id && (
                          <div className="absolute right-0 top-8 bg-white shadow-md rounded-md z-10 py-1 min-w-[120px]">
                            <button 
                              onClick={(e) => handleEdit(project.id, e)}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <i className="bx bx-edit mr-2"></i>Modifier
                            </button>
                            <button 
                              onClick={(e) => handleDelete(project.id, e)}
                              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                              <i className="bx bx-trash mr-2"></i>Supprimer
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='flex flex-col items-center justify-center px-3 w-full text-center font-medium my-10'>
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stroke-[#969696] w-24 h-24 border-none icon icon-tabler icons-tabler-outline icon-tabler-building-off">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M3 21h18" />
                        <path d="M9 12h1" />
                        <path d="M14 12h1" />
                        <path d="M9 16h6" />
                        <path d="M12 3l.007 .007" />
                        <path d="M15 7l.009 .009" />
                        <path d="M9 7l-.009 .009" />
                        <path d="M3 9h1" />
                        <path d="M20 9h1" />
                        <path d="M3 17h2" />
                        <path d="M19 17h2" />
                      </svg>
                    </div>
                    <p className='text-[#969696] mt-4 mb-6'>
                      {searchTerm ? 'Aucun projet trouvé pour cette recherche' : 'Aucun projet disponible'}
                    </p>
                    <button
                      onClick={handleAdd}
                      className="flex items-center gap-2 px-4 py-2 bg-bg-blue text-blue font-medium font-poppins text-base rounded-[10px] hover:bg-blue hover:text-white transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-square-rounded-plus">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z"></path>
                        <path d="M15 12h-6"></path>
                        <path d="M12 9v6"></path>
                      </svg>
                      Créer un nouveau projet
                    </button>
                  </div>
                )}

                {/* Pagination - Only show if there's more than one page */}
                {indhs.length > 0 && totalPages > 1 && (
                  <div className="flex items-center justify-center mt-6 gap-2">
                    {currentPage > 1 && (
                      <button
                        onClick={prevPage}
                        className="w-10 h-10 flex items-center justify-center rounded-md border border-[#E4E4E4] bg-white text-[#727272] hover:bg-gray-100"
                      >
                        <i className="bx bx-chevron-left"></i>
                      </button>
                    )}
                    
                    {getPaginationButtons().map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 flex items-center justify-center rounded-md ${
                          currentPage === page
                            ? 'bg-[#F9F9F9] border border-[#E4E4E4] text-[#727272] font-medium'
                            : 'bg-white border border-[#E4E4E4] text-[#727272] hover:bg-gray-100'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    
                    {currentPage < totalPages && (
                      <button
                        onClick={nextPage}
                        className="w-10 h-10 flex items-center justify-center rounded-md border border-[#E4E4E4] bg-white text-[#727272] hover:bg-gray-100"
                      >
                        <i className="bx bx-chevron-right"></i>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default IndhList;
