package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.PivotSociete;
import com.mycompany.myapp.repository.PivotSocieteRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.PivotSociete}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PivotSocieteResource {

    private final Logger log = LoggerFactory.getLogger(PivotSocieteResource.class);

    private static final String ENTITY_NAME = "pivotSociete";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PivotSocieteRepository pivotSocieteRepository;

    public PivotSocieteResource(PivotSocieteRepository pivotSocieteRepository) {
        this.pivotSocieteRepository = pivotSocieteRepository;
    }

    /**
     * {@code POST  /pivot-societes} : Create a new pivotSociete.
     *
     * @param pivotSociete the pivotSociete to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new pivotSociete, or with status {@code 400 (Bad Request)} if the pivotSociete has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/pivot-societes")
    public ResponseEntity<PivotSociete> createPivotSociete(@Valid @RequestBody PivotSociete pivotSociete) throws URISyntaxException {
        log.debug("REST request to save PivotSociete : {}", pivotSociete);
        if (pivotSociete.getId() != null) {
            throw new BadRequestAlertException("A new pivotSociete cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PivotSociete result = pivotSocieteRepository.save(pivotSociete);
        return ResponseEntity.created(new URI("/api/pivot-societes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /pivot-societes} : Updates an existing pivotSociete.
     *
     * @param pivotSociete the pivotSociete to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pivotSociete,
     * or with status {@code 400 (Bad Request)} if the pivotSociete is not valid,
     * or with status {@code 500 (Internal Server Error)} if the pivotSociete couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/pivot-societes")
    public ResponseEntity<PivotSociete> updatePivotSociete(@Valid @RequestBody PivotSociete pivotSociete) throws URISyntaxException {
        log.debug("REST request to update PivotSociete : {}", pivotSociete);
        if (pivotSociete.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PivotSociete result = pivotSocieteRepository.save(pivotSociete);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, pivotSociete.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /pivot-societes} : get all the pivotSocietes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of pivotSocietes in body.
     */
    @GetMapping("/pivot-societes")
    public List<PivotSociete> getAllPivotSocietes() {
        log.debug("REST request to get all PivotSocietes");
        return pivotSocieteRepository.findAll();
    }

    /**
     * {@code GET  /pivot-societes/:id} : get the "id" pivotSociete.
     *
     * @param id the id of the pivotSociete to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the pivotSociete, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/pivot-societes/{id}")
    public ResponseEntity<PivotSociete> getPivotSociete(@PathVariable Long id) {
        log.debug("REST request to get PivotSociete : {}", id);
        Optional<PivotSociete> pivotSociete = pivotSocieteRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(pivotSociete);
    }

    /**
     * {@code DELETE  /pivot-societes/:id} : delete the "id" pivotSociete.
     *
     * @param id the id of the pivotSociete to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/pivot-societes/{id}")
    public ResponseEntity<Void> deletePivotSociete(@PathVariable Long id) {
        log.debug("REST request to delete PivotSociete : {}", id);
        pivotSocieteRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
