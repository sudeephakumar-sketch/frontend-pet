import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import './PetCard.css';

const PetCard = ({ pet, onAdopt, onDelete, onEdit }) => {
  return (
    <Card className="pet-card">
      <div className="pet-header">
        <h5 className="pet-name">{pet.name}</h5>
        <div className="pet-badge">
          {pet.adopted ? (
            <Badge bg="success" className="adoption-badge">✓ Adopted</Badge>
          ) : (
            <Badge bg="warning" className="adoption-badge">Available</Badge>
          )}
        </div>
      </div>

      <Card.Body className="pet-body">
        <div className="pet-info-grid">
          <div className="info-item">
            <span className="info-label">Breed</span>
            <span className="info-value">{pet.breed}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Age</span>
            <span className="info-value">{pet.age}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Color</span>
            <span className="info-value">{pet.color}</span>
          </div>
        </div>

        {pet.notes && (
          <div className="pet-notes">
            <strong>Notes:</strong> {pet.notes}
          </div>
        )}

        <div className="pet-actions">
          {!pet.adopted && (
            <Button 
              variant="success" 
              size="sm" 
              onClick={() => onAdopt(pet.id)}
              className="action-btn adopt-btn"
            >
              🐾 Adopt
            </Button>
          )}
          <Button 
            variant="primary" 
            size="sm" 
            onClick={() => onEdit(pet)}
            className="action-btn edit-btn"
          >
            ✏️ Edit
          </Button>
          <Button 
            variant="danger" 
            size="sm" 
            onClick={() => onDelete(pet.id)}
            className="action-btn delete-btn"
          >
            🗑️ Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PetCard;
