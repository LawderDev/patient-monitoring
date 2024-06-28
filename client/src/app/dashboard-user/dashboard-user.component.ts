import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalAddUserComponent } from '../modal-add-user/modal-add-user.component';
import { ModalDeleteUserComponent } from '../modal-delete-user/modal-delete-user.component';
import { ModalEditUserComponent } from '../modal-edit-user/modal-edit-user.component';
import { ApiPatientService } from '../services/api.patient-services';

interface Patient {
  id: number;
  name: string;
  apointmentDate: string;
  status: string;
}

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

  constructor(private apiPatientService: ApiPatientService) {
    this.patients = [
      {
        id: 1,
        name: 'Cy Ganderton',
        apointmentDate: '2022-01-01 10:00:00',
        status: 'in_consultation'
      },
      {
        id: 2,
        name: 'Hart Hagerty',
        apointmentDate: '2022-01-01 10:00:00',
        status: 'waiting'
      },
    ]
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
    this.apiPatientService.updatePatient(patient.id, patient).subscribe(data => {
      console.log("succeess upadate status");
      //TODO refresh data
    })

  }

  endConsultation(patient: Patient) {
    this.apiPatientService.deletePatient(patient.id).subscribe(data => {
      console.log("success end consultation")
    })
    //TODO refresh data
  }
}