import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EspfSampleApplicationTestModule } from '../../../test.module';
import { ESPFDetailComponent } from 'app/entities/espf/espf-detail.component';
import { ESPF } from 'app/shared/model/espf.model';

describe('Component Tests', () => {
  describe('ESPF Management Detail Component', () => {
    let comp: ESPFDetailComponent;
    let fixture: ComponentFixture<ESPFDetailComponent>;
    const route = ({ data: of({ eSPF: new ESPF(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EspfSampleApplicationTestModule],
        declarations: [ESPFDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ESPFDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ESPFDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load eSPF on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.eSPF).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
