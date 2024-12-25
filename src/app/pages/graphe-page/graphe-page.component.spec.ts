import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphePageComponent } from './graphe-page.component';

describe('GraphePageComponent', () => {
  let component: GraphePageComponent;
  let fixture: ComponentFixture<GraphePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraphePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
