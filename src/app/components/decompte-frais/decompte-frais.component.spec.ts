import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:src/app/pages/soin-page/soin-page.component.spec.ts
import { SoinPageComponent } from './soin-page.component';

describe('SoinPageComponent', () => {
  let component: SoinPageComponent;
  let fixture: ComponentFixture<SoinPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoinPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoinPageComponent);
========
import { DecompteFraisComponent } from './decompte-frais.component';

describe('DecompteFraisComponent', () => {
  let component: DecompteFraisComponent;
  let fixture: ComponentFixture<DecompteFraisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecompteFraisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecompteFraisComponent);
>>>>>>>> amine:src/app/components/decompte-frais/decompte-frais.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
