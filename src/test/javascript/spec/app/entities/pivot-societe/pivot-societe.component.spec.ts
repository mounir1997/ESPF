import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EspfSampleApplicationTestModule } from '../../../test.module';
import { PivotSocieteComponent } from 'app/entities/pivot-societe/pivot-societe.component';
import { PivotSocieteService } from 'app/entities/pivot-societe/pivot-societe.service';
import { PivotSociete } from 'app/shared/model/pivot-societe.model';

describe('Component Tests', () => {
  describe('PivotSociete Management Component', () => {
    let comp: PivotSocieteComponent;
    let fixture: ComponentFixture<PivotSocieteComponent>;
    let service: PivotSocieteService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EspfSampleApplicationTestModule],
        declarations: [PivotSocieteComponent]
      })
        .overrideTemplate(PivotSocieteComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PivotSocieteComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PivotSocieteService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PivotSociete(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.pivotSocietes && comp.pivotSocietes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
