package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class AttributTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Attribut.class);
        Attribut attribut1 = new Attribut();
        attribut1.setId(1L);
        Attribut attribut2 = new Attribut();
        attribut2.setId(attribut1.getId());
        assertThat(attribut1).isEqualTo(attribut2);
        attribut2.setId(2L);
        assertThat(attribut1).isNotEqualTo(attribut2);
        attribut1.setId(null);
        assertThat(attribut1).isNotEqualTo(attribut2);
    }
}
