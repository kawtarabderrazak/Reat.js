package com.example.rest.controller;

import com.example.rest.entities.Compte;
import com.example.rest.repositories.CompteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")  // Autorise les requêtes depuis le frontend React
@RestController
@RequestMapping("/api/comptes")
public class CompteController {

    @Autowired
    private CompteRepository compteRepository;

    // Ajouter un compte
    @PostMapping
    public ResponseEntity<Compte> createCompte(@RequestBody Compte compte) {
        try {
            Compte savedCompte = compteRepository.save(compte);
            return ResponseEntity.ok(savedCompte);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();  // Retourne un code 500 en cas d'échec
        }
    }

    // Liste des comptes
    @GetMapping
    public List<Compte> getAllComptes() {
        return compteRepository.findAll();
    }

    // Modifier un compte
    @PutMapping("/{id}")
    public ResponseEntity<Compte> updateCompte(@PathVariable Long id, @RequestBody Compte compteDetails) {
        Optional<Compte> compte = compteRepository.findById(id);
        if (compte.isPresent()) {
            Compte existingCompte = compte.get();
            existingCompte.setSolde(compteDetails.getSolde());
            existingCompte.setDateCreation(compteDetails.getDateCreation());
            existingCompte.setType(compteDetails.getType());
            Compte updatedCompte = compteRepository.save(existingCompte);
            return ResponseEntity.ok(updatedCompte);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Supprimer un compte
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCompte(@PathVariable Long id) {
        Optional<Compte> compte = compteRepository.findById(id);
        if (compte.isPresent()) {
            compteRepository.delete(compte.get());
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
