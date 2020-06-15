import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EspfSampleApplicationTestModule } from '../../../test.module';
import { AttributComponent } from 'app/entities/attribut/attribut.component';
import { AttributService } from 'app/entities/attribut/attribut.service';
import { Attribut } from 'app/shared/model/attribut.model';

describe('Component Tests', () => {
  describe('Attribut Management Component', () => {
    let comp: AttributComponent;
    let fixture: ComponentFixture<AttributComponent>;
    let service: AttributService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EspfSampleApplicationTestModule],
        declarations: [AttributComponent]
      })
        .overrideTemplate(AttributComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AttributComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AttributService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Attribut(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.attributs && comp.attributs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
