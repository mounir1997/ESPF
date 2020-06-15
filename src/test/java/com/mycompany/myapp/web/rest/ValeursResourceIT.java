package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.EspfSampleApplicationApp;
import com.mycompany.myapp.domain.Valeurs;
import com.mycompany.myapp.repository.ValeursRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ValeursResource} REST controller.
 */
@SpringBootTest(classes = EspfSampleApplicationApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class ValeursResourceIT {

    private static final String DEFAULT_VALEUR = "AAAAAAAAAA";
    private static final String UPDATED_VALEUR = "BBBBBBBBBB";

    @Autowired
    private ValeursRepository valeursRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restValeursMockMvc;

    private Valeurs valeurs;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Valeurs createEntity(EntityManager em) {
        Valeurs valeurs = new Valeurs()
            .valeur(DEFAULT_VALEUR);
        return valeurs;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Valeurs createUpdatedEntity(EntityManager em) {
        Valeurs valeurs = new Valeurs()
            .valeur(UPDATED_VALEUR);
        return valeurs;
    }

    @BeforeEach
    public void initTest() {
        valeurs = createEntity(em);
    }

    @Test
    @Transactional
    public void createValeurs() throws Exception {
        int databaseSizeBeforeCreate = valeursRepository.findAll().size();

        // Create the Valeurs
        restValeursMockMvc.perform(post("/api/valeurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(valeurs)))
            .andExpect(status().isCreated());

        // Validate the Valeurs in the database
        List<Valeurs> valeursList = valeursRepository.findAll();
        assertThat(valeursList).hasSize(databaseSizeBeforeCreate + 1);
        Valeurs testValeurs = valeursList.get(valeursList.size() - 1);
        assertThat(testValeurs.getValeur()).isEqualTo(DEFAULT_VALEUR);
    }

    @Test
    @Transactional
    public void createValeursWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = valeursRepository.findAll().size();

        // Create the Valeurs with an existing ID
        valeurs.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restValeursMockMvc.perform(post("/api/valeurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(valeurs)))
            .andExpect(status().isBadRequest());

        // Validate the Valeurs in the database
        List<Valeurs> valeursList = valeursRepository.findAll();
        assertThat(valeursList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkValeurIsRequired() throws Exception {
        int databaseSizeBeforeTest = valeursRepository.findAll().size();
        // set the field null
        valeurs.setValeur(null);

        // Create the Valeurs, which fails.

        restValeursMockMvc.perform(post("/api/valeurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(valeurs)))
            .andExpect(status().isBadRequest());

        List<Valeurs> valeursList = valeursRepository.findAll();
        assertThat(valeursList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllValeurs() throws Exception {
        // Initialize the database
        valeursRepository.saveAndFlush(valeurs);

        // Get all the valeursList
        restValeursMockMvc.perform(get("/api/valeurs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(valeurs.getId().intValue())))
            .andExpect(jsonPath("$.[*].valeur").value(hasItem(DEFAULT_VALEUR)));
    }
    
    @Test
    @Transactional
    public void getValeurs() throws Exception {
        // Initialize the database
        valeursRepository.saveAndFlush(valeurs);

        // Get the valeurs
        restValeursMockMvc.perform(get("/api/valeurs/{id}", valeurs.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(valeurs.getId().intValue()))
            .andExpect(jsonPath("$.valeur").value(DEFAULT_VALEUR));
    }

    @Test
    @Transactional
    public void getNonExistingValeurs() throws Exception {
        // Get the valeurs
        restValeursMockMvc.perform(get("/api/valeurs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateValeurs() throws Exception {
        // Initialize the database
        valeursRepository.saveAndFlush(valeurs);

        int databaseSizeBeforeUpdate = valeursRepository.findAll().size();

        // Update the valeurs
        Valeurs updatedValeurs = valeursRepository.findById(valeurs.getId()).get();
        // Disconnect from session so that the updates on updatedValeurs are not directly saved in db
        em.detach(updatedValeurs);
        updatedValeurs
            .valeur(UPDATED_VALEUR);

        restValeursMockMvc.perform(put("/api/valeurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedValeurs)))
            .andExpect(status().isOk());

        // Validate the Valeurs in the database
        List<Valeurs> valeursList = valeursRepository.findAll();
        assertThat(valeursList).hasSize(databaseSizeBeforeUpdate);
        Valeurs testValeurs = valeursList.get(valeursList.size() - 1);
        assertThat(testValeurs.getValeur()).isEqualTo(UPDATED_VALEUR);
    }

    @Test
    @Transactional
    public void updateNonExistingValeurs() throws Exception {
        int databaseSizeBeforeUpdate = valeursRepository.findAll().size();

        // Create the Valeurs

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restValeursMockMvc.perform(put("/api/valeurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(valeurs)))
            .andExpect(status().isBadRequest());

        // Validate the Valeurs in the database
        List<Valeurs> valeursList = valeursRepository.findAll();
        assertThat(valeursList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteValeurs() throws Exception {
        // Initialize the database
        valeursRepository.saveAndFlush(valeurs);

        int databaseSizeBeforeDelete = valeursRepository.findAll().size();

        // Delete the valeurs
        restValeursMockMvc.perform(delete("/api/valeurs/{id}", valeurs.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Valeurs> valeursList = valeursRepository.findAll();
        assertThat(valeursList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
