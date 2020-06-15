package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.ValeurChamp;
import com.mycompany.myapp.repository.ValeurChampRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.ValeurChamp}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ValeurChampResource {

    private final Logger log = LoggerFactory.getLogger(ValeurChampResource.class);

    private static final String ENTITY_NAME = "valeurChamp";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ValeurChampRepository valeurChampRepository;

    public ValeurChampResource(ValeurChampRepository valeurChampRepository) {
        this.valeurChampRepository = valeurChampRepository;
    }

    /**
     * {@code POST  /valeur-champs} : Create a new valeurChamp.
     *
     * @param valeurChamp the valeurChamp to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new valeurChamp, or with status {@code 400 (Bad Request)} if the valeurChamp has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/valeur-champs")
    public ResponseEntity<ValeurChamp> createValeurChamp(@Valid @RequestBody ValeurChamp valeurChamp) throws URISyntaxException {
        log.debug("REST request to save ValeurChamp : {}", valeurChamp);
        if (valeurChamp.getId() != null) {
            throw new BadRequestAlertException("A new valeurChamp cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ValeurChamp result = valeurChampRepository.save(valeurChamp);
        return ResponseEntity.created(new URI("/api/valeur-champs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /valeur-champs} : Updates an existing valeurChamp.
     *
     * @param valeurChamp the valeurChamp to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated valeurChamp,
     * or with status {@code 400 (Bad Request)} if the valeurChamp is not valid,
     * or with status {@code 500 (Internal Server Error)} if the valeurChamp couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/valeur-champs")
    public ResponseEntity<ValeurChamp> updateValeurChamp(@Valid @RequestBody ValeurChamp valeurChamp) throws URISyntaxException {
        log.debug("REST request to update ValeurChamp : {}", valeurChamp);
        if (valeurChamp.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ValeurChamp result = valeurChampRepository.save(valeurChamp);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, valeurChamp.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /valeur-champs} : get all the valeurChamps.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of valeurChamps in body.
     */
    @GetMapping("/valeur-champs")
    public List<ValeurChamp> getAllValeurChamps() {
        log.debug("REST request to get all ValeurChamps");
        return valeurChampRepository.findAll();
    }

    /**
     * {@code GET  /valeur-champs/:id} : get the "id" valeurChamp.
     *
     * @param id the id of the valeurChamp to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the valeurChamp, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/valeur-champs/{id}")
    public ResponseEntity<ValeurChamp> getValeurChamp(@PathVariable Long id) {
        log.debug("REST request to get ValeurChamp : {}", id);
        Optional<ValeurChamp> valeurChamp = valeurChampRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(valeurChamp);
    }

    /**
     * {@code DELETE  /valeur-champs/:id} : delete the "id" valeurChamp.
     *
     * @param id the id of the valeurChamp to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/valeur-champs/{id}")
    public ResponseEntity<Void> deleteValeurChamp(@PathVariable Long id) {
        log.debug("REST request to delete ValeurChamp : {}", id);
        valeurChampRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
