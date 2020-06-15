package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.EspfSampleApplicationApp;
import com.mycompany.myapp.domain.LigneESPF;
import com.mycompany.myapp.repository.LigneESPFRepository;

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
 * Integration tests for the {@link LigneESPFResource} REST controller.
 */
@SpringBootTest(classes = EspfSampleApplicationApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class LigneESPFResourceIT {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    @Autowired
    private LigneESPFRepository ligneESPFRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLigneESPFMockMvc;

    private LigneESPF ligneESPF;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LigneESPF createEntity(EntityManager em) {
        LigneESPF ligneESPF = new LigneESPF()
            .code(DEFAULT_CODE);
        return ligneESPF;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LigneESPF createUpdatedEntity(EntityManager em) {
        LigneESPF ligneESPF = new LigneESPF()
            .code(UPDATED_CODE);
        return ligneESPF;
    }

    @BeforeEach
    public void initTest() {
        ligneESPF = createEntity(em);
    }

    @Test
    @Transactional
    public void createLigneESPF() throws Exception {
        int databaseSizeBeforeCreate = ligneESPFRepository.findAll().size();

        // Create the LigneESPF
        restLigneESPFMockMvc.perform(post("/api/ligne-espfs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ligneESPF)))
            .andExpect(status().isCreated());

        // Validate the LigneESPF in the database
        List<LigneESPF> ligneESPFList = ligneESPFRepository.findAll();
        assertThat(ligneESPFList).hasSize(databaseSizeBeforeCreate + 1);
        LigneESPF testLigneESPF = ligneESPFList.get(ligneESPFList.size() - 1);
        assertThat(testLigneESPF.getCode()).isEqualTo(DEFAULT_CODE);
    }

    @Test
    @Transactional
    public void createLigneESPFWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ligneESPFRepository.findAll().size();

        // Create the LigneESPF with an existing ID
        ligneESPF.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLigneESPFMockMvc.perform(post("/api/ligne-espfs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ligneESPF)))
            .andExpect(status().isBadRequest());

        // Validate the LigneESPF in the database
        List<LigneESPF> ligneESPFList = ligneESPFRepository.findAll();
        assertThat(ligneESPFList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = ligneESPFRepository.findAll().size();
        // set the field null
        ligneESPF.setCode(null);

        // Create the LigneESPF, which fails.

        restLigneESPFMockMvc.perform(post("/api/ligne-espfs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ligneESPF)))
            .andExpect(status().isBadRequest());

        List<LigneESPF> ligneESPFList = ligneESPFRepository.findAll();
        assertThat(ligneESPFList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllLigneESPFS() throws Exception {
        // Initialize the database
        ligneESPFRepository.saveAndFlush(ligneESPF);

        // Get all the ligneESPFList
        restLigneESPFMockMvc.perform(get("/api/ligne-espfs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ligneESPF.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)));
    }
    
    @Test
    @Transactional
    public void getLigneESPF() throws Exception {
        // Initialize the database
        ligneESPFRepository.saveAndFlush(ligneESPF);

        // Get the ligneESPF
        restLigneESPFMockMvc.perform(get("/api/ligne-espfs/{id}", ligneESPF.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ligneESPF.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE));
    }

    @Test
    @Transactional
    public void getNonExistingLigneESPF() throws Exception {
        // Get the ligneESPF
        restLigneESPFMockMvc.perform(get("/api/ligne-espfs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLigneESPF() throws Exception {
        // Initialize the database
        ligneESPFRepository.saveAndFlush(ligneESPF);

        int databaseSizeBeforeUpdate = ligneESPFRepository.findAll().size();

        // Update the ligneESPF
        LigneESPF updatedLigneESPF = ligneESPFRepository.findById(ligneESPF.getId()).get();
        // Disconnect from session so that the updates on updatedLigneESPF are not directly saved in db
        em.detach(updatedLigneESPF);
        updatedLigneESPF
            .code(UPDATED_CODE);

        restLigneESPFMockMvc.perform(put("/api/ligne-espfs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedLigneESPF)))
            .andExpect(status().isOk());

        // Validate the LigneESPF in the database
        List<LigneESPF> ligneESPFList = ligneESPFRepository.findAll();
        assertThat(ligneESPFList).hasSize(databaseSizeBeforeUpdate);
        LigneESPF testLigneESPF = ligneESPFList.get(ligneESPFList.size() - 1);
        assertThat(testLigneESPF.getCode()).isEqualTo(UPDATED_CODE);
    }

    @Test
    @Transactional
    public void updateNonExistingLigneESPF() throws Exception {
        int databaseSizeBeforeUpdate = ligneESPFRepository.findAll().size();

        // Create the LigneESPF

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLigneESPFMockMvc.perform(put("/api/ligne-espfs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ligneESPF)))
            .andExpect(status().isBadRequest());

        // Validate the LigneESPF in the database
        List<LigneESPF> ligneESPFList = ligneESPFRepository.findAll();
        assertThat(ligneESPFList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLigneESPF() throws Exception {
        // Initialize the database
        ligneESPFRepository.saveAndFlush(ligneESPF);

        int databaseSizeBeforeDelete = ligneESPFRepository.findAll().size();

        // Delete the ligneESPF
        restLigneESPFMockMvc.perform(delete("/api/ligne-espfs/{id}", ligneESPF.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<LigneESPF> ligneESPFList = ligneESPFRepository.findAll();
        assertThat(ligneESPFList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
