import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAdministratifComponent } from './page-administratif.component';

describe('PageAdministratifComponent', () => {
  let component: PageAdministratifComponent;
  let fixture: ComponentFixture<PageAdministratifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageAdministratifComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageAdministratifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
