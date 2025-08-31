// menu-item.interface.ts
export interface MenuItem {
  label: string;
  link?: string;                // optional for parent items
  icon?: string;
  expanded?: boolean;
  subItems?: MenuItem[];
  component?: () => Promise<any>; // add this line
}
