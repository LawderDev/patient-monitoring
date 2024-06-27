import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Patient {
  name: string;
  status: string;
}

@Component({
  selector: 'app-dashboard-patient',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-patient.component.html',
  styleUrl: './dashboard-patient.component.scss'
})

export class DashboardPatientComponent {
  //TODO replace to database
  patients: Patient[] = [
    {
      name: 'Cy Ganderton',
      status: 'in_consultation'
    },
    {
      name: 'Hart Hagerty',
      status: 'waiting'
    },
  ];

  getStatus(status: string) {
    switch (status) {
      case 'in_consultation':
        return 'En consultation';
      case 'waiting':
        return 'En attente';
      default:
        return 'En attente';
    }
  }

}
