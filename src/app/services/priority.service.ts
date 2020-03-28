import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Parse } from 'parse';

export interface Priority {
  id?: string;
  ordre: number;
  titre: string;
}

@Injectable({
  providedIn: 'root'
})
export class PriorityService {
  private priorities: Priority[] = [];

  constructor() {
    Parse.serverURL = 'https://civd.back4app.io'; // This is your Server URL
    Parse.initialize(
      '5wos5EyzRwqlg3QX0lbfyRWDzXDtIfbUesK8dL38', // This is your Application ID
      'jdRTkckhJHXHjcv9svq5J7JJNS2l1HMIGBtWnf8i', // This is your Javascript key
      'JCJmzJD5Hl133RgUx5pAKqKERjGUQJD002yCyqbo' // This is your Master key (never use it in the frontend)
    );
  }

  doReorder(from, to) {
    this.priorities.splice(to, 0, this.priorities.splice(from, 1)[0]);

    let index = 0;
    this.priorities.forEach(p => {
        this.updateOrdreById(p.id, p.titre, index + 1);
        index++;
    });
  }

  getPriorities(): Observable<Priority[]> {
    this.priorities = [];
    const priorite = Parse.Object.extend('priorite');
    const query = new Parse.Query(priorite);
    query.ascending('ordre');
    return query.find().then((results) => {
      results.forEach(element => {
        this.priorities.push({
          id: element.id,
          titre: element.attributes.titre,
          ordre: element.attributes.ordre
        });
      });
      return this.priorities;
    }, (error) => {
      console.error('Error while fetching priorite', error);
    });
  }

  getPriority(id: string) {
    const priorite = Parse.Object.extend('priorite');
    const query = new Parse.Query(priorite);
    query.equalTo('objectId', id);
    return query.find().then((results) => {
      return results;
    }, (error) => {
      console.error('Error while fetching priorite', error);
    });
  }

  addPriority(priority: Priority) {
    priority.ordre = this.priorities.length + 1;
    const priorite = Parse.Object.extend('priorite');
    const myNewObject = new priorite();

    myNewObject.set('titre', priority.titre);
    myNewObject.set('ordre', priority.ordre);

    return myNewObject.save().then(
      (result) => {
      },
      (error) => {
        console.error('Error while creating priorite: ', error);
      }
    );
  }

  updatePriority(priority: Priority): Promise<void> {
    const priorite = Parse.Object.extend('priorite');
    const query = new Parse.Query(priorite);
    return query.get(priority.id).then((object) => {
      object.set('titre', priority.titre);
      object.set('ordre', priority.ordre);
      object.save().then((response) => {
      }, (error) => {
        console.error('Error while updating priorite', error);
      });
    });
  }

  updateOrdreById(id: string, titre: string, ordre: number): Promise<void> {
    const priorite = Parse.Object.extend('priorite');
    const query = new Parse.Query(priorite);
    return query.get(id).then((object) => {
      object.set('titre', titre);
      object.set('ordre', ordre);
      object.save().then((response) => {
      }, (error) => {
        console.error('Error while updating priorite', error);
      });
    });
  }

  deletePriority(id: string): Promise<void> {
    let index = 0;
    this.priorities.map(p => {
      if (p.id === id) {
        index = p.ordre;
      }
    });
    this.priorities.forEach(p => {
      if (p.ordre > index) {
        this.updateOrdreById(p.id, p.titre, p.ordre - 1);
      }
    });
    const priorite = Parse.Object.extend('priorite');
    const query = new Parse.Query(priorite);
    return query.get(id).then((object) => {
      object.destroy().then((response) => {
      }, (error) => {
        console.error('Error while deleting priorite', error);
      });
    });
  }

}
