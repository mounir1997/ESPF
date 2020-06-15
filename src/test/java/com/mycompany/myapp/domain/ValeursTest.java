package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class ValeursTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Valeurs.class);
        Valeurs valeurs1 = new Valeurs();
        valeurs1.setId(1L);
        Valeurs valeurs2 = new Valeurs();
        valeurs2.setId(valeurs1.getId());
        assertThat(valeurs1).isEqualTo(valeurs2);
        valeurs2.setId(2L);
        assertThat(valeurs1).isNotEqualTo(valeurs2);
        valeurs1.setId(null);
        assertThat(valeurs1).isNotEqualTo(valeurs2);
    }
}
