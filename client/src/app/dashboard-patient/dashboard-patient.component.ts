import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketPatientService } from '../services/socket.patient-services';
import { Patient } from '../services/api.patient-services';

@Component({
  selector: 'app-dashboard-patient',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-patient.component.html',
  styleUrl: './dashboard-patient.component.scss'
})

export class DashboardPatientComponent {
  patients: Patient[] = [];

  constructor(private socketPatientService: SocketPatientService) {
    this.socketPatientService.getPatients().subscribe(data => {
      this.patients = data;
    })
  }

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
