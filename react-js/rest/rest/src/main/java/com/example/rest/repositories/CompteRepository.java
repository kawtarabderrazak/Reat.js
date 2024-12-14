package com.example.rest.repositories;

import com.example.rest.entities.Compte;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "comptes", path = "comptes")
public interface CompteRepository extends JpaRepository<Compte, Long> {
}
