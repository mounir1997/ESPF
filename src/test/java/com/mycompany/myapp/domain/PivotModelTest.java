package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class PivotModelTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PivotModel.class);
        PivotModel pivotModel1 = new PivotModel();
        pivotModel1.setId(1L);
        PivotModel pivotModel2 = new PivotModel();
        pivotModel2.setId(pivotModel1.getId());
        assertThat(pivotModel1).isEqualTo(pivotModel2);
        pivotModel2.setId(2L);
        assertThat(pivotModel1).isNotEqualTo(pivotModel2);
        pivotModel1.setId(null);
        assertThat(pivotModel1).isNotEqualTo(pivotModel2);
    }
}
