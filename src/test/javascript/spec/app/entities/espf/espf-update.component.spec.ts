import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EspfSampleApplicationTestModule } from '../../../test.module';
import { ESPFUpdateComponent } from 'app/entities/espf/espf-update.component';
import { ESPFService } from 'app/entities/espf/espf.service';
import { ESPF } from 'app/shared/model/espf.model';

describe('Component Tests', () => {
  describe('ESPF Management Update Component', () => {
    let comp: ESPFUpdateComponent;
    let fixture: ComponentFixture<ESPFUpdateComponent>;
    let service: ESPFService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EspfSampleApplicationTestModule],
        declarations: [ESPFUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ESPFUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ESPFUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ESPFService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ESPF(123);
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
        const entity = new ESPF();
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
