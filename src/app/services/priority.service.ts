import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs'

export interface Priority {
  id?: string,
  ordre: string,
  titre: string
}

@Injectable({
  providedIn: 'root'
})
export class PriorityService {
  private priorities: Observable<Priority[]>;
  private priorityCollection: AngularFirestoreCollection<Priority>;

  constructor(private afs: AngularFirestore) {
    this.priorityCollection = this.afs.collection<Priority>('priorite', ref => ref.orderBy('ordre'));
    this.priorities = this.priorityCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    )
  };

  getPriorities(): Observable<Priority[]> {
    return this.priorities;
  }

  getPriority(id: string): Observable<Priority> {
    return this.priorityCollection.doc<Priority>(id).valueChanges().pipe(
      take(1),
      map(priority => {
        priority.id = id;
        return priority;
      })
    )
  }

  addPriority(priority: Priority): Promise<DocumentReference> {
    console.log('add', priority)
    return this.priorityCollection.add(priority);
  }

  updatePriority(priority: Priority): Promise<void> {
    console.log('mod', priority)
    return this.priorityCollection.doc(priority.id).update({ ordre: priority.ordre, titre: priority.titre });
  }

  deletePriority(id: string): Promise<void> {
    console.log('del', id)
    return this.priorityCollection.doc(id).delete();
  }

}
