import { Routes } from '@angular/router';

export const routes: Routes = [

    { path: '', pathMatch: 'full', redirectTo: 'associates' },
    { path: 'associates', loadComponent: () => import('./material-implementation/list/list.component').then(m => m.ListComponent) },
];
