import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EspfSampleApplicationTestModule } from '../../../test.module';
import { LigneESPFComponent } from 'app/entities/ligne-espf/ligne-espf.component';
import { LigneESPFService } from 'app/entities/ligne-espf/ligne-espf.service';
import { LigneESPF } from 'app/shared/model/ligne-espf.model';

describe('Component Tests', () => {
  describe('LigneESPF Management Component', () => {
    let comp: LigneESPFComponent;
    let fixture: ComponentFixture<LigneESPFComponent>;
    let service: LigneESPFService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EspfSampleApplicationTestModule],
        declarations: [LigneESPFComponent]
      })
        .overrideTemplate(LigneESPFComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LigneESPFComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LigneESPFService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new LigneESPF(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.ligneESPFS && comp.ligneESPFS[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
