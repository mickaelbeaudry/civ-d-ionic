import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Priority, PriorityService } from 'src/app/services/priority.service';

@Component({
  selector: 'app-priority-list',
  templateUrl: './priority-list.page.html',
  styleUrls: ['./priority-list.page.scss'],
})
export class PriorityListPage implements OnInit {

  private priorities: Observable<Priority[]>;

  constructor(private priorityService: PriorityService) { }

  ngOnInit() {
    this.priorities = this.priorityService.getPriorities();
  }

}
