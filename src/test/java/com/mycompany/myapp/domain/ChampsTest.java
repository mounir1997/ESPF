package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class ChampsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Champs.class);
        Champs champs1 = new Champs();
        champs1.setId(1L);
        Champs champs2 = new Champs();
        champs2.setId(champs1.getId());
        assertThat(champs1).isEqualTo(champs2);
        champs2.setId(2L);
        assertThat(champs1).isNotEqualTo(champs2);
        champs1.setId(null);
        assertThat(champs1).isNotEqualTo(champs2);
    }
}
