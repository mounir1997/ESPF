import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EspfSampleApplicationTestModule } from '../../../test.module';
import { ValeursUpdateComponent } from 'app/entities/valeurs/valeurs-update.component';
import { ValeursService } from 'app/entities/valeurs/valeurs.service';
import { Valeurs } from 'app/shared/model/valeurs.model';

describe('Component Tests', () => {
  describe('Valeurs Management Update Component', () => {
    let comp: ValeursUpdateComponent;
    let fixture: ComponentFixture<ValeursUpdateComponent>;
    let service: ValeursService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EspfSampleApplicationTestModule],
        declarations: [ValeursUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ValeursUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ValeursUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ValeursService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Valeurs(123);
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
        const entity = new Valeurs();
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
