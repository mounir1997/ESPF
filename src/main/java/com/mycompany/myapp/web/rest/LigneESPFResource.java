package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.LigneESPF;
import com.mycompany.myapp.repository.LigneESPFRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.LigneESPF}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class LigneESPFResource {

    private final Logger log = LoggerFactory.getLogger(LigneESPFResource.class);

    private static final String ENTITY_NAME = "ligneESPF";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LigneESPFRepository ligneESPFRepository;

    public LigneESPFResource(LigneESPFRepository ligneESPFRepository) {
        this.ligneESPFRepository = ligneESPFRepository;
    }

    /**
     * {@code POST  /ligne-espfs} : Create a new ligneESPF.
     *
     * @param ligneESPF the ligneESPF to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ligneESPF, or with status {@code 400 (Bad Request)} if the ligneESPF has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ligne-espfs")
    public ResponseEntity<LigneESPF> createLigneESPF(@Valid @RequestBody LigneESPF ligneESPF) throws URISyntaxException {
        log.debug("REST request to save LigneESPF : {}", ligneESPF);
        if (ligneESPF.getId() != null) {
            throw new BadRequestAlertException("A new ligneESPF cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LigneESPF result = ligneESPFRepository.save(ligneESPF);
        return ResponseEntity.created(new URI("/api/ligne-espfs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ligne-espfs} : Updates an existing ligneESPF.
     *
     * @param ligneESPF the ligneESPF to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ligneESPF,
     * or with status {@code 400 (Bad Request)} if the ligneESPF is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ligneESPF couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ligne-espfs")
    public ResponseEntity<LigneESPF> updateLigneESPF(@Valid @RequestBody LigneESPF ligneESPF) throws URISyntaxException {
        log.debug("REST request to update LigneESPF : {}", ligneESPF);
        if (ligneESPF.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LigneESPF result = ligneESPFRepository.save(ligneESPF);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ligneESPF.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ligne-espfs} : get all the ligneESPFS.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ligneESPFS in body.
     */
    @GetMapping("/ligne-espfs")
    public List<LigneESPF> getAllLigneESPFS() {
        log.debug("REST request to get all LigneESPFS");
        return ligneESPFRepository.findAll();
    }

    /**
     * {@code GET  /ligne-espfs/:id} : get the "id" ligneESPF.
     *
     * @param id the id of the ligneESPF to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ligneESPF, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ligne-espfs/{id}")
    public ResponseEntity<LigneESPF> getLigneESPF(@PathVariable Long id) {
        log.debug("REST request to get LigneESPF : {}", id);
        Optional<LigneESPF> ligneESPF = ligneESPFRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ligneESPF);
    }

    /**
     * {@code DELETE  /ligne-espfs/:id} : delete the "id" ligneESPF.
     *
     * @param id the id of the ligneESPF to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ligne-espfs/{id}")
    public ResponseEntity<Void> deleteLigneESPF(@PathVariable Long id) {
        log.debug("REST request to delete LigneESPF : {}", id);
        ligneESPFRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
