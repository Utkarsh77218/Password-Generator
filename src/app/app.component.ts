import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PasswordGeneratorComponent } from './password-generator/password-generator.component';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PasswordGeneratorComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
}
