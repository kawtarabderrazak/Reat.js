import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddCompte from './AddCompte';
import CompteList from './CompteList';
import EditCompte from './EditCompte';

const App = () => {
    return (
        <Router>
            <div>
                <nav style={{ marginBottom: '20px' }}>
                    <button>
                        <Link to="/" style={{ textDecoration: 'none' }}>Liste des Comptes</Link>
                    </button>
                    <button>
                        <Link to="/ajouter" style={{ textDecoration: 'none' }}>Ajouter un Compte</Link>
                    </button>
                </nav>
                <Routes>
                    <Route path="/" element={<CompteList />} />
                    <Route path="/ajouter" element={<AddCompte />} />
                    <Route path="/modifier/:id" element={<EditCompte />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
