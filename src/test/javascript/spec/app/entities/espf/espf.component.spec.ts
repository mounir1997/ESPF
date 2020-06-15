import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EspfSampleApplicationTestModule } from '../../../test.module';
import { ESPFComponent } from 'app/entities/espf/espf.component';
import { ESPFService } from 'app/entities/espf/espf.service';
import { ESPF } from 'app/shared/model/espf.model';

describe('Component Tests', () => {
  describe('ESPF Management Component', () => {
    let comp: ESPFComponent;
    let fixture: ComponentFixture<ESPFComponent>;
    let service: ESPFService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EspfSampleApplicationTestModule],
        declarations: [ESPFComponent]
      })
        .overrideTemplate(ESPFComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ESPFComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ESPFService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ESPF(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.eSPFS && comp.eSPFS[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
