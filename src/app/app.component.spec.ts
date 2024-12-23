import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DpiTableauComponent } from './components/dpi-tableau/dpi-tableau.component';  // Importation du composant DPI Tableau
import { BrowserModule } from '@angular/platform-browser';
import { By } from '@angular/platform-browser'; // Pour interagir avec les éléments du DOM
import { CommonModule } from '@angular/common';


describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, DpiTableauComponent],  // Déclaration des composants utilisés dans le test
      imports: [BrowserModule], // Importation des modules nécessaires
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);  // Créer l'instance de AppComponent
    component = fixture.componentInstance;  // Récupérer l'instance du composant
    fixture.detectChanges();  // Déclencher les changements de détection
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();  // Vérifie que le composant a bien été créé
  });

  it(`should have as title 'dpi-tableau-app'`, () => {
    expect(component.title).toEqual('dpi-tableau-app');  // Vérifie que la valeur du titre est correcte
  });

  it('should render title in a h1 tag', () => {
    const compiled = fixture.nativeElement;  // Accéder à l'élément natif du DOM
    expect(compiled.querySelector('h1').textContent).toContain('Bienvenue sur mon application Angular !');  // Vérifie que le titre est bien affiché dans le DOM
  });

  it('should contain <app-dpi-tableau> component', () => {
    const compiled = fixture.nativeElement;
    const dpiTableauElement = compiled.querySelector('app-dpi-tableau');
    expect(dpiTableauElement).toBeTruthy();  // Vérifie que le composant <app-dpi-tableau> est bien présent dans le template
  });
});
