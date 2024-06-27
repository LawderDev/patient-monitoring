import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PatientItemComponent } from './patient-item/patient-item.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PatientItemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'my-project';
}
