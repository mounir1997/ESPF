package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Champs;
import com.mycompany.myapp.repository.ChampsRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Champs}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ChampsResource {

    private final Logger log = LoggerFactory.getLogger(ChampsResource.class);

    private static final String ENTITY_NAME = "champs";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ChampsRepository champsRepository;

    public ChampsResource(ChampsRepository champsRepository) {
        this.champsRepository = champsRepository;
    }

    /**
     * {@code POST  /champs} : Create a new champs.
     *
     * @param champs the champs to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new champs, or with status {@code 400 (Bad Request)} if the champs has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/champs")
    public ResponseEntity<Champs> createChamps(@Valid @RequestBody Champs champs) throws URISyntaxException {
        log.debug("REST request to save Champs : {}", champs);
        if (champs.getId() != null) {
            throw new BadRequestAlertException("A new champs cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Champs result = champsRepository.save(champs);
        return ResponseEntity.created(new URI("/api/champs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /champs} : Updates an existing champs.
     *
     * @param champs the champs to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated champs,
     * or with status {@code 400 (Bad Request)} if the champs is not valid,
     * or with status {@code 500 (Internal Server Error)} if the champs couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/champs")
    public ResponseEntity<Champs> updateChamps(@Valid @RequestBody Champs champs) throws URISyntaxException {
        log.debug("REST request to update Champs : {}", champs);
        if (champs.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Champs result = champsRepository.save(champs);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, champs.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /champs} : get all the champs.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of champs in body.
     */
    @GetMapping("/champs")
    public List<Champs> getAllChamps() {
        log.debug("REST request to get all Champs");
        return champsRepository.findAll();
    }

    /**
     * {@code GET  /champs/:id} : get the "id" champs.
     *
     * @param id the id of the champs to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the champs, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/champs/{id}")
    public ResponseEntity<Champs> getChamps(@PathVariable Long id) {
        log.debug("REST request to get Champs : {}", id);
        Optional<Champs> champs = champsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(champs);
    }

    /**
     * {@code DELETE  /champs/:id} : delete the "id" champs.
     *
     * @param id the id of the champs to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/champs/{id}")
    public ResponseEntity<Void> deleteChamps(@PathVariable Long id) {
        log.debug("REST request to delete Champs : {}", id);
        champsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
