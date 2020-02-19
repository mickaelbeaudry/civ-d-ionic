import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs'

export interface Priority {
  id?: string,
  ordre: number,
  titre: string
}

@Injectable({
  providedIn: 'root'
})
export class PriorityService {
  private priorities$: Observable<Priority[]>;
  private priorities: Priority[];
  private priorityCollection: AngularFirestoreCollection<Priority>;

  constructor(private afs: AngularFirestore) {
    this.priorityCollection = this.afs.collection<Priority>('priorite', ref => ref.orderBy('ordre'));
    this.priorities$ = this.priorityCollection.snapshotChanges().pipe(
      map(actions => {
        this.priorities = [];
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          this.priorities.push({ id, ...data });
          // console.log({ id, data });
          return { id, ...data };
        });
      })
    );
  };

  doReorder(from, to) {

    let debut = 0;
    let fin = 0;
    let increment = 0;
    
    if (from > to) {
      debut = to + 1;
      fin = from + 1;
      increment = 1;
    } else if (from < to) {
      increment = -1;
      debut = from + 1;
      fin = to + 1;
    }

    this.priorities.forEach(p => {
      if (p.ordre >= debut && p.ordre <= fin) {
        this.priorityCollection.doc(p.id).update({ ordre: p.ordre + increment, titre: p.titre });
      }
    });
    
    let prio = this.priorities[from];
    prio.ordre = this.priorities[to].ordre;
    this.updatePriority(prio);
  }

  getOrdreById(id: string): Observable<number> {
    return this.priorityCollection.doc<Priority>(id).valueChanges().pipe(
      take(1),
      map(priority => {
        priority.id = id;
        return priority.ordre;
      }));
  }

  getPriorities(): Observable<Priority[]> {
    return this.priorities$;
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
