package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class LigneESPFTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LigneESPF.class);
        LigneESPF ligneESPF1 = new LigneESPF();
        ligneESPF1.setId(1L);
        LigneESPF ligneESPF2 = new LigneESPF();
        ligneESPF2.setId(ligneESPF1.getId());
        assertThat(ligneESPF1).isEqualTo(ligneESPF2);
        ligneESPF2.setId(2L);
        assertThat(ligneESPF1).isNotEqualTo(ligneESPF2);
        ligneESPF1.setId(null);
        assertThat(ligneESPF1).isNotEqualTo(ligneESPF2);
    }
}
