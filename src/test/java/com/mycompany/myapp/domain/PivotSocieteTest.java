package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class PivotSocieteTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PivotSociete.class);
        PivotSociete pivotSociete1 = new PivotSociete();
        pivotSociete1.setId(1L);
        PivotSociete pivotSociete2 = new PivotSociete();
        pivotSociete2.setId(pivotSociete1.getId());
        assertThat(pivotSociete1).isEqualTo(pivotSociete2);
        pivotSociete2.setId(2L);
        assertThat(pivotSociete1).isNotEqualTo(pivotSociete2);
        pivotSociete1.setId(null);
        assertThat(pivotSociete1).isNotEqualTo(pivotSociete2);
    }
}
