import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import { AbstractControl, ValidationErrors } from '@angular/forms';

interface Patient {
  name: string;
  apointmentDate: string;
  status: string;
}

@Component({
  selector: 'app-dashboard-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard-user.component.html',
  styleUrl: './dashboard-user.component.scss'
})
export class DashboardUserComponent {
  currentDateTime: string;
  addPatientForm: FormGroup;
  patients: Patient[] = [];

  constructor() {
    const now = new Date();
    this.currentDateTime = now.toISOString().slice(0, 16);
    this.addPatientForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      date: new FormControl(this.currentDateTime, [Validators.required, this.futureDateValidator]),
    })
    this.patients = [
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
    ]
  }

  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    const inputDate = new Date(control.value);
    const now = new Date();
    return inputDate > now ? null : { futureDate: true };
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

  addPatient() {
    console.log(this.addPatientForm.value);
    //TODO
  }

  startConsultation() {
    //TODO
  }

  endConsultation() {
    //TODO
  }
}
