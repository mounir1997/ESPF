package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Projet.
 */
@Entity
@Table(name = "projet")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Projet implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nom", nullable = false)
    private String nom;

    @NotNull
    @Column(name = "devise", nullable = false)
    private String devise;

    @NotNull
    @Column(name = "periodicite", nullable = false)
    private String periodicite;

    @ManyToOne
    @JsonIgnoreProperties("projets")
    private Utilisateur utilisateur;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public Projet nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getDevise() {
        return devise;
    }

    public Projet devise(String devise) {
        this.devise = devise;
        return this;
    }

    public void setDevise(String devise) {
        this.devise = devise;
    }

    public String getPeriodicite() {
        return periodicite;
    }

    public Projet periodicite(String periodicite) {
        this.periodicite = periodicite;
        return this;
    }

    public void setPeriodicite(String periodicite) {
        this.periodicite = periodicite;
    }

    public Utilisateur getUtilisateur() {
        return utilisateur;
    }

    public Projet utilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
        return this;
    }

    public void setUtilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Projet)) {
            return false;
        }
        return id != null && id.equals(((Projet) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Projet{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", devise='" + getDevise() + "'" +
            ", periodicite='" + getPeriodicite() + "'" +
            "}";
    }
}
