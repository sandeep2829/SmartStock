// app.routes.ts
import { Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';
import { featuresRoutes } from './features/features.routes';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,   
    children: [
      ...featuresRoutes
    ]
  }
];
