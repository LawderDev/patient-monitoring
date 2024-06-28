import { Component, Input } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import {AbstractControl, ValidationErrors, ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';;
import { EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ApiPatientService } from '../services/api.patient-services';

@Component({
  selector: 'app-modal-edit-user',
  standalone: true,
  imports: [ModalComponent, ReactiveFormsModule],
  templateUrl: './modal-edit-user.component.html',
  styleUrl: './modal-edit-user.component.scss'
})
export class ModalEditUserComponent {
  editPatientForm: FormGroup;
  currentDateTime: string;
  @ViewChild('modalRef') modalElement!: ModalComponent;
  @Input() patientName!: string;
  @Input() patientId!: number;
  @Input() patientStatus!: string;

  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    const inputDate = new Date(control.value);
    const now = new Date();
    return inputDate > now ? null : { futureDate: true };
  }

  constructor(private apiPatientServices: ApiPatientService) {
    const now = new Date();
    this.currentDateTime = now.toISOString().slice(0, 16);
    this.editPatientForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      date: new FormControl(this.currentDateTime, [Validators.required, this.futureDateValidator]),
      status: new FormControl('', [Validators.required]),
    })
  }

  handleCloseModalClick() {
    this.modalElement.handleCloseClick();
  }

  handleOpenModalClick() {
    this.modalElement.handleOpenClick();
  }

  editPatient() {
    this.apiPatientServices.updatePatient(this.patientId, this.editPatientForm.value).subscribe(data => {
      console.log("sucess edit")
      //TODO refresh data
    })
  }
}
