import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Patient {
  name: string;
  apointmentDate: string;
  status: string;
}

@Component({
  selector: 'app-dashboard-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-user.component.html',
  styleUrl: './dashboard-user.component.scss'
})
export class DashboardUserComponent {
 //TODO replace to database
 patients: Patient[] = [
  {
    name: 'Cy Ganderton',
    apointmentDate: '2022-01-01 10:00:00',
    status: 'in_consultation'
  },
  {
    name: 'Hart Hagerty',
    apointmentDate: '2022-01-01 10:00:00',
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
