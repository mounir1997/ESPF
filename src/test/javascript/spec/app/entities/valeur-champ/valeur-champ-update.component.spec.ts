import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EspfSampleApplicationTestModule } from '../../../test.module';
import { ValeurChampUpdateComponent } from 'app/entities/valeur-champ/valeur-champ-update.component';
import { ValeurChampService } from 'app/entities/valeur-champ/valeur-champ.service';
import { ValeurChamp } from 'app/shared/model/valeur-champ.model';

describe('Component Tests', () => {
  describe('ValeurChamp Management Update Component', () => {
    let comp: ValeurChampUpdateComponent;
    let fixture: ComponentFixture<ValeurChampUpdateComponent>;
    let service: ValeurChampService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EspfSampleApplicationTestModule],
        declarations: [ValeurChampUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ValeurChampUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ValeurChampUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ValeurChampService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ValeurChamp(123);
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
        const entity = new ValeurChamp();
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
