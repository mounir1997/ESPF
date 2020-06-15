import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EspfSampleApplicationTestModule } from '../../../test.module';
import { LigneESPFDetailComponent } from 'app/entities/ligne-espf/ligne-espf-detail.component';
import { LigneESPF } from 'app/shared/model/ligne-espf.model';

describe('Component Tests', () => {
  describe('LigneESPF Management Detail Component', () => {
    let comp: LigneESPFDetailComponent;
    let fixture: ComponentFixture<LigneESPFDetailComponent>;
    const route = ({ data: of({ ligneESPF: new LigneESPF(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EspfSampleApplicationTestModule],
        declarations: [LigneESPFDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(LigneESPFDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LigneESPFDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load ligneESPF on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ligneESPF).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
