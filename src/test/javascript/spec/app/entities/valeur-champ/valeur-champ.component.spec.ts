import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EspfSampleApplicationTestModule } from '../../../test.module';
import { ValeurChampComponent } from 'app/entities/valeur-champ/valeur-champ.component';
import { ValeurChampService } from 'app/entities/valeur-champ/valeur-champ.service';
import { ValeurChamp } from 'app/shared/model/valeur-champ.model';

describe('Component Tests', () => {
  describe('ValeurChamp Management Component', () => {
    let comp: ValeurChampComponent;
    let fixture: ComponentFixture<ValeurChampComponent>;
    let service: ValeurChampService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EspfSampleApplicationTestModule],
        declarations: [ValeurChampComponent]
      })
        .overrideTemplate(ValeurChampComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ValeurChampComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ValeurChampService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ValeurChamp(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.valeurChamps && comp.valeurChamps[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
