package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.EspfSampleApplicationApp;
import com.mycompany.myapp.domain.Attribut;
import com.mycompany.myapp.repository.AttributRepository;

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
 * Integration tests for the {@link AttributResource} REST controller.
 */
@SpringBootTest(classes = EspfSampleApplicationApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class AttributResourceIT {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_VALEUR = "AAAAAAAAAA";
    private static final String UPDATED_VALEUR = "BBBBBBBBBB";

    @Autowired
    private AttributRepository attributRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAttributMockMvc;

    private Attribut attribut;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Attribut createEntity(EntityManager em) {
        Attribut attribut = new Attribut()
            .code(DEFAULT_CODE)
            .valeur(DEFAULT_VALEUR);
        return attribut;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Attribut createUpdatedEntity(EntityManager em) {
        Attribut attribut = new Attribut()
            .code(UPDATED_CODE)
            .valeur(UPDATED_VALEUR);
        return attribut;
    }

    @BeforeEach
    public void initTest() {
        attribut = createEntity(em);
    }

    @Test
    @Transactional
    public void createAttribut() throws Exception {
        int databaseSizeBeforeCreate = attributRepository.findAll().size();

        // Create the Attribut
        restAttributMockMvc.perform(post("/api/attributs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(attribut)))
            .andExpect(status().isCreated());

        // Validate the Attribut in the database
        List<Attribut> attributList = attributRepository.findAll();
        assertThat(attributList).hasSize(databaseSizeBeforeCreate + 1);
        Attribut testAttribut = attributList.get(attributList.size() - 1);
        assertThat(testAttribut.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testAttribut.getValeur()).isEqualTo(DEFAULT_VALEUR);
    }

    @Test
    @Transactional
    public void createAttributWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = attributRepository.findAll().size();

        // Create the Attribut with an existing ID
        attribut.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAttributMockMvc.perform(post("/api/attributs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(attribut)))
            .andExpect(status().isBadRequest());

        // Validate the Attribut in the database
        List<Attribut> attributList = attributRepository.findAll();
        assertThat(attributList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = attributRepository.findAll().size();
        // set the field null
        attribut.setCode(null);

        // Create the Attribut, which fails.

        restAttributMockMvc.perform(post("/api/attributs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(attribut)))
            .andExpect(status().isBadRequest());

        List<Attribut> attributList = attributRepository.findAll();
        assertThat(attributList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkValeurIsRequired() throws Exception {
        int databaseSizeBeforeTest = attributRepository.findAll().size();
        // set the field null
        attribut.setValeur(null);

        // Create the Attribut, which fails.

        restAttributMockMvc.perform(post("/api/attributs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(attribut)))
            .andExpect(status().isBadRequest());

        List<Attribut> attributList = attributRepository.findAll();
        assertThat(attributList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAttributs() throws Exception {
        // Initialize the database
        attributRepository.saveAndFlush(attribut);

        // Get all the attributList
        restAttributMockMvc.perform(get("/api/attributs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(attribut.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)))
            .andExpect(jsonPath("$.[*].valeur").value(hasItem(DEFAULT_VALEUR)));
    }
    
    @Test
    @Transactional
    public void getAttribut() throws Exception {
        // Initialize the database
        attributRepository.saveAndFlush(attribut);

        // Get the attribut
        restAttributMockMvc.perform(get("/api/attributs/{id}", attribut.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(attribut.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE))
            .andExpect(jsonPath("$.valeur").value(DEFAULT_VALEUR));
    }

    @Test
    @Transactional
    public void getNonExistingAttribut() throws Exception {
        // Get the attribut
        restAttributMockMvc.perform(get("/api/attributs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAttribut() throws Exception {
        // Initialize the database
        attributRepository.saveAndFlush(attribut);

        int databaseSizeBeforeUpdate = attributRepository.findAll().size();

        // Update the attribut
        Attribut updatedAttribut = attributRepository.findById(attribut.getId()).get();
        // Disconnect from session so that the updates on updatedAttribut are not directly saved in db
        em.detach(updatedAttribut);
        updatedAttribut
            .code(UPDATED_CODE)
            .valeur(UPDATED_VALEUR);

        restAttributMockMvc.perform(put("/api/attributs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAttribut)))
            .andExpect(status().isOk());

        // Validate the Attribut in the database
        List<Attribut> attributList = attributRepository.findAll();
        assertThat(attributList).hasSize(databaseSizeBeforeUpdate);
        Attribut testAttribut = attributList.get(attributList.size() - 1);
        assertThat(testAttribut.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testAttribut.getValeur()).isEqualTo(UPDATED_VALEUR);
    }

    @Test
    @Transactional
    public void updateNonExistingAttribut() throws Exception {
        int databaseSizeBeforeUpdate = attributRepository.findAll().size();

        // Create the Attribut

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAttributMockMvc.perform(put("/api/attributs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(attribut)))
            .andExpect(status().isBadRequest());

        // Validate the Attribut in the database
        List<Attribut> attributList = attributRepository.findAll();
        assertThat(attributList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAttribut() throws Exception {
        // Initialize the database
        attributRepository.saveAndFlush(attribut);

        int databaseSizeBeforeDelete = attributRepository.findAll().size();

        // Delete the attribut
        restAttributMockMvc.perform(delete("/api/attributs/{id}", attribut.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Attribut> attributList = attributRepository.findAll();
        assertThat(attributList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
