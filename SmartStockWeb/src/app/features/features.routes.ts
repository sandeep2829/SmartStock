import { Routes } from '@angular/router';

export const featuresRoutes: Routes = [
    {
        path: 'features',
        children: [
            {
                path: 'inventory',
                loadComponent: () => import('./inventory/inventory.component')
                    .then(m => m.InventoryComponent)
            },
            {
                path: 'reports',
                loadComponent: () => import('./reports/reports.component')
                    .then(m => m.ReportsComponent)
            },
            {
                path: 'settings',
                loadComponent: () => import('./settings/settings.component')
                    .then(m => m.SettingsComponent)
            }
        ]
    }
];
