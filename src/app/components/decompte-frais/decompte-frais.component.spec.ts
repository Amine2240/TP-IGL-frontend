import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SoinPageComponent } from '../../components//';
import { DecompteFraisComponent } from './decompte-frais.component';

describe('Component Tests', () => {
  describe('SoinPageComponent', () => {
    let component: SoinPageComponent;
    let fixture: ComponentFixture<SoinPageComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [SoinPageComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(SoinPageComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create SoinPageComponent', () => {
      import { ComponentFixture, TestBed } from '@angular/core/testing';
      import { SoinPageComponent } from './soin-page.component';
      import { DecompteFraisComponent } from './decompte-frais.component';

      describe('Component Tests', () => {
        describe('SoinPageComponent', () => {
          let component: SoinPageComponent;
          let fixture: ComponentFixture<SoinPageComponent>;

          beforeEach(async () => {
            await TestBed.configureTestingModule({
              imports: [SoinPageComponent],
            }).compileComponents();

            fixture = TestBed.createComponent(SoinPageComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
          });

          it('should create SoinPageComponent', () => {
            expect(component).toBeTruthy();
          });
        });

        describe('DecompteFraisComponent', () => {
          let component: DecompteFraisComponent;
          let fixture: ComponentFixture<DecompteFraisComponent>;

          beforeEach(async () => {
            await TestBed.configureTestingModule({
              imports: [DecompteFraisComponent],
            }).compileComponents();

            fixture = TestBed.createComponent(DecompteFraisComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
          });

          it('should create DecompteFraisComponent', () => {
            expect(component).toBeTruthy();
          });
        });
      });
      expect(component).toBeTruthy();
    });
  });

  describe('DecompteFraisComponent', () => {
    let component: DecompteFraisComponent;
    let fixture: ComponentFixture<DecompteFraisComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [DecompteFraisComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(DecompteFraisComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create DecompteFraisComponent', () => {
      expect(component).toBeTruthy();
    });
  });
});
