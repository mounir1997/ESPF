import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EspfSampleApplicationTestModule } from '../../../test.module';
import { AttributUpdateComponent } from 'app/entities/attribut/attribut-update.component';
import { AttributService } from 'app/entities/attribut/attribut.service';
import { Attribut } from 'app/shared/model/attribut.model';

describe('Component Tests', () => {
  describe('Attribut Management Update Component', () => {
    let comp: AttributUpdateComponent;
    let fixture: ComponentFixture<AttributUpdateComponent>;
    let service: AttributService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EspfSampleApplicationTestModule],
        declarations: [AttributUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AttributUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AttributUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AttributService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Attribut(123);
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
        const entity = new Attribut();
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
