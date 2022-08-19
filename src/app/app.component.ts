import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { People } from './people.interface';
import { StorageService } from './storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RandomNamePicker';
  people$: Observable<People[]>;
  people: People[] | null = null;
  NumberRan: number = 0
  selectedName:People = {fName:'', sName: ''};
  personForm: FormGroup = this.fb.group({
    fName: '',
    sName: ''
  })

  constructor( private fb: FormBuilder, private storageService:StorageService){
    this.people$ = this.storageService.getPeople();
    this.people$.subscribe(result => {
      this.people = result as People[];
    })
  }
  addPerson() {
    this.storageService.addPerson(this.personForm.value).then(data => {
      this.personForm.reset();
    })
  }
  pickRandom() {
    if(this.people) {
      if(this.NumberRan == 1) {
        this.selectedName = this.people[0]
      } else {
        this.selectedName = this.people[Math.floor(Math.random() * this.people.length)]
      }

    }
    this.NumberRan += 1;
  }

  delete(id: string | undefined) {
    this.storageService.deletePerson(id)
  }
}
