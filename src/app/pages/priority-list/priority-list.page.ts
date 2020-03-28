import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Priority, PriorityService } from 'src/app/services/priority.service';
import { IonReorderGroup } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-priority-list',
  templateUrl: './priority-list.page.html',
  styleUrls: ['./priority-list.page.scss'],
})
export class PriorityListPage implements OnInit {
  @ViewChild(IonReorderGroup, {static: false} ) reorderGroup: IonReorderGroup;

  priorities: Observable<Priority[]>;
  navigationSubscription;

  constructor(
    private priorityService: PriorityService,
    private router: Router,
    ) {
      this.navigationSubscription = this.router.events.subscribe((e: any) => {
        if (e instanceof NavigationEnd) {
          this.priorities = this.priorityService.getPriorities();
        }
      });
    }

  doReorder(ev: any) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);

    this.priorityService.doReorder(ev.detail.from, ev.detail.to);
    this.priorities = this.priorityService.getPriorities();

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    ev.detail.complete();
  }

  toggleReorderGroup() {
    this.reorderGroup.disabled = !this.reorderGroup.disabled;
  }

  ngOnInit() {
  }
}
