import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getIndhById, updateObservation } from '../../Redux/Actions/indh.actions';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Table,
  Button,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import Loader from '../Common/Loader';
import { toast } from 'react-toastify';

const IndhDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { indh, loading, error, historique } = useSelector((state) => state.indh);
  const { user } = useSelector((state) => state.auth);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [currentHistorique, setCurrentHistorique] = useState(null);
  const [observationText, setObservationText] = useState('');

  useEffect(() => {
    dispatch(getIndhById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  const decodeSpecialChars = (text) => {
    if (!text) return '';
    
    // Fix common encoding issues with French characters
    return text
      .replace(/Ã©/g, 'é')
      .replace(/Ã¨/g, 'è')
      .replace(/Ã /g, 'à')
      .replace(/Ã§/g, 'ç')
      .replace(/Ãª/g, 'ê')
      .replace(/Ã®/g, 'î')
      .replace(/Ã´/g, 'ô')
      .replace(/Ã»/g, 'û')
      .replace(/Ã¹/g, 'ù')
      .replace(/Ã¢/g, 'â')
      .replace(/Ã«/g, 'ë')
      .replace(/Ã¯/g, 'ï')
      .replace(/Ã¼/g, 'ü')
      .replace(/Ã¶/g, 'ö')
      .replace(/Ã¤/g, 'ä')
      .replace(/¨/g, '');
  };

  const handleEdit = () => {
    navigate(`/dashboard/indh/edit/${id}`);
  };

  const handleReturn = () => {
    navigate('/dashboard/indh/list');
  };
  
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  
  const openObservationModal = (item) => {
    setCurrentHistorique(item);
    setObservationText(decodeSpecialChars(item.observation) || '');
    toggleModal();
  };
  
  const handleObservationSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!currentHistorique) return;
    
    try {
      const result = await dispatch(updateObservation({
        id: currentHistorique.id,
        observation: observationText,
        mission_id: currentHistorique.mission_id,
        user_id: user.id_utilisateur
      }));
      
      if (result.success) {
        toast.success('Observation mise à jour avec succès');
        setModalOpen(false); 
      } else {
        toast.error(result.message || 'Erreur lors de la mise à jour');
      }
    } catch (error) {
      console.error('Error updating observation:', error);
      toast.error('Une erreur est survenue');
    }
  };
  
  // Check if user is assigned to any mission in the historique
  const canEditObservation = (missionId) => {
    if (!user) return false;
    
    // For simplicity, we'll check if the user has a mission assigned to this project
    // In a real implementation, you would check against mission_cadre and cadre tables
    return true; // For testing purposes, allow all users to edit
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
         
          {loading ? (
            <Loader />
          ) : (
            <Row>
              <Col lg={12}>
                <Card>
                  <CardHeader className="d-flex justify-content-between align-items-center">
                    <h4 className="card-title mb-0">Détails du projet INDH</h4>
                    <div>
                      <Button color="primary" className="me-2" onClick={handleEdit}>
                        <i className="bx bx-edit me-1"></i> Modifier
                      </Button>
                      <Button color="secondary" onClick={handleReturn}>
                        <i className="bx bx-arrow-back me-1"></i> Retour
                      </Button>
                    </div>
                  </CardHeader>
                  <CardBody>
                    {indh && indh.id ? (
                      <div>
                        <Row className="mb-4">
                          <Col md={6}>
                            <h5 className="text-primary">{indh.nom}</h5>
                            <p className="text-muted mb-2">
                              <strong>Type d'activité:</strong> {indh.type_activite}
                            </p>
                            <p className="mb-2">
                              <strong>Forme juridique:</strong>{' '}
                              <Badge color="primary" className="bg-soft">
                                {indh.forme_juridique}
                              </Badge>
                            </p>
                          </Col>
                          <Col md={6} className="text-md-end">
                            <p className="mb-1">
                              <strong>Année:</strong> {indh.annee}
                            </p>
                            <p className="mb-1">
                              <strong>N° Convention:</strong> {indh.numero_convention || 'N/A'}
                            </p>
                            <p className="mb-1">
                              <strong>Date CPDH:</strong> {formatDate(indh.date_cpdh)}
                            </p>
                          </Col>
                        </Row>

                        <div className="table-responsive mt-4">
                          <Table className="table-bordered mb-0">
                            <thead className="table-light">
                              <tr>
                                <th>Détails financiers</th>
                                <th>Montant (DH)</th>
                                <th>Pourcentage</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <strong>Montant total</strong>
                                </td>
                                <td>{indh.montant_total?.toLocaleString('fr-FR')} DH</td>
                                <td>100%</td>
                              </tr>
                              <tr>
                                <td>Contribution INDH</td>
                                <td>{indh.contribution_indh?.toLocaleString('fr-FR')} DH</td>
                                <td>
                                  {indh.montant_total
                                    ? ((indh.contribution_indh / indh.montant_total) * 100).toFixed(2)
                                    : 0}
                                  %
                                </td>
                              </tr>
                              <tr>
                                <td>Contribution porteur</td>
                                <td>{indh.contribution_porteur?.toLocaleString('fr-FR')} DH</td>
                                <td>
                                  {indh.montant_total
                                    ? ((indh.contribution_porteur / indh.montant_total) * 100).toFixed(2)
                                    : 0}
                                  %
                                </td>
                              </tr>
                              {indh.credit && (
                                <tr>
                                  <td>Crédit</td>
                                  <td>{indh.credit?.toLocaleString('fr-FR')} DH</td>
                                  <td>
                                    {indh.montant_total
                                      ? ((indh.credit / indh.montant_total) * 100).toFixed(2)
                                      : 0}
                                    %
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </Table>
                        </div>

                        {indh.notes && (
                          <div className="mt-4">
                            <h5>Notes</h5>
                            <p>{indh.notes}</p>
                          </div>
                        )}

                        {/* Historique des missions INDH */}
                        <div className="mt-5">
                          <h5 className="mb-3">Historique des missions</h5>
                          {historique && historique.length > 0 ? (
                            <div className="table-responsive">
                              <Table className="table-bordered mb-0">
                                <thead className="table-light">
                                  <tr>
                                    <th>Mission ID</th>
                                    <th>Date de départ</th>
                                    <th>Cadre(s)</th>
                                    <th>Observation</th>
                                    <th>Date de création</th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {historique.map((item) => (
                                    <tr key={item.id}>
                                      <td>
                                        <Link to={`/dashboard/orderMissions/listMissionOrders`} state={{ missionId: item.mission_id }} className="text-primary">
                                          #{item.mission_id}
                                        </Link>
                                      </td>
                                      <td>{formatDate(item.departure_date)}</td>
                                      <td>{item.cadre_names || 'Non assigné'}</td>
                                      <td>{decodeSpecialChars(item.observation) || 'Aucune observation'}</td>
                                      <td>{formatDate(item.created_at)}</td>
                                      <td>
                                        {canEditObservation(item.mission_id) && (
                                          <Button 
                                            color="info" 
                                            size="sm" 
                                            onClick={() => openObservationModal(item)}
                                          >
                                            <i className="bx bx-edit-alt me-1"></i> Modifier
                                          </Button>
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </Table>
                            </div>
                          ) : (
                            <div className="text-center p-3 bg-light rounded">
                              <p className="mb-0">Aucune mission associée à ce projet INDH</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <p>Aucune information trouvée pour ce projet</p>
                      </div>
                    )}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}
          
          {/* Modal for editing observations */}
          <Modal isOpen={modalOpen} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>Modifier l'observation</ModalHeader>
            <ModalBody>
              <Form onSubmit={handleObservationSubmit}>
                <FormGroup>
                  <Label for="observation">Observation</Label>
                  <Input
                    type="textarea"
                    name="observation"
                    id="observation"
                    rows="5"
                    value={observationText}
                    onChange={(e) => setObservationText(e.target.value)}
                  />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={handleObservationSubmit}>
                Enregistrer
              </Button>
              <Button color="secondary" onClick={toggleModal}>
                Annuler
              </Button>
            </ModalFooter>
          </Modal>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default IndhDetail;
