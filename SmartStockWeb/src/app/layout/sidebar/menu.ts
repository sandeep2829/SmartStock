import { MenuGroup } from '../../../shared/models/menu-group.interface';

export const menuGroups: MenuGroup[] = [
  {
    label: 'Features',
    icon: 'bi bi-box',
    subItems: [
      {
        label: 'Inventory',
        link: '/features/inventory',
        component: () => import('../../features/inventory/inventory.component').then(m => m.InventoryComponent)
      },
      {
        label: 'Reports',
        link: '/features/reports',
        component: () => import('../../features/reports/reports.component').then(m => m.ReportsComponent)
      },
      {
        label: 'Settings',
        link: '/features/settings',
        component: () => import('../../features/settings/settings.component').then(m => m.SettingsComponent)
      }
    ]
  },
  // {
  //   label: 'Admin',
  //   icon: 'bi bi-gear',
  //   subItems: [
  //     {
  //       label: 'Users',
  //       link: '/admin/users',
  //       component: () => import('./admin/users.component').then(m => m.UsersComponent)
  //     },
  //     {
  //       label: 'Roles',
  //       link: '/admin/roles',
  //       component: () => import('./admin/roles.component').then(m => m.RolesComponent)
  //     }
  //   ]
  // }
];
