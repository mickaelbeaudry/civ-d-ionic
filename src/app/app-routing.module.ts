import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './pages/priority-list/priority-list.module#PriorityListPageModule' },
  { path: 'priority', loadChildren: './pages/priority-details/priority-details.module#PriorityDetailsPageModule' },
  { path: 'priority/:id', loadChildren: './pages/priority-details/priority-details.module#PriorityDetailsPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
