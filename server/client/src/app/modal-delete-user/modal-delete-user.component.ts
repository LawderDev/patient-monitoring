import { Component, Input } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { ViewChild } from '@angular/core';
import { ApiPatientService } from '../services/api.patient-services';


@Component({
  selector: 'app-modal-delete-user',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './modal-delete-user.component.html',
  styleUrl: './modal-delete-user.component.scss'
})
export class ModalDeleteUserComponent {
  @ViewChild('modalRef') modalElement!: ModalComponent;
  @Input() patientName!: string;
  @Input() patientId!: number;
  constructor(private apiPatientServices: ApiPatientService){}

  handleCloseModalClick() {
    this.modalElement.handleCloseClick();
  }

  handleOpenModalClick() {
    this.modalElement.handleOpenClick();
  }

  deletePatient() {
    this.apiPatientServices.deletePatient(this.patientId).subscribe(_ => {
      this.handleCloseModalClick();
    })

  }
}
