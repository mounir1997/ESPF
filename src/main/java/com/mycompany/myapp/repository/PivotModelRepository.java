package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.PivotModel;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the PivotModel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PivotModelRepository extends JpaRepository<PivotModel, Long> {
}
