package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.EspfSampleApplicationApp;
import com.mycompany.myapp.domain.ESPF;
import com.mycompany.myapp.repository.ESPFRepository;

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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ESPFResource} REST controller.
 */
@SpringBootTest(classes = EspfSampleApplicationApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class ESPFResourceIT {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private ESPFRepository eSPFRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restESPFMockMvc;

    private ESPF eSPF;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ESPF createEntity(EntityManager em) {
        ESPF eSPF = new ESPF()
            .code(DEFAULT_CODE)
            .date(DEFAULT_DATE);
        return eSPF;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ESPF createUpdatedEntity(EntityManager em) {
        ESPF eSPF = new ESPF()
            .code(UPDATED_CODE)
            .date(UPDATED_DATE);
        return eSPF;
    }

    @BeforeEach
    public void initTest() {
        eSPF = createEntity(em);
    }

    @Test
    @Transactional
    public void createESPF() throws Exception {
        int databaseSizeBeforeCreate = eSPFRepository.findAll().size();

        // Create the ESPF
        restESPFMockMvc.perform(post("/api/espfs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(eSPF)))
            .andExpect(status().isCreated());

        // Validate the ESPF in the database
        List<ESPF> eSPFList = eSPFRepository.findAll();
        assertThat(eSPFList).hasSize(databaseSizeBeforeCreate + 1);
        ESPF testESPF = eSPFList.get(eSPFList.size() - 1);
        assertThat(testESPF.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testESPF.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    public void createESPFWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = eSPFRepository.findAll().size();

        // Create the ESPF with an existing ID
        eSPF.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restESPFMockMvc.perform(post("/api/espfs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(eSPF)))
            .andExpect(status().isBadRequest());

        // Validate the ESPF in the database
        List<ESPF> eSPFList = eSPFRepository.findAll();
        assertThat(eSPFList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = eSPFRepository.findAll().size();
        // set the field null
        eSPF.setCode(null);

        // Create the ESPF, which fails.

        restESPFMockMvc.perform(post("/api/espfs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(eSPF)))
            .andExpect(status().isBadRequest());

        List<ESPF> eSPFList = eSPFRepository.findAll();
        assertThat(eSPFList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = eSPFRepository.findAll().size();
        // set the field null
        eSPF.setDate(null);

        // Create the ESPF, which fails.

        restESPFMockMvc.perform(post("/api/espfs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(eSPF)))
            .andExpect(status().isBadRequest());

        List<ESPF> eSPFList = eSPFRepository.findAll();
        assertThat(eSPFList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllESPFS() throws Exception {
        // Initialize the database
        eSPFRepository.saveAndFlush(eSPF);

        // Get all the eSPFList
        restESPFMockMvc.perform(get("/api/espfs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(eSPF.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getESPF() throws Exception {
        // Initialize the database
        eSPFRepository.saveAndFlush(eSPF);

        // Get the eSPF
        restESPFMockMvc.perform(get("/api/espfs/{id}", eSPF.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(eSPF.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingESPF() throws Exception {
        // Get the eSPF
        restESPFMockMvc.perform(get("/api/espfs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateESPF() throws Exception {
        // Initialize the database
        eSPFRepository.saveAndFlush(eSPF);

        int databaseSizeBeforeUpdate = eSPFRepository.findAll().size();

        // Update the eSPF
        ESPF updatedESPF = eSPFRepository.findById(eSPF.getId()).get();
        // Disconnect from session so that the updates on updatedESPF are not directly saved in db
        em.detach(updatedESPF);
        updatedESPF
            .code(UPDATED_CODE)
            .date(UPDATED_DATE);

        restESPFMockMvc.perform(put("/api/espfs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedESPF)))
            .andExpect(status().isOk());

        // Validate the ESPF in the database
        List<ESPF> eSPFList = eSPFRepository.findAll();
        assertThat(eSPFList).hasSize(databaseSizeBeforeUpdate);
        ESPF testESPF = eSPFList.get(eSPFList.size() - 1);
        assertThat(testESPF.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testESPF.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingESPF() throws Exception {
        int databaseSizeBeforeUpdate = eSPFRepository.findAll().size();

        // Create the ESPF

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restESPFMockMvc.perform(put("/api/espfs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(eSPF)))
            .andExpect(status().isBadRequest());

        // Validate the ESPF in the database
        List<ESPF> eSPFList = eSPFRepository.findAll();
        assertThat(eSPFList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteESPF() throws Exception {
        // Initialize the database
        eSPFRepository.saveAndFlush(eSPF);

        int databaseSizeBeforeDelete = eSPFRepository.findAll().size();

        // Delete the eSPF
        restESPFMockMvc.perform(delete("/api/espfs/{id}", eSPF.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ESPF> eSPFList = eSPFRepository.findAll();
        assertThat(eSPFList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
