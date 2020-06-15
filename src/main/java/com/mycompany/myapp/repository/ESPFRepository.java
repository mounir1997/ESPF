package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.ESPF;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ESPF entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ESPFRepository extends JpaRepository<ESPF, Long> {
}
