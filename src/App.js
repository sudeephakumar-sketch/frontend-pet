import React, { useState, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import PetForm from './components/PetForm';
import PetList from './components/PetList';
import { Navbar, Container } from 'react-bootstrap';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [editingPet, setEditingPet] = useState(null);

  const handlePetAdded = useCallback(() => {
    setRefreshTrigger(prev => !prev);
    setEditingPet(null);
  }, []);

  const handleEditComplete = useCallback(() => {
    setEditingPet(null);
    setRefreshTrigger(prev => !prev);
  }, []);

  const handleEdit = (pet) => {
    setEditingPet(pet);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="App">
      <Navbar className="navbar-custom" sticky="top">
        <Container>
          <Navbar.Brand className="navbar-brand-text">
            🐾 Pet Adoption System
          </Navbar.Brand>
        </Container>
      </Navbar>

      <PetForm 
        onPetAdded={handlePetAdded}
        editingPet={editingPet}
        onEditComplete={handleEditComplete}
      />
      
      <PetList 
        refreshTrigger={refreshTrigger}
        onEdit={handleEdit}
      />

      <footer className="app-footer">
        <p>&copy; 2025 Pet Adoption Center. All rights reserved. 🐶</p>
      </footer>
    </div>
  );
}

export default App;
