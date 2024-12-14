import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditCompte = () => {
    const { id } = useParams(); // Récupère l'ID depuis l'URL
    const navigate = useNavigate();
    const [compte, setCompte] = useState({
        solde: '',
        dateCreation: '',
        type: '',
    });

    useEffect(() => {
        const fetchCompte = async () => {
            try {
                const response = await axios.get(`http://localhost:8082/api/comptes/${id}`);
                setCompte(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération du compte', error);
            }
        };
        fetchCompte();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCompte({ ...compte, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8082/api/comptes/${id}`, compte);
            alert('Compte modifié avec succès');
            navigate('/'); // Retourne à la liste des comptes
        } catch (error) {
            console.error('Erreur lors de la modification du compte', error);
            alert('Échec de la modification du compte.');
        }
    };

    return (
        <div className="edit-compte">
            <h2>Modifier le Compte</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Solde :</label>
                    <input
                        type="number"
                        name="solde"
                        value={compte.solde}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Date de création :</label>
                    <input
                        type="date"
                        name="dateCreation"
                        value={compte.dateCreation}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Type de Compte :</label>
                    <select
                        name="type"
                        value={compte.type}
                        onChange={handleChange}
                        required
                    >
                        <option value="">-- Sélectionner --</option>
                        <option value="COURANT">Courant</option>
                        <option value="EPARGNE">Épargne</option>
                    </select>
                </div>
                <button type="submit" className="btn-submit">Modifier</button>
            </form>
        </div>
    );
};

export default EditCompte;
