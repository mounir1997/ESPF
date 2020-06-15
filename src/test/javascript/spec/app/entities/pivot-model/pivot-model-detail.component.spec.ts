import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EspfSampleApplicationTestModule } from '../../../test.module';
import { PivotModelDetailComponent } from 'app/entities/pivot-model/pivot-model-detail.component';
import { PivotModel } from 'app/shared/model/pivot-model.model';

describe('Component Tests', () => {
  describe('PivotModel Management Detail Component', () => {
    let comp: PivotModelDetailComponent;
    let fixture: ComponentFixture<PivotModelDetailComponent>;
    const route = ({ data: of({ pivotModel: new PivotModel(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EspfSampleApplicationTestModule],
        declarations: [PivotModelDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PivotModelDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PivotModelDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load pivotModel on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.pivotModel).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
