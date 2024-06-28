import { Component } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import {AbstractControl, ValidationErrors, ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';;
import { EventEmitter, ViewChild, ElementRef } from '@angular/core';
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

  constructor() {
    const now = new Date();
    this.currentDateTime = now.toISOString().slice(0, 16);
    this.addPatientForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      date: new FormControl(this.currentDateTime, [Validators.required, this.futureDateValidator]),
    })
  }

  handleCloseModalClick() {
    this.modalElement.handleCloseClick();
  }

  addPatient() {
    console.log(this.addPatientForm.value);
    //TODO
  }
}
