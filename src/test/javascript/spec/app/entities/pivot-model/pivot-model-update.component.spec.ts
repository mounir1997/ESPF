import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EspfSampleApplicationTestModule } from '../../../test.module';
import { PivotModelUpdateComponent } from 'app/entities/pivot-model/pivot-model-update.component';
import { PivotModelService } from 'app/entities/pivot-model/pivot-model.service';
import { PivotModel } from 'app/shared/model/pivot-model.model';

describe('Component Tests', () => {
  describe('PivotModel Management Update Component', () => {
    let comp: PivotModelUpdateComponent;
    let fixture: ComponentFixture<PivotModelUpdateComponent>;
    let service: PivotModelService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EspfSampleApplicationTestModule],
        declarations: [PivotModelUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PivotModelUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PivotModelUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PivotModelService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PivotModel(123);
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
        const entity = new PivotModel();
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
