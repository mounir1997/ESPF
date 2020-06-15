import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EspfSampleApplicationTestModule } from '../../../test.module';
import { ValeurChampDetailComponent } from 'app/entities/valeur-champ/valeur-champ-detail.component';
import { ValeurChamp } from 'app/shared/model/valeur-champ.model';

describe('Component Tests', () => {
  describe('ValeurChamp Management Detail Component', () => {
    let comp: ValeurChampDetailComponent;
    let fixture: ComponentFixture<ValeurChampDetailComponent>;
    const route = ({ data: of({ valeurChamp: new ValeurChamp(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EspfSampleApplicationTestModule],
        declarations: [ValeurChampDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ValeurChampDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ValeurChampDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load valeurChamp on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.valeurChamp).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
