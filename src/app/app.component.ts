import { Component } from '@angular/core';
import { RouterLink,  RouterOutlet } from '@angular/router';
import { DpiComponent } from "./pages/dpi/dpi.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, FormsModule, NavbarComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front-end';
}
