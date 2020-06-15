import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EspfSampleApplicationTestModule } from '../../../test.module';
import { ChampsDetailComponent } from 'app/entities/champs/champs-detail.component';
import { Champs } from 'app/shared/model/champs.model';

describe('Component Tests', () => {
  describe('Champs Management Detail Component', () => {
    let comp: ChampsDetailComponent;
    let fixture: ComponentFixture<ChampsDetailComponent>;
    const route = ({ data: of({ champs: new Champs(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EspfSampleApplicationTestModule],
        declarations: [ChampsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ChampsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ChampsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load champs on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.champs).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
