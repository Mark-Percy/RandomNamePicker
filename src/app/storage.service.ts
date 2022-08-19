import { Injectable } from '@angular/core';
import {addDoc, collectionData, CollectionReference, Firestore, getDocs} from '@angular/fire/firestore'
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { People } from './people.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  collection: CollectionReference;
  constructor(private sf: Firestore) { 
    this.collection = collection(this.sf, 'people');
  }

  addPerson(people: People){
    return addDoc(this.collection, people);
  }
  getPeople(): Observable<People[]>{
    return collectionData(this.collection, {idField:'id'}) as Observable<People[]>;
  }
}
