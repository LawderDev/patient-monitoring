import { Component, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormGroup} from '@angular/forms';
import { EventEmitter, ViewChild, ElementRef } from '@angular/core';
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() id: string = 'my_modal_1';
  @Input() noBtn: boolean = false;
  @Output() onHandleClose = new EventEmitter();
  @ViewChild('modal') modalElement!: ElementRef;

  handleOpenClick() {
    this.modalElement.nativeElement.showModal();
  }

  emitCloseEvent() {
    this.onHandleClose.emit();
  }

  handleCloseClick() {
    this.modalElement.nativeElement.close();
  }
}
