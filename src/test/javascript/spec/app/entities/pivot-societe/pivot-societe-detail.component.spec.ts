import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EspfSampleApplicationTestModule } from '../../../test.module';
import { PivotSocieteDetailComponent } from 'app/entities/pivot-societe/pivot-societe-detail.component';
import { PivotSociete } from 'app/shared/model/pivot-societe.model';

describe('Component Tests', () => {
  describe('PivotSociete Management Detail Component', () => {
    let comp: PivotSocieteDetailComponent;
    let fixture: ComponentFixture<PivotSocieteDetailComponent>;
    const route = ({ data: of({ pivotSociete: new PivotSociete(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EspfSampleApplicationTestModule],
        declarations: [PivotSocieteDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PivotSocieteDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PivotSocieteDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load pivotSociete on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.pivotSociete).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
