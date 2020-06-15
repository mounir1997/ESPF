import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EspfSampleApplicationTestModule } from '../../../test.module';
import { AttributDetailComponent } from 'app/entities/attribut/attribut-detail.component';
import { Attribut } from 'app/shared/model/attribut.model';

describe('Component Tests', () => {
  describe('Attribut Management Detail Component', () => {
    let comp: AttributDetailComponent;
    let fixture: ComponentFixture<AttributDetailComponent>;
    const route = ({ data: of({ attribut: new Attribut(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EspfSampleApplicationTestModule],
        declarations: [AttributDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AttributDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AttributDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load attribut on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.attribut).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
