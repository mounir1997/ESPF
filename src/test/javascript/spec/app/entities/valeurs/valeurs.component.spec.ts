import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EspfSampleApplicationTestModule } from '../../../test.module';
import { ValeursComponent } from 'app/entities/valeurs/valeurs.component';
import { ValeursService } from 'app/entities/valeurs/valeurs.service';
import { Valeurs } from 'app/shared/model/valeurs.model';

describe('Component Tests', () => {
  describe('Valeurs Management Component', () => {
    let comp: ValeursComponent;
    let fixture: ComponentFixture<ValeursComponent>;
    let service: ValeursService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EspfSampleApplicationTestModule],
        declarations: [ValeursComponent]
      })
        .overrideTemplate(ValeursComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ValeursComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ValeursService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Valeurs(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.valeurs && comp.valeurs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
