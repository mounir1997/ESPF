package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.EspfSampleApplicationApp;
import com.mycompany.myapp.domain.Utilisateur;
import com.mycompany.myapp.repository.UtilisateurRepository;

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
 * Integration tests for the {@link UtilisateurResource} REST controller.
 */
@SpringBootTest(classes = EspfSampleApplicationApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class UtilisateurResourceIT {

    private static final String DEFAULT_LOGIN = "AAAAAAAAAA";
    private static final String UPDATED_LOGIN = "BBBBBBBBBB";

    private static final String DEFAULT_MDP = "AAAAAAAAAA";
    private static final String UPDATED_MDP = "BBBBBBBBBB";

    private static final String DEFAULT_ROLE = "AAAAAAAAAA";
    private static final String UPDATED_ROLE = "BBBBBBBBBB";

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restUtilisateurMockMvc;

    private Utilisateur utilisateur;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Utilisateur createEntity(EntityManager em) {
        Utilisateur utilisateur = new Utilisateur()
            .login(DEFAULT_LOGIN)
            .mdp(DEFAULT_MDP)
            .role(DEFAULT_ROLE);
        return utilisateur;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Utilisateur createUpdatedEntity(EntityManager em) {
        Utilisateur utilisateur = new Utilisateur()
            .login(UPDATED_LOGIN)
            .mdp(UPDATED_MDP)
            .role(UPDATED_ROLE);
        return utilisateur;
    }

    @BeforeEach
    public void initTest() {
        utilisateur = createEntity(em);
    }

    @Test
    @Transactional
    public void createUtilisateur() throws Exception {
        int databaseSizeBeforeCreate = utilisateurRepository.findAll().size();

        // Create the Utilisateur
        restUtilisateurMockMvc.perform(post("/api/utilisateurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(utilisateur)))
            .andExpect(status().isCreated());

        // Validate the Utilisateur in the database
        List<Utilisateur> utilisateurList = utilisateurRepository.findAll();
        assertThat(utilisateurList).hasSize(databaseSizeBeforeCreate + 1);
        Utilisateur testUtilisateur = utilisateurList.get(utilisateurList.size() - 1);
        assertThat(testUtilisateur.getLogin()).isEqualTo(DEFAULT_LOGIN);
        assertThat(testUtilisateur.getMdp()).isEqualTo(DEFAULT_MDP);
        assertThat(testUtilisateur.getRole()).isEqualTo(DEFAULT_ROLE);
    }

    @Test
    @Transactional
    public void createUtilisateurWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = utilisateurRepository.findAll().size();

        // Create the Utilisateur with an existing ID
        utilisateur.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUtilisateurMockMvc.perform(post("/api/utilisateurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(utilisateur)))
            .andExpect(status().isBadRequest());

        // Validate the Utilisateur in the database
        List<Utilisateur> utilisateurList = utilisateurRepository.findAll();
        assertThat(utilisateurList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkLoginIsRequired() throws Exception {
        int databaseSizeBeforeTest = utilisateurRepository.findAll().size();
        // set the field null
        utilisateur.setLogin(null);

        // Create the Utilisateur, which fails.

        restUtilisateurMockMvc.perform(post("/api/utilisateurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(utilisateur)))
            .andExpect(status().isBadRequest());

        List<Utilisateur> utilisateurList = utilisateurRepository.findAll();
        assertThat(utilisateurList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMdpIsRequired() throws Exception {
        int databaseSizeBeforeTest = utilisateurRepository.findAll().size();
        // set the field null
        utilisateur.setMdp(null);

        // Create the Utilisateur, which fails.

        restUtilisateurMockMvc.perform(post("/api/utilisateurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(utilisateur)))
            .andExpect(status().isBadRequest());

        List<Utilisateur> utilisateurList = utilisateurRepository.findAll();
        assertThat(utilisateurList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRoleIsRequired() throws Exception {
        int databaseSizeBeforeTest = utilisateurRepository.findAll().size();
        // set the field null
        utilisateur.setRole(null);

        // Create the Utilisateur, which fails.

        restUtilisateurMockMvc.perform(post("/api/utilisateurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(utilisateur)))
            .andExpect(status().isBadRequest());

        List<Utilisateur> utilisateurList = utilisateurRepository.findAll();
        assertThat(utilisateurList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllUtilisateurs() throws Exception {
        // Initialize the database
        utilisateurRepository.saveAndFlush(utilisateur);

        // Get all the utilisateurList
        restUtilisateurMockMvc.perform(get("/api/utilisateurs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(utilisateur.getId().intValue())))
            .andExpect(jsonPath("$.[*].login").value(hasItem(DEFAULT_LOGIN)))
            .andExpect(jsonPath("$.[*].mdp").value(hasItem(DEFAULT_MDP)))
            .andExpect(jsonPath("$.[*].role").value(hasItem(DEFAULT_ROLE)));
    }
    
    @Test
    @Transactional
    public void getUtilisateur() throws Exception {
        // Initialize the database
        utilisateurRepository.saveAndFlush(utilisateur);

        // Get the utilisateur
        restUtilisateurMockMvc.perform(get("/api/utilisateurs/{id}", utilisateur.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(utilisateur.getId().intValue()))
            .andExpect(jsonPath("$.login").value(DEFAULT_LOGIN))
            .andExpect(jsonPath("$.mdp").value(DEFAULT_MDP))
            .andExpect(jsonPath("$.role").value(DEFAULT_ROLE));
    }

    @Test
    @Transactional
    public void getNonExistingUtilisateur() throws Exception {
        // Get the utilisateur
        restUtilisateurMockMvc.perform(get("/api/utilisateurs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUtilisateur() throws Exception {
        // Initialize the database
        utilisateurRepository.saveAndFlush(utilisateur);

        int databaseSizeBeforeUpdate = utilisateurRepository.findAll().size();

        // Update the utilisateur
        Utilisateur updatedUtilisateur = utilisateurRepository.findById(utilisateur.getId()).get();
        // Disconnect from session so that the updates on updatedUtilisateur are not directly saved in db
        em.detach(updatedUtilisateur);
        updatedUtilisateur
            .login(UPDATED_LOGIN)
            .mdp(UPDATED_MDP)
            .role(UPDATED_ROLE);

        restUtilisateurMockMvc.perform(put("/api/utilisateurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedUtilisateur)))
            .andExpect(status().isOk());

        // Validate the Utilisateur in the database
        List<Utilisateur> utilisateurList = utilisateurRepository.findAll();
        assertThat(utilisateurList).hasSize(databaseSizeBeforeUpdate);
        Utilisateur testUtilisateur = utilisateurList.get(utilisateurList.size() - 1);
        assertThat(testUtilisateur.getLogin()).isEqualTo(UPDATED_LOGIN);
        assertThat(testUtilisateur.getMdp()).isEqualTo(UPDATED_MDP);
        assertThat(testUtilisateur.getRole()).isEqualTo(UPDATED_ROLE);
    }

    @Test
    @Transactional
    public void updateNonExistingUtilisateur() throws Exception {
        int databaseSizeBeforeUpdate = utilisateurRepository.findAll().size();

        // Create the Utilisateur

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUtilisateurMockMvc.perform(put("/api/utilisateurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(utilisateur)))
            .andExpect(status().isBadRequest());

        // Validate the Utilisateur in the database
        List<Utilisateur> utilisateurList = utilisateurRepository.findAll();
        assertThat(utilisateurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUtilisateur() throws Exception {
        // Initialize the database
        utilisateurRepository.saveAndFlush(utilisateur);

        int databaseSizeBeforeDelete = utilisateurRepository.findAll().size();

        // Delete the utilisateur
        restUtilisateurMockMvc.perform(delete("/api/utilisateurs/{id}", utilisateur.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Utilisateur> utilisateurList = utilisateurRepository.findAll();
        assertThat(utilisateurList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
