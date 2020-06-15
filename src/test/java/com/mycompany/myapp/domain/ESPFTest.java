package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class ESPFTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ESPF.class);
        ESPF eSPF1 = new ESPF();
        eSPF1.setId(1L);
        ESPF eSPF2 = new ESPF();
        eSPF2.setId(eSPF1.getId());
        assertThat(eSPF1).isEqualTo(eSPF2);
        eSPF2.setId(2L);
        assertThat(eSPF1).isNotEqualTo(eSPF2);
        eSPF1.setId(null);
        assertThat(eSPF1).isNotEqualTo(eSPF2);
    }
}
