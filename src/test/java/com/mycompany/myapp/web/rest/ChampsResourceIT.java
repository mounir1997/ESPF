package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.EspfSampleApplicationApp;
import com.mycompany.myapp.domain.Champs;
import com.mycompany.myapp.repository.ChampsRepository;

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
 * Integration tests for the {@link ChampsResource} REST controller.
 */
@SpringBootTest(classes = EspfSampleApplicationApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class ChampsResourceIT {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_POSITION = "AAAAAAAAAA";
    private static final String UPDATED_POSITION = "BBBBBBBBBB";

    private static final String DEFAULT_LONGUEUR = "AAAAAAAAAA";
    private static final String UPDATED_LONGUEUR = "BBBBBBBBBB";

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    @Autowired
    private ChampsRepository champsRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restChampsMockMvc;

    private Champs champs;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Champs createEntity(EntityManager em) {
        Champs champs = new Champs()
            .code(DEFAULT_CODE)
            .position(DEFAULT_POSITION)
            .longueur(DEFAULT_LONGUEUR)
            .type(DEFAULT_TYPE);
        return champs;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Champs createUpdatedEntity(EntityManager em) {
        Champs champs = new Champs()
            .code(UPDATED_CODE)
            .position(UPDATED_POSITION)
            .longueur(UPDATED_LONGUEUR)
            .type(UPDATED_TYPE);
        return champs;
    }

    @BeforeEach
    public void initTest() {
        champs = createEntity(em);
    }

    @Test
    @Transactional
    public void createChamps() throws Exception {
        int databaseSizeBeforeCreate = champsRepository.findAll().size();

        // Create the Champs
        restChampsMockMvc.perform(post("/api/champs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(champs)))
            .andExpect(status().isCreated());

        // Validate the Champs in the database
        List<Champs> champsList = champsRepository.findAll();
        assertThat(champsList).hasSize(databaseSizeBeforeCreate + 1);
        Champs testChamps = champsList.get(champsList.size() - 1);
        assertThat(testChamps.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testChamps.getPosition()).isEqualTo(DEFAULT_POSITION);
        assertThat(testChamps.getLongueur()).isEqualTo(DEFAULT_LONGUEUR);
        assertThat(testChamps.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    public void createChampsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = champsRepository.findAll().size();

        // Create the Champs with an existing ID
        champs.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restChampsMockMvc.perform(post("/api/champs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(champs)))
            .andExpect(status().isBadRequest());

        // Validate the Champs in the database
        List<Champs> champsList = champsRepository.findAll();
        assertThat(champsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = champsRepository.findAll().size();
        // set the field null
        champs.setCode(null);

        // Create the Champs, which fails.

        restChampsMockMvc.perform(post("/api/champs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(champs)))
            .andExpect(status().isBadRequest());

        List<Champs> champsList = champsRepository.findAll();
        assertThat(champsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPositionIsRequired() throws Exception {
        int databaseSizeBeforeTest = champsRepository.findAll().size();
        // set the field null
        champs.setPosition(null);

        // Create the Champs, which fails.

        restChampsMockMvc.perform(post("/api/champs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(champs)))
            .andExpect(status().isBadRequest());

        List<Champs> champsList = champsRepository.findAll();
        assertThat(champsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLongueurIsRequired() throws Exception {
        int databaseSizeBeforeTest = champsRepository.findAll().size();
        // set the field null
        champs.setLongueur(null);

        // Create the Champs, which fails.

        restChampsMockMvc.perform(post("/api/champs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(champs)))
            .andExpect(status().isBadRequest());

        List<Champs> champsList = champsRepository.findAll();
        assertThat(champsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = champsRepository.findAll().size();
        // set the field null
        champs.setType(null);

        // Create the Champs, which fails.

        restChampsMockMvc.perform(post("/api/champs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(champs)))
            .andExpect(status().isBadRequest());

        List<Champs> champsList = champsRepository.findAll();
        assertThat(champsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllChamps() throws Exception {
        // Initialize the database
        champsRepository.saveAndFlush(champs);

        // Get all the champsList
        restChampsMockMvc.perform(get("/api/champs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(champs.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)))
            .andExpect(jsonPath("$.[*].position").value(hasItem(DEFAULT_POSITION)))
            .andExpect(jsonPath("$.[*].longueur").value(hasItem(DEFAULT_LONGUEUR)))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE)));
    }
    
    @Test
    @Transactional
    public void getChamps() throws Exception {
        // Initialize the database
        champsRepository.saveAndFlush(champs);

        // Get the champs
        restChampsMockMvc.perform(get("/api/champs/{id}", champs.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(champs.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE))
            .andExpect(jsonPath("$.position").value(DEFAULT_POSITION))
            .andExpect(jsonPath("$.longueur").value(DEFAULT_LONGUEUR))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE));
    }

    @Test
    @Transactional
    public void getNonExistingChamps() throws Exception {
        // Get the champs
        restChampsMockMvc.perform(get("/api/champs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateChamps() throws Exception {
        // Initialize the database
        champsRepository.saveAndFlush(champs);

        int databaseSizeBeforeUpdate = champsRepository.findAll().size();

        // Update the champs
        Champs updatedChamps = champsRepository.findById(champs.getId()).get();
        // Disconnect from session so that the updates on updatedChamps are not directly saved in db
        em.detach(updatedChamps);
        updatedChamps
            .code(UPDATED_CODE)
            .position(UPDATED_POSITION)
            .longueur(UPDATED_LONGUEUR)
            .type(UPDATED_TYPE);

        restChampsMockMvc.perform(put("/api/champs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedChamps)))
            .andExpect(status().isOk());

        // Validate the Champs in the database
        List<Champs> champsList = champsRepository.findAll();
        assertThat(champsList).hasSize(databaseSizeBeforeUpdate);
        Champs testChamps = champsList.get(champsList.size() - 1);
        assertThat(testChamps.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testChamps.getPosition()).isEqualTo(UPDATED_POSITION);
        assertThat(testChamps.getLongueur()).isEqualTo(UPDATED_LONGUEUR);
        assertThat(testChamps.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingChamps() throws Exception {
        int databaseSizeBeforeUpdate = champsRepository.findAll().size();

        // Create the Champs

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restChampsMockMvc.perform(put("/api/champs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(champs)))
            .andExpect(status().isBadRequest());

        // Validate the Champs in the database
        List<Champs> champsList = champsRepository.findAll();
        assertThat(champsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteChamps() throws Exception {
        // Initialize the database
        champsRepository.saveAndFlush(champs);

        int databaseSizeBeforeDelete = champsRepository.findAll().size();

        // Delete the champs
        restChampsMockMvc.perform(delete("/api/champs/{id}", champs.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Champs> champsList = champsRepository.findAll();
        assertThat(champsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
