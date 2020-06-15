package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Valeurs;
import com.mycompany.myapp.repository.ValeursRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Valeurs}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ValeursResource {

    private final Logger log = LoggerFactory.getLogger(ValeursResource.class);

    private static final String ENTITY_NAME = "valeurs";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ValeursRepository valeursRepository;

    public ValeursResource(ValeursRepository valeursRepository) {
        this.valeursRepository = valeursRepository;
    }

    /**
     * {@code POST  /valeurs} : Create a new valeurs.
     *
     * @param valeurs the valeurs to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new valeurs, or with status {@code 400 (Bad Request)} if the valeurs has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/valeurs")
    public ResponseEntity<Valeurs> createValeurs(@Valid @RequestBody Valeurs valeurs) throws URISyntaxException {
        log.debug("REST request to save Valeurs : {}", valeurs);
        if (valeurs.getId() != null) {
            throw new BadRequestAlertException("A new valeurs cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Valeurs result = valeursRepository.save(valeurs);
        return ResponseEntity.created(new URI("/api/valeurs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /valeurs} : Updates an existing valeurs.
     *
     * @param valeurs the valeurs to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated valeurs,
     * or with status {@code 400 (Bad Request)} if the valeurs is not valid,
     * or with status {@code 500 (Internal Server Error)} if the valeurs couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/valeurs")
    public ResponseEntity<Valeurs> updateValeurs(@Valid @RequestBody Valeurs valeurs) throws URISyntaxException {
        log.debug("REST request to update Valeurs : {}", valeurs);
        if (valeurs.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Valeurs result = valeursRepository.save(valeurs);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, valeurs.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /valeurs} : get all the valeurs.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of valeurs in body.
     */
    @GetMapping("/valeurs")
    public List<Valeurs> getAllValeurs() {
        log.debug("REST request to get all Valeurs");
        return valeursRepository.findAll();
    }

    /**
     * {@code GET  /valeurs/:id} : get the "id" valeurs.
     *
     * @param id the id of the valeurs to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the valeurs, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/valeurs/{id}")
    public ResponseEntity<Valeurs> getValeurs(@PathVariable Long id) {
        log.debug("REST request to get Valeurs : {}", id);
        Optional<Valeurs> valeurs = valeursRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(valeurs);
    }

    /**
     * {@code DELETE  /valeurs/:id} : delete the "id" valeurs.
     *
     * @param id the id of the valeurs to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/valeurs/{id}")
    public ResponseEntity<Void> deleteValeurs(@PathVariable Long id) {
        log.debug("REST request to delete Valeurs : {}", id);
        valeursRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
