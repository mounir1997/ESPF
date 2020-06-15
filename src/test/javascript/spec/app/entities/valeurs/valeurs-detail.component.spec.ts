import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EspfSampleApplicationTestModule } from '../../../test.module';
import { ValeursDetailComponent } from 'app/entities/valeurs/valeurs-detail.component';
import { Valeurs } from 'app/shared/model/valeurs.model';

describe('Component Tests', () => {
  describe('Valeurs Management Detail Component', () => {
    let comp: ValeursDetailComponent;
    let fixture: ComponentFixture<ValeursDetailComponent>;
    const route = ({ data: of({ valeurs: new Valeurs(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EspfSampleApplicationTestModule],
        declarations: [ValeursDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ValeursDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ValeursDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load valeurs on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.valeurs).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
