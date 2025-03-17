import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addIndh, getIndhById, updateIndh } from '../../Redux/Actions/indh.actions';
import { toast } from 'react-toastify';
import { Container, Card, CardHeader, CardBody, Col, Row, Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import Loader from '../Common/Loader';

const IndhForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const { indh, loading, error } = useSelector((state) => state.indh);

  const [formData, setFormData] = useState({
    annee: new Date().getFullYear().toString(),
    numero_convention: '',
    nom: '',
    type_activite: '',
    date_cpdh: '',
    forme_juridique: '',
    montant_total: '',
    contribution_indh: '',
    contribution_porteur: '',
    credit: '',
    notes: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode) {
      dispatch(getIndhById(id));
    }
  }, [dispatch, id, isEditMode]);

  useEffect(() => {
    if (isEditMode && indh && Object.keys(indh).length > 0) {
      setFormData({
        annee: indh.annee || '',
        numero_convention: indh.numero_convention || '',
        nom: indh.nom || '',
        type_activite: indh.type_activite || '',
        date_cpdh: indh.date_cpdh ? new Date(indh.date_cpdh).toISOString().split('T')[0] : '',
        forme_juridique: indh.forme_juridique || '',
        montant_total: indh.montant_total || '',
        contribution_indh: indh.contribution_indh || '',
        contribution_porteur: indh.contribution_porteur || '',
        credit: indh.credit || '',
        notes: indh.notes || '',
      });
    }
  }, [indh, isEditMode]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear validation error when field is changed
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.annee) newErrors.annee = 'L\'année est requise';
    if (!formData.nom) newErrors.nom = 'Le nom est requis';
    if (!formData.type_activite) newErrors.type_activite = 'Le type d\'activité est requis';
    if (!formData.date_cpdh) newErrors.date_cpdh = 'La date CPDH est requise';
    if (!formData.forme_juridique) newErrors.forme_juridique = 'La forme juridique est requise';
    
    if (!formData.montant_total) {
      newErrors.montant_total = 'Le montant total est requis';
    } else if (isNaN(formData.montant_total)) {
      newErrors.montant_total = 'Le montant doit être un nombre';
    }
    
    if (!formData.contribution_indh) {
      newErrors.contribution_indh = 'La contribution INDH est requise';
    } else if (isNaN(formData.contribution_indh)) {
      newErrors.contribution_indh = 'La contribution doit être un nombre';
    }
    
    if (!formData.contribution_porteur) {
      newErrors.contribution_porteur = 'La contribution du porteur est requise';
    } else if (isNaN(formData.contribution_porteur)) {
      newErrors.contribution_porteur = 'La contribution doit être un nombre';
    }
    
    if (formData.credit && isNaN(formData.credit)) {
      newErrors.credit = 'Le crédit doit être un nombre';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Veuillez corriger les erreurs dans le formulaire');
      return;
    }

    // Convert numeric strings to numbers for the backend
    const numericFormData = {
      ...formData,
      montant_total: parseFloat(formData.montant_total),
      contribution_indh: parseFloat(formData.contribution_indh),
      contribution_porteur: parseFloat(formData.contribution_porteur),
      credit: formData.credit ? parseFloat(formData.credit) : null,
    };

    let success;
    if (isEditMode) {
      success = await dispatch(updateIndh(id, numericFormData));
    } else {
      success = await dispatch(addIndh(numericFormData));
    }

    if (success) {
      toast.success(
        isEditMode
          ? 'Projet INDH mis à jour avec succès'
          : 'Projet INDH ajouté avec succès'
      );
      navigate('/dashboard/indh/list');
    }
  };

  const formeJuridiqueOptions = [
    { value: '', label: 'Sélectionner une forme juridique' },
    { value: 'SARL', label: 'SARL' },
    { value: 'SARL AU', label: 'SARL AU' },
    { value: 'AE', label: 'Auto-entrepreneur (AE)' },
    { value: 'coopérative', label: 'Coopérative' },
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {loading ? (
            <Loader />
          ) : (
            <div className="p-6">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">
                  {isEditMode ? "Modifier le projet INDH" : "Créer un nouveau projet INDH"}
                </h1>
              </div>

              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg my-4"
              >
                <div className="lg:flex flex-col lg:gap-2">
                  <div className="flex flex-wrap basis-[60%] gap-6 mb-4">
                    <div className="flex flex-col grow basis-auto">
                      <label className="font-medium text-sm mb-1">Année *</label>
                      <input
                        type="text"
                        name="annee"
                        id="annee"
                        value={formData.annee}
                        onChange={handleChange}
                        placeholder="Année"
                        className={`border rounded-lg px-4 py-2 focus:outline-blue ${errors.annee ? 'border-red-500' : ''}`}
                        required
                      />
                      {errors.annee && <p className="text-red-500 text-xs mt-1">{errors.annee}</p>}
                    </div>
                    <div className="flex flex-col grow basis-auto">
                      <label className="font-medium text-sm mb-1">Numéro de convention</label>
                      <input
                        type="text"
                        name="numero_convention"
                        id="numero_convention"
                        value={formData.numero_convention}
                        onChange={handleChange}
                        placeholder="Numéro de convention"
                        className="border rounded-lg px-4 py-2 focus:outline-blue"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap basis-[60%] gap-6 mb-4">
                    <div className="flex flex-col grow basis-auto">
                      <label className="font-medium text-sm mb-1">Nom *</label>
                      <input
                        type="text"
                        name="nom"
                        id="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        placeholder="Nom du projet"
                        className={`border rounded-lg px-4 py-2 focus:outline-blue ${errors.nom ? 'border-red-500' : ''}`}
                        required
                      />
                      {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom}</p>}
                    </div>
                    <div className="flex flex-col grow basis-auto">
                      <label className="font-medium text-sm mb-1">Type d'activité *</label>
                      <input
                        type="text"
                        name="type_activite"
                        id="type_activite"
                        value={formData.type_activite}
                        onChange={handleChange}
                        placeholder="Type d'activité"
                        className={`border rounded-lg px-4 py-2 focus:outline-blue ${errors.type_activite ? 'border-red-500' : ''}`}
                        required
                      />
                      {errors.type_activite && <p className="text-red-500 text-xs mt-1">{errors.type_activite}</p>}
                    </div>
                  </div>

                  <div className="flex flex-wrap basis-[60%] gap-6 mb-4">
                    <div className="flex flex-col grow basis-auto">
                      <label className="font-medium text-sm mb-1">Date CPDH *</label>
                      <input
                        type="date"
                        name="date_cpdh"
                        id="date_cpdh"
                        value={formData.date_cpdh}
                        onChange={handleChange}
                        className={`border rounded-lg px-4 py-2 focus:outline-blue ${errors.date_cpdh ? 'border-red-500' : ''}`}
                        required
                      />
                      {errors.date_cpdh && <p className="text-red-500 text-xs mt-1">{errors.date_cpdh}</p>}
                    </div>
                    <div className="flex flex-col grow basis-auto">
                      <label className="font-medium text-sm mb-1">Forme juridique *</label>
                      <div className="relative">
                        <select
                          name="forme_juridique"
                          id="forme_juridique"
                          value={formData.forme_juridique}
                          onChange={handleChange}
                          className={`appearance-none w-full border rounded-lg px-4 py-2 pr-8 focus:outline-blue ${errors.forme_juridique ? 'border-red-500' : ''}`}
                          required
                        >
                          {formeJuridiqueOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                      {errors.forme_juridique && <p className="text-red-500 text-xs mt-1">{errors.forme_juridique}</p>}
                    </div>
                  </div>

                  <div className="flex flex-wrap basis-[60%] gap-6 mb-4">
                    <div className="flex flex-col grow basis-auto">
                      <label className="font-medium text-sm mb-1">Montant total (DH) *</label>
                      <input
                        type="number"
                        step="0.01"
                        name="montant_total"
                        id="montant_total"
                        value={formData.montant_total}
                        onChange={handleChange}
                        placeholder="Montant total"
                        className={`border rounded-lg px-4 py-2 focus:outline-blue ${errors.montant_total ? 'border-red-500' : ''}`}
                        required
                      />
                      {errors.montant_total && <p className="text-red-500 text-xs mt-1">{errors.montant_total}</p>}
                    </div>
                    <div className="flex flex-col grow basis-auto">
                      <label className="font-medium text-sm mb-1">Contribution INDH (DH) *</label>
                      <input
                        type="number"
                        step="0.01"
                        name="contribution_indh"
                        id="contribution_indh"
                        value={formData.contribution_indh}
                        onChange={handleChange}
                        placeholder="Contribution INDH"
                        className={`border rounded-lg px-4 py-2 focus:outline-blue ${errors.contribution_indh ? 'border-red-500' : ''}`}
                        required
                      />
                      {errors.contribution_indh && <p className="text-red-500 text-xs mt-1">{errors.contribution_indh}</p>}
                    </div>
                    <div className="flex flex-col grow basis-auto">
                      <label className="font-medium text-sm mb-1">Contribution porteur (DH) *</label>
                      <input
                        type="number"
                        step="0.01"
                        name="contribution_porteur"
                        id="contribution_porteur"
                        value={formData.contribution_porteur}
                        onChange={handleChange}
                        placeholder="Contribution porteur"
                        className={`border rounded-lg px-4 py-2 focus:outline-blue ${errors.contribution_porteur ? 'border-red-500' : ''}`}
                        required
                      />
                      {errors.contribution_porteur && <p className="text-red-500 text-xs mt-1">{errors.contribution_porteur}</p>}
                    </div>
                  </div>

                  <div className="flex flex-wrap basis-[60%] gap-6 mb-4">
                    <div className="flex flex-col grow basis-auto">
                      <label className="font-medium text-sm mb-1">Crédit (DH)</label>
                      <input
                        type="number"
                        step="0.01"
                        name="credit"
                        id="credit"
                        value={formData.credit}
                        onChange={handleChange}
                        placeholder="Crédit (optionnel)"
                        className={`border rounded-lg px-4 py-2 focus:outline-blue ${errors.credit ? 'border-red-500' : ''}`}
                      />
                      {errors.credit && <p className="text-red-500 text-xs mt-1">{errors.credit}</p>}
                    </div>
                    <div className="flex flex-col grow basis-auto">
                      <label className="font-medium text-sm mb-1">Notes</label>
                      <textarea
                        name="notes"
                        id="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Notes (optionnel)"
                        className="border rounded-lg px-4 py-2 focus:outline-blue"
                        rows="4"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end mt-6 gap-3">
                    <button
                      type="button"
                      onClick={() => navigate('/dashboard/indh/list')}
                      className="px-4 py-2 bg-white text-gray-600 border border-gray-300 rounded-[10px] hover:bg-gray-100 transition-colors"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-4 py-2 bg-blue text-white font-medium rounded-[10px] hover:bg-blue-700 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-device-floppy">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2"></path>
                        <path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                        <path d="M14 4l0 4l-6 0l0 -4"></path>
                      </svg>
                      {isEditMode ? 'Mettre à jour' : 'Enregistrer'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default IndhForm;
