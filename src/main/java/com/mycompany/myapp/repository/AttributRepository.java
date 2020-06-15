package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Attribut;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Attribut entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AttributRepository extends JpaRepository<Attribut, Long> {
}
