import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EspfSampleApplicationTestModule } from '../../../test.module';
import { ChampsUpdateComponent } from 'app/entities/champs/champs-update.component';
import { ChampsService } from 'app/entities/champs/champs.service';
import { Champs } from 'app/shared/model/champs.model';

describe('Component Tests', () => {
  describe('Champs Management Update Component', () => {
    let comp: ChampsUpdateComponent;
    let fixture: ComponentFixture<ChampsUpdateComponent>;
    let service: ChampsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EspfSampleApplicationTestModule],
        declarations: [ChampsUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ChampsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ChampsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ChampsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Champs(123);
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
        const entity = new Champs();
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
