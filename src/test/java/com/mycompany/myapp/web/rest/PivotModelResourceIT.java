package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.EspfSampleApplicationApp;
import com.mycompany.myapp.domain.PivotModel;
import com.mycompany.myapp.repository.PivotModelRepository;

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
 * Integration tests for the {@link PivotModelResource} REST controller.
 */
@SpringBootTest(classes = EspfSampleApplicationApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class PivotModelResourceIT {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    @Autowired
    private PivotModelRepository pivotModelRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPivotModelMockMvc;

    private PivotModel pivotModel;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PivotModel createEntity(EntityManager em) {
        PivotModel pivotModel = new PivotModel()
            .nom(DEFAULT_NOM);
        return pivotModel;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PivotModel createUpdatedEntity(EntityManager em) {
        PivotModel pivotModel = new PivotModel()
            .nom(UPDATED_NOM);
        return pivotModel;
    }

    @BeforeEach
    public void initTest() {
        pivotModel = createEntity(em);
    }

    @Test
    @Transactional
    public void createPivotModel() throws Exception {
        int databaseSizeBeforeCreate = pivotModelRepository.findAll().size();

        // Create the PivotModel
        restPivotModelMockMvc.perform(post("/api/pivot-models")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pivotModel)))
            .andExpect(status().isCreated());

        // Validate the PivotModel in the database
        List<PivotModel> pivotModelList = pivotModelRepository.findAll();
        assertThat(pivotModelList).hasSize(databaseSizeBeforeCreate + 1);
        PivotModel testPivotModel = pivotModelList.get(pivotModelList.size() - 1);
        assertThat(testPivotModel.getNom()).isEqualTo(DEFAULT_NOM);
    }

    @Test
    @Transactional
    public void createPivotModelWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pivotModelRepository.findAll().size();

        // Create the PivotModel with an existing ID
        pivotModel.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPivotModelMockMvc.perform(post("/api/pivot-models")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pivotModel)))
            .andExpect(status().isBadRequest());

        // Validate the PivotModel in the database
        List<PivotModel> pivotModelList = pivotModelRepository.findAll();
        assertThat(pivotModelList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = pivotModelRepository.findAll().size();
        // set the field null
        pivotModel.setNom(null);

        // Create the PivotModel, which fails.

        restPivotModelMockMvc.perform(post("/api/pivot-models")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pivotModel)))
            .andExpect(status().isBadRequest());

        List<PivotModel> pivotModelList = pivotModelRepository.findAll();
        assertThat(pivotModelList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPivotModels() throws Exception {
        // Initialize the database
        pivotModelRepository.saveAndFlush(pivotModel);

        // Get all the pivotModelList
        restPivotModelMockMvc.perform(get("/api/pivot-models?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pivotModel.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)));
    }
    
    @Test
    @Transactional
    public void getPivotModel() throws Exception {
        // Initialize the database
        pivotModelRepository.saveAndFlush(pivotModel);

        // Get the pivotModel
        restPivotModelMockMvc.perform(get("/api/pivot-models/{id}", pivotModel.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(pivotModel.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM));
    }

    @Test
    @Transactional
    public void getNonExistingPivotModel() throws Exception {
        // Get the pivotModel
        restPivotModelMockMvc.perform(get("/api/pivot-models/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePivotModel() throws Exception {
        // Initialize the database
        pivotModelRepository.saveAndFlush(pivotModel);

        int databaseSizeBeforeUpdate = pivotModelRepository.findAll().size();

        // Update the pivotModel
        PivotModel updatedPivotModel = pivotModelRepository.findById(pivotModel.getId()).get();
        // Disconnect from session so that the updates on updatedPivotModel are not directly saved in db
        em.detach(updatedPivotModel);
        updatedPivotModel
            .nom(UPDATED_NOM);

        restPivotModelMockMvc.perform(put("/api/pivot-models")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPivotModel)))
            .andExpect(status().isOk());

        // Validate the PivotModel in the database
        List<PivotModel> pivotModelList = pivotModelRepository.findAll();
        assertThat(pivotModelList).hasSize(databaseSizeBeforeUpdate);
        PivotModel testPivotModel = pivotModelList.get(pivotModelList.size() - 1);
        assertThat(testPivotModel.getNom()).isEqualTo(UPDATED_NOM);
    }

    @Test
    @Transactional
    public void updateNonExistingPivotModel() throws Exception {
        int databaseSizeBeforeUpdate = pivotModelRepository.findAll().size();

        // Create the PivotModel

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPivotModelMockMvc.perform(put("/api/pivot-models")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pivotModel)))
            .andExpect(status().isBadRequest());

        // Validate the PivotModel in the database
        List<PivotModel> pivotModelList = pivotModelRepository.findAll();
        assertThat(pivotModelList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePivotModel() throws Exception {
        // Initialize the database
        pivotModelRepository.saveAndFlush(pivotModel);

        int databaseSizeBeforeDelete = pivotModelRepository.findAll().size();

        // Delete the pivotModel
        restPivotModelMockMvc.perform(delete("/api/pivot-models/{id}", pivotModel.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PivotModel> pivotModelList = pivotModelRepository.findAll();
        assertThat(pivotModelList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
