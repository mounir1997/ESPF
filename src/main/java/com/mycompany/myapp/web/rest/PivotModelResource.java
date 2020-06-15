package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.PivotModel;
import com.mycompany.myapp.repository.PivotModelRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.PivotModel}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PivotModelResource {

    private final Logger log = LoggerFactory.getLogger(PivotModelResource.class);

    private static final String ENTITY_NAME = "pivotModel";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PivotModelRepository pivotModelRepository;

    public PivotModelResource(PivotModelRepository pivotModelRepository) {
        this.pivotModelRepository = pivotModelRepository;
    }

    /**
     * {@code POST  /pivot-models} : Create a new pivotModel.
     *
     * @param pivotModel the pivotModel to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new pivotModel, or with status {@code 400 (Bad Request)} if the pivotModel has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/pivot-models")
    public ResponseEntity<PivotModel> createPivotModel(@Valid @RequestBody PivotModel pivotModel) throws URISyntaxException {
        log.debug("REST request to save PivotModel : {}", pivotModel);
        if (pivotModel.getId() != null) {
            throw new BadRequestAlertException("A new pivotModel cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PivotModel result = pivotModelRepository.save(pivotModel);
        return ResponseEntity.created(new URI("/api/pivot-models/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /pivot-models} : Updates an existing pivotModel.
     *
     * @param pivotModel the pivotModel to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pivotModel,
     * or with status {@code 400 (Bad Request)} if the pivotModel is not valid,
     * or with status {@code 500 (Internal Server Error)} if the pivotModel couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/pivot-models")
    public ResponseEntity<PivotModel> updatePivotModel(@Valid @RequestBody PivotModel pivotModel) throws URISyntaxException {
        log.debug("REST request to update PivotModel : {}", pivotModel);
        if (pivotModel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PivotModel result = pivotModelRepository.save(pivotModel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, pivotModel.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /pivot-models} : get all the pivotModels.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of pivotModels in body.
     */
    @GetMapping("/pivot-models")
    public List<PivotModel> getAllPivotModels() {
        log.debug("REST request to get all PivotModels");
        return pivotModelRepository.findAll();
    }

    /**
     * {@code GET  /pivot-models/:id} : get the "id" pivotModel.
     *
     * @param id the id of the pivotModel to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the pivotModel, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/pivot-models/{id}")
    public ResponseEntity<PivotModel> getPivotModel(@PathVariable Long id) {
        log.debug("REST request to get PivotModel : {}", id);
        Optional<PivotModel> pivotModel = pivotModelRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(pivotModel);
    }

    /**
     * {@code DELETE  /pivot-models/:id} : delete the "id" pivotModel.
     *
     * @param id the id of the pivotModel to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/pivot-models/{id}")
    public ResponseEntity<Void> deletePivotModel(@PathVariable Long id) {
        log.debug("REST request to delete PivotModel : {}", id);
        pivotModelRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
