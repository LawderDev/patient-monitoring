import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Patient } from './api.patient-services';

@Injectable({
  providedIn: 'root',
})
export class SocketPatientService {

  constructor(private socket: Socket) {}

  getPatients(): Observable<Patient[]> {
    return this.socket.fromEvent<Patient[]>('updatedPatients');
  }
}
