import { MenuItem } from "./menu-item.interface";

export interface MenuGroup {
  label: string;
  link?: string;
  isTitle?: boolean;
  parentId?: string;
  badge?: { text: string; variant: string };
  subItems?: MenuItem[];
  icon?: string;
  expanded?: boolean;  // optional
}
