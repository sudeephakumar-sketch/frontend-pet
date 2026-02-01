import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import petApi from '../api/petApi';
import './PetForm.css';

const PetForm = ({ onPetAdded, editingPet, onEditComplete }) => {
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    age: '',
    color: '',
    notes: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingPet) {
      setFormData(editingPet);
    }
  }, [editingPet]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (editingPet) {
        console.log('Updating pet:', editingPet.id, formData);
        await petApi.updatePet(editingPet.id, formData);
        setSuccess('Pet updated successfully! ✓');
      } else {
        console.log('Adding pet:', formData);
        await petApi.addPet(formData);
        setSuccess('Pet added successfully! ✓');
      }

      setFormData({
        name: '',
        breed: '',
        age: '',
        color: '',
        notes: ''
      });

      if (onPetAdded) onPetAdded();
      if (onEditComplete) onEditComplete();
    } catch (err) {
      console.error('Full form error:', err);
      setError(`Failed to save pet: ${err.response?.data?.message || err.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pet-form-container">
      <Container>
        <div className="form-card">
          <h2 className="form-title">{editingPet ? '✏️ Edit Pet' : '➕ Add New Pet'}</h2>
          
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-col">
                <Form.Group className="mb-3">
                  <Form.Label>Pet Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Buddy"
                    required
                  />
                </Form.Group>
              </div>
              <div className="form-col">
                <Form.Group className="mb-3">
                  <Form.Label>Breed *</Form.Label>
                  <Form.Control
                    type="text"
                    name="breed"
                    value={formData.breed}
                    onChange={handleChange}
                    placeholder="e.g., Labrador"
                    required
                  />
                </Form.Group>
              </div>
            </div>

            <div className="form-row">
              <div className="form-col">
                <Form.Group className="mb-3">
                  <Form.Label>Age *</Form.Label>
                  <Form.Control
                    type="text"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="e.g., 2 years"
                    required
                  />
                </Form.Group>
              </div>
              <div className="form-col">
                <Form.Group className="mb-3">
                  <Form.Label>Color *</Form.Label>
                  <Form.Control
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    placeholder="e.g., Brown"
                    required
                  />
                </Form.Group>
              </div>
            </div>

            <Form.Group className="mb-4">
              <Form.Label>Notes (Optional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Add any additional notes about the pet..."
              />
            </Form.Group>

            <div className="form-buttons">
              <Button 
                variant="primary" 
                type="submit" 
                disabled={loading}
                className="submit-btn"
              >
                {loading ? 'Saving...' : editingPet ? 'Update Pet' : 'Add Pet'}
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default PetForm;
