import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {
cvFormGroup!: FormGroup;
constructor() { }

getFormGroup(){
  return this.cvFormGroup;
}

setFormGroup(formGroup: FormGroup){
  this.cvFormGroup = formGroup;
}

}
