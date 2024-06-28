import { Component, Input } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { ViewChild } from '@angular/core';

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
  handleCloseModalClick() {
    this.modalElement.handleCloseClick();
  }

  handleOpenModalClick() {
    this.modalElement.handleOpenClick();
  }

  deletePatient() {
    //TODO
  }
}
