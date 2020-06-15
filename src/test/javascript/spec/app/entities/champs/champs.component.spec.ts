import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EspfSampleApplicationTestModule } from '../../../test.module';
import { ChampsComponent } from 'app/entities/champs/champs.component';
import { ChampsService } from 'app/entities/champs/champs.service';
import { Champs } from 'app/shared/model/champs.model';

describe('Component Tests', () => {
  describe('Champs Management Component', () => {
    let comp: ChampsComponent;
    let fixture: ComponentFixture<ChampsComponent>;
    let service: ChampsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EspfSampleApplicationTestModule],
        declarations: [ChampsComponent]
      })
        .overrideTemplate(ChampsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ChampsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ChampsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Champs(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.champs && comp.champs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
