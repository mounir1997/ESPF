import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EspfSampleApplicationTestModule } from '../../../test.module';
import { PivotSocieteUpdateComponent } from 'app/entities/pivot-societe/pivot-societe-update.component';
import { PivotSocieteService } from 'app/entities/pivot-societe/pivot-societe.service';
import { PivotSociete } from 'app/shared/model/pivot-societe.model';

describe('Component Tests', () => {
  describe('PivotSociete Management Update Component', () => {
    let comp: PivotSocieteUpdateComponent;
    let fixture: ComponentFixture<PivotSocieteUpdateComponent>;
    let service: PivotSocieteService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EspfSampleApplicationTestModule],
        declarations: [PivotSocieteUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PivotSocieteUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PivotSocieteUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PivotSocieteService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PivotSociete(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new PivotSociete();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
