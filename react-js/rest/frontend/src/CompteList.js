import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CompteList = () => {
    const [comptes, setComptes] = useState([]);
    const navigate = useNavigate(); // Pour naviguer vers la page de modification

    useEffect(() => {
        const fetchComptes = async () => {
            try {
                const response = await axios.get('http://localhost:8082/api/comptes');
                setComptes(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des comptes", error);
            }
        };
        fetchComptes();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8082/api/comptes/${id}`);
            setComptes(comptes.filter(compte => compte.id !== id));
            alert('Compte supprimé avec succès');
        } catch (error) {
            console.error("Erreur lors de la suppression du compte", error);
            alert("Erreur lors de la suppression du compte");
        }
    };

    const handleEdit = (id) => {
        // Redirige vers la page de modification avec l'ID du compte
        navigate(`/modifier/${id}`);
    };

    return (
        <div className="compte-list">
            <h2>Liste des Comptes</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Solde</th>
                    <th>Date de création</th>
                    <th>Type</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {comptes.map(compte => (
                    <tr key={compte.id}>
                        <td>{compte.id}</td>
                        <td>{compte.solde}</td>
                        <td>{compte.dateCreation}</td>
                        <td>{compte.type}</td>
                        <td>
                            <button className="btn-edit" onClick={() => handleEdit(compte.id)}>Modifier</button>
                            <button className="btn-delete" onClick={() => handleDelete(compte.id)}>Supprimer</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CompteList;
