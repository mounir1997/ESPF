import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EspfSampleApplicationTestModule } from '../../../test.module';
import { LigneESPFUpdateComponent } from 'app/entities/ligne-espf/ligne-espf-update.component';
import { LigneESPFService } from 'app/entities/ligne-espf/ligne-espf.service';
import { LigneESPF } from 'app/shared/model/ligne-espf.model';

describe('Component Tests', () => {
  describe('LigneESPF Management Update Component', () => {
    let comp: LigneESPFUpdateComponent;
    let fixture: ComponentFixture<LigneESPFUpdateComponent>;
    let service: LigneESPFService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EspfSampleApplicationTestModule],
        declarations: [LigneESPFUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(LigneESPFUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LigneESPFUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LigneESPFService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new LigneESPF(123);
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
        const entity = new LigneESPF();
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
