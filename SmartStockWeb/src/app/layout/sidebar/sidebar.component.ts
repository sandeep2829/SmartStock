import { Component, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { menuGroups } from './menu';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuGroup } from '../../../shared/models/menu-group.interface';

@Component({
  selector: 'app-sidebar',
  standalone: true,
    imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);
  private router = inject(Router);

  menuItems: MenuGroup[] = [];
  sidebarCollapsed = false;
  settingsSidebarOpen = false;

  ngOnInit(): void {
    this.menuItems = menuGroups;

    // Highlight active route on navigation
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.activateCurrentRoute(this.router.url);

        if (isPlatformBrowser(this.platformId) && window.innerWidth <= 991) {
          this.document.body.classList.remove('sidebar-open');
        }
      }
    });

    if (isPlatformBrowser(this.platformId)) {
      // Fold sidebar for medium desktops
      this.checkSidebarFolded(window.innerWidth);

      window.addEventListener('resize', () => {
        this.checkSidebarFolded(window.innerWidth);
      });
    }
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  toggleSettingsSidebar(): void {
    this.settingsSidebarOpen = !this.settingsSidebarOpen;
  }

  onSidebarThemeChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.document.body.classList.remove('sidebar-light', 'sidebar-dark');
    this.document.body.classList.add(value);
    this.settingsSidebarOpen = false;
  }

  hasItems(item: MenuGroup): boolean {
    return !!item.subItems && item.subItems.length > 0;
  }

  toggleMenu(item: MenuGroup): void {
    item.expanded = !item.expanded;
  }

  private checkSidebarFolded(width: number): void {
    this.sidebarCollapsed = width >= 992 && width <= 1199;
  }

  private activateCurrentRoute(currentPath: string): void {
    const resetMenu = (items: MenuGroup[]) => {
      items.forEach(i => {
        i.expanded = false;
        if (i.subItems) resetMenu(i.subItems);
      });
    };
    resetMenu(this.menuItems);

    const activatePath = (items: MenuGroup[]): boolean => {
      for (let i of items) {
        if (i.link === currentPath) return true;
        if (i.subItems && activatePath(i.subItems)) {
          i.expanded = true;
          return true;
        }
      }
      return false;
    };
    activatePath(this.menuItems);
  }
}
