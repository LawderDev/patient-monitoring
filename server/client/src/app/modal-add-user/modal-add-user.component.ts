import { Component } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import {AbstractControl, ValidationErrors, ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';;
import { ViewChild } from '@angular/core';
import { ApiPatientService } from '../services/api.patient-services';
import { format } from 'date-fns';
@Component({
  selector: 'app-modal-add-user',
  standalone: true,
  imports: [ModalComponent, ReactiveFormsModule],
  templateUrl: './modal-add-user.component.html',
  styleUrl: './modal-add-user.component.scss'
})
export class ModalAddUserComponent {
  addPatientForm: FormGroup;
  currentDateTime: string;
  @ViewChild('modalRef') modalElement!: ModalComponent;

  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    const inputDate = new Date(control.value);
    const now = new Date();
    return inputDate > now ? null : { futureDate: true };
  }

  constructor(private apiPatientServices: ApiPatientService) {
    this.currentDateTime = format(new Date(), "yyyy-MM-dd'T'HH:mm");
    this.addPatientForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      apointmentDate: new FormControl(this.currentDateTime, [Validators.required, this.futureDateValidator]),
      status: new FormControl('waiting', [Validators.required]),
    })
  }

  handleCloseModalClick() {
    this.addPatientForm.setValue({ name: '', apointmentDate: this.currentDateTime, status: 'waiting' });
    this.modalElement.handleCloseClick();
  }

  addPatient() {
    this.apiPatientServices.addPatient(this.addPatientForm.value).subscribe(data => {
      this.handleCloseModalClick();
    });

  }
}
