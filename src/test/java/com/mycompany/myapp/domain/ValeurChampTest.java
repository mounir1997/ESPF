package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class ValeurChampTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ValeurChamp.class);
        ValeurChamp valeurChamp1 = new ValeurChamp();
        valeurChamp1.setId(1L);
        ValeurChamp valeurChamp2 = new ValeurChamp();
        valeurChamp2.setId(valeurChamp1.getId());
        assertThat(valeurChamp1).isEqualTo(valeurChamp2);
        valeurChamp2.setId(2L);
        assertThat(valeurChamp1).isNotEqualTo(valeurChamp2);
        valeurChamp1.setId(null);
        assertThat(valeurChamp1).isNotEqualTo(valeurChamp2);
    }
}
