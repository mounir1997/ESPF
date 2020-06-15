package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.ValeurChamp;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ValeurChamp entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ValeurChampRepository extends JpaRepository<ValeurChamp, Long> {
}
