package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.ESPF;
import com.mycompany.myapp.repository.ESPFRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.ESPF}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ESPFResource {

    private final Logger log = LoggerFactory.getLogger(ESPFResource.class);

    private static final String ENTITY_NAME = "eSPF";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ESPFRepository eSPFRepository;

    public ESPFResource(ESPFRepository eSPFRepository) {
        this.eSPFRepository = eSPFRepository;
    }

    /**
     * {@code POST  /espfs} : Create a new eSPF.
     *
     * @param eSPF the eSPF to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new eSPF, or with status {@code 400 (Bad Request)} if the eSPF has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/espfs")
    public ResponseEntity<ESPF> createESPF(@Valid @RequestBody ESPF eSPF) throws URISyntaxException {
        log.debug("REST request to save ESPF : {}", eSPF);
        if (eSPF.getId() != null) {
            throw new BadRequestAlertException("A new eSPF cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ESPF result = eSPFRepository.save(eSPF);
        return ResponseEntity.created(new URI("/api/espfs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /espfs} : Updates an existing eSPF.
     *
     * @param eSPF the eSPF to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated eSPF,
     * or with status {@code 400 (Bad Request)} if the eSPF is not valid,
     * or with status {@code 500 (Internal Server Error)} if the eSPF couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/espfs")
    public ResponseEntity<ESPF> updateESPF(@Valid @RequestBody ESPF eSPF) throws URISyntaxException {
        log.debug("REST request to update ESPF : {}", eSPF);
        if (eSPF.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ESPF result = eSPFRepository.save(eSPF);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, eSPF.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /espfs} : get all the eSPFS.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of eSPFS in body.
     */
    @GetMapping("/espfs")
    public List<ESPF> getAllESPFS() {
        log.debug("REST request to get all ESPFS");
        return eSPFRepository.findAll();
    }

    /**
     * {@code GET  /espfs/:id} : get the "id" eSPF.
     *
     * @param id the id of the eSPF to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the eSPF, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/espfs/{id}")
    public ResponseEntity<ESPF> getESPF(@PathVariable Long id) {
        log.debug("REST request to get ESPF : {}", id);
        Optional<ESPF> eSPF = eSPFRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(eSPF);
    }

    /**
     * {@code DELETE  /espfs/:id} : delete the "id" eSPF.
     *
     * @param id the id of the eSPF to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/espfs/{id}")
    public ResponseEntity<Void> deleteESPF(@PathVariable Long id) {
        log.debug("REST request to delete ESPF : {}", id);
        eSPFRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
