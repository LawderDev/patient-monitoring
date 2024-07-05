import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalAddUserComponent } from '../modal-add-user/modal-add-user.component';
import { ModalDeleteUserComponent } from '../modal-delete-user/modal-delete-user.component';
import { ModalEditUserComponent } from '../modal-edit-user/modal-edit-user.component';
import { ApiPatientService } from '../services/api.patient-services';
import { Patient } from '../services/api.patient-services';
import { SocketPatientService } from '../services/socket.patient-services';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

@Component({
  selector: 'app-dashboard-user',
  standalone: true,
  imports: [CommonModule, ModalAddUserComponent, ModalDeleteUserComponent, ModalEditUserComponent],
  templateUrl: './dashboard-user.component.html',
  styleUrl: './dashboard-user.component.scss'
})

export class DashboardUserComponent {
  @ViewChild('deleteModal') deleteModal!: ModalDeleteUserComponent;
  @ViewChild('editModal') editModal!: ModalEditUserComponent;
  patients: Patient[] = [];
  selectedPatient: Patient = {id:1, name:'', apointmentDate:'', status:''};

  constructor(private socketPatientService: SocketPatientService, private apiPatientService: ApiPatientService) {
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

  openDeleteModal(patient: Patient) {
    this.selectedPatient = patient;
    this.deleteModal.handleOpenModalClick();

  }

  openEditModal(patient: Patient) {
    this.selectedPatient = patient;
    this.editModal.handleOpenModalClick();
  }

  startConsultation(patient : Patient) {
    patient.status = 'in_consultation';
    this.apiPatientService.updatePatient(patient.id, patient).subscribe()

  }

  endConsultation(patient: Patient) {
    this.apiPatientService.deletePatient(patient.id).subscribe()
  }

  formatDate(date: string) {
    const newDate = new Date(date);
    const newDateString = format(newDate, "PPpp", { locale: fr });
    return newDateString;
  }
}
