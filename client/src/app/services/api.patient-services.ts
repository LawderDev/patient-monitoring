
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Patient {
  id: number;
  name: string;
  apointmentDate: string;
  status: string;
}

@Injectable({
    providedIn: 'root'
})

export class ApiPatientService {

  constructor(private http: HttpClient) { }
    getPatientsOrderByApointmentDate() {
        return this.http.get(
            'http://localhost:8080/api/patients/findAllInApointmentDateOrder');
    }
    addPatient(patient: Patient) {
        return this.http.post(
            'http://localhost:8080/api/patients', patient);
    }
    updatePatient(id:number, patient:Patient) {
        return this.http.put(
            'http://localhost:8080/api/patients' + id, patient);
    }
    deletePatient(id: number) {
        return this.http.delete(
            'http://localhost:8080/api/patients' + id);
    }
}
