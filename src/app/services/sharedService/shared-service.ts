import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {

  data$ = new BehaviorSubject<any>(null);
  
  get currentData() {
    return this.data$.asObservable();
  }

  setData(data: any) {
    this.data$.next(data);
  }

  // MODAL
  private modalSubject = new BehaviorSubject<string | null>(null);
  modal$ = this.modalSubject.asObservable();

  open(modalId: string) {
    this.modalSubject.next(modalId);
  }

  close() {
    this.modalSubject.next(null);
  }
  
}
