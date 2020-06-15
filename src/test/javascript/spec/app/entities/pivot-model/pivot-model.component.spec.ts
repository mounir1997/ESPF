import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EspfSampleApplicationTestModule } from '../../../test.module';
import { PivotModelComponent } from 'app/entities/pivot-model/pivot-model.component';
import { PivotModelService } from 'app/entities/pivot-model/pivot-model.service';
import { PivotModel } from 'app/shared/model/pivot-model.model';

describe('Component Tests', () => {
  describe('PivotModel Management Component', () => {
    let comp: PivotModelComponent;
    let fixture: ComponentFixture<PivotModelComponent>;
    let service: PivotModelService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EspfSampleApplicationTestModule],
        declarations: [PivotModelComponent]
      })
        .overrideTemplate(PivotModelComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PivotModelComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PivotModelService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PivotModel(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.pivotModels && comp.pivotModels[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
